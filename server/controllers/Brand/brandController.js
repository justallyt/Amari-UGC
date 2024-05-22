import asyncHandler from "express-async-handler";
import User from "../../models/usersModel.js";
import Notifications from "../../models/NotificationsModel.js";
import Rewards from "../../models/RewardModel.js"
import mongoose from "mongoose";
import Asset from "../../models/assetsModel.js";

export const GetAllCreatorsForBrands = asyncHandler(async(req, res) => {
         const creators = await User.find({ role: 'Creator'}).select('-password')

         if(creators){
                res.status(200).json({ creators })
         }else{
              res.status(500).json({ message: "Sorry, no creator could be pulled for the specified brand"})
         }
})

export const GetAllAssetsForBrand = asyncHandler(async(req, res) => {
        const assets = await Asset.find({ created_for: req.user.name});

        if(assets){
               res.status(200).json({ assets })
        }else{
              res.status(500).json({ message: 'Assets could not be pulled from DB'})
        }
})

export const GetBrandAssetsByCreator = asyncHandler(async(req, res) => {
          const creatorID = new mongoose.Types.ObjectId(req.params.id);
          const assets = await Asset.find({creator: creatorID, created_for: req.user.name})
          res.status(200).json({ assets })
})

export const CreateRewardForCreator = asyncHandler(async(req, res) => {
       const { type, name, code, description } = req.body;

       const brand =  new mongoose.Types.ObjectId(req.user.id)

       try {
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
       } catch (error) {
              console.log(error)
       }

})

export const GetAllBrandRewards = asyncHandler(async(req, res) => {
          const rewards = await Rewards.find({ reward_owner: req.user.id})

          if(rewards){
                 res.status(200).json({ rewards })
          }else{
               res.status(500).json({ message: "Error in pulling reward records"})
          }
})