import asyncHandler from "express-async-handler";
import User from "../../models/usersModel.js";
import Notifications from "../../models/NotificationsModel.js";
import Rewards from "../../models/RewardModel.js"
import mongoose, { Mongoose } from "mongoose";
import Asset from "../../models/assetsModel.js";
import { sendRewardEmail } from "../../mail/sendRewardEmail.js";


//Get all creators subscribed to a brand
export const GetAllCreatorsForBrands = asyncHandler(async(req, res) => {
         const creators = await User.find({ role: 'Creator'}).select('-password')

         if(creators){
                res.status(200).json({ creators })
         }else{
              res.status(500).json({ message: "Sorry, no creator could be pulled for the specified brand"})
         }
})


//Get all assets created for a brand
export const GetAllAssetsForBrand = asyncHandler(async(req, res) => {
        const assets = await Asset.find({ created_for: req.user.name});

        if(assets){
               res.status(200).json({ assets })
        }else{
              res.status(500).json({ message: 'Assets could not be pulled from DB'})
        }
})


//Get all assets created by a specific creator
export const GetBrandAssetsByCreator = asyncHandler(async(req, res) => {
          const creatorID = new mongoose.Types.ObjectId(req.params.id);
          const assets = await Asset.find({creator: creatorID, created_for: req.user.name})
          res.status(200).json({ assets })
})


//Reward Creation
export const CreateRewardForCreator = asyncHandler(async(req, res) => {
       const { type, name, code, description } = req.body;

       const brand =  new mongoose.Types.ObjectId(req.user.id)

       try {
              if(type === 'Custom'){
                       const reward = await Rewards.create({
                               reward_owner: brand,
                               reward_type: type,
                               reward_name: name,
                               reward_description: description
                       })

                       if(reward){
                            res.status(201).json({ message: 'Reward Created Successfully'})
                       }else{
                            res.status(500).json({ message: "Error occured during created reward"})
                       }
              }else{
                     const reward = await Rewards.create({
                            reward_owner: brand,
                            reward_type: type,
                            reward_name: name,
                            reward_code: code.toUpperCase(),
                            reward_description: description
                      })

                      if(reward){
                            res.status(201).json({ message: 'Reward Created Successfully'})
                     }else{
                            res.status(500).json({ message: "Error occured during created reward"})
                     }
              }
       } catch (error) {
              console.log(error)
       }

})

//Get all Rewards created
export const GetAllBrandRewards = asyncHandler(async(req, res) => {
          const rewards = await Rewards.find({ reward_owner: req.user.id})

          if(rewards){
                 res.status(200).json({ rewards })
          }else{
               res.status(500).json({ message: "Error in pulling reward records"})
          }
})

//Delete a Reward
export const DeleteBrandReward = asyncHandler(async(req, res) => {
        const { id } = req.body;
        const reward_id = new mongoose.Types.ObjectId(id)
        const deleteReward = await Rewards.findByIdAndDelete(reward_id);

        if(deleteReward){
                   res.status(201).json({ message: "Reward deleted Successfully"})
        }else{
                 res.status(500).json({ message: "Internal server error. Reward cannot be deleted at this time."})
        }
})

//Edit a reward
export const EditBrandReward = asyncHandler(async(req, res) => {
       const { id, data } = req.body;
       const { type, name, code, description } = data;

       const updateReward = await Rewards.findByIdAndUpdate(id, {
              reward_type: type,
              reward_name: name,
              reward_code: code.toUpperCase(),
              reward_description: description
       }, { new: true})

       if(updateReward){
              res.status(201).json({ message: "Reward successfully updated"})
       }else{
               res.status(500).json({ message: "Apologies! Your reward cannot be updated at this time"})
       }
})


//Confirm and assign rewards to creators
export const  ConfirmCreatorRewards = asyncHandler(async(req, res) => {
          const { creator, rewards } = req.body;
          //get creator details
          const user = await User.findById(creator)
          const brandName = req.user.name

          try {
              rewards.forEach(async(reward) => {
                     const reward_id = new mongoose.Types.ObjectId(reward)
                     //check if creator has already been awarded
                     const creatorCheck = await Rewards.findById(reward_id)
                     const check = creatorCheck.beneficiaries.includes(creator);
                     if(check){
                             return;
                     }else{
                           const assignReward = await Rewards.findByIdAndUpdate(reward, {
                                   $push: { beneficiaries: creator}
                           }, { new: true})

                           if(assignReward){
                                   const coupon = assignReward.reward_code;
                                   const type = assignReward.reward_type;
                                   const description = assignReward.reward_description;
                                   const rewardEmail = await sendRewardEmail(type, user, brandName, coupon, description)
                           }
                     }
              })
              res.status(201).json({ message: "Rewarding successful"})
          } catch (error) {
                  res.status(500).json({ message: "An error occured. Rewarding not successful"})
          }
})