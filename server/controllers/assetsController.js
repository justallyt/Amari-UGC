import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Asset from "../models/assetsModel.js";
import User from "../models/usersModel.js";
import Notifications from "../models/NotificationsModel.js";
import mongoose, { Mongoose } from "mongoose";
import Comment from "../models/Comments.js";

//Upload Asset
export const CreateAsset = asyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        
        if(user){
             let asset_id, url, thumbnail;
             //Extract type of file
             const mimeType = req.file.mimetype.startsWith('image') ? 'image' : 'video'

             const { brand, product, caption } = JSON.parse(req.body.data);

             //Execute when asset is an image
             if(mimeType === 'image'){
                     const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: "Assets"});

                     if(cloudinary_result){
                             asset_id = cloudinary_result.asset_id;
                             url = cloudinary_result.secure_url;
                             thumbnail = url;

                             const image_asset = await Asset.create({
                                      creator: user._id,
                                      created_for: brand,
                                      brand_product: product,
                                      caption: caption,
                                      asset: {
                                            asset_id: asset_id,
                                            url: url,
                                            thumbnail: thumbnail
                                      }
                             })

                             if(image_asset){
                                    res.status(201).json({ message: 'Your asset created Successfully'})
                                    const notifications = await Notifications.create({
                                           notification_type: 'Upload',
                                           sender: {
                                                   senderId: user._id,
                                                   senderMsg: 'You uploaded an asset',
                                                   profilePhoto: user.profilePic.url
                                           }
                                    })
                             }else{
                                    res.status(500).json({ message: 'Error occured. CLD-ERR'})
                             }
                     }
             }

             // Execute when asset is a video
             if(mimeType === 'video'){
                     try{
                           const cloud_result = await new Promise((resolve, reject) => {
                                  cloudinary.uploader.upload_large(req.file.path, {
                                        resource_type: 'video',
                                        folder: "Assets",
                                        timeout: 300000
                                  }, (error, result) => {
                                         if(error){
                                                  reject(error);
                                                  res.status(500).json({ message: 'Error uploading to cloudinary'})
                                         }
                                         resolve(result)
                                  })
                           })

                           if(cloud_result){
                                 asset_id = cloud_result.asset_id;
                                 url = cloud_result.secure_url;
                                  thumbnail = `${url.slice(0, -3)}jpg`; //generate thumbnail by adding jpg ext on the url

                                 const video_asset = await Asset.create({
                                          creator: user._id,
                                          created_for: brand,
                                          brand_product: product,
                                          caption: caption,
                                          asset: {
                                                  asset_id: asset_id,
                                                  url: url,
                                                  thumbnail: thumbnail
                                          }
                                 })

                                 if(video_asset){
                                          res.status(201).json({ message: 'Your asset created Successfully'})
                                          const notifications = await Notifications.create({
                                                notification_type: 'Upload',
                                                sender: {
                                                        senderId: user._id,
                                                        senderMsg: 'You uploaded an asset',
                                                        profilePhoto: user.profilePic.url
                                                }
                                         })
                                 }else{
                                        res.status(500).json({ message: 'Error ocurred. DBERR'})
                                 }
                           }
                     }catch(error){
                           console.log(error)
                     }
             }
        }else{
                res.status(403).json({ message: 'Sorry you are not authorized to create an asset with this account.'})
        }
})

//Get User Assets
export const getUserAssets = asyncHandler(async(req, res) => {
        const assets = await Asset.find({ creator: req.user._id})
 
        if(assets){
             res.status(201).json({assets})
      }else{
              res.status(500).json({ message: "User data could not be fetched at this time."})
      }
 })


 //endpoint for brand to like an asset
 export const LikeAsset = asyncHandler(async(req, res) => {
          const { asset_id, brand_id } = req.body;

          const clicker = new mongoose.Types.ObjectId(brand_id);
          
          const checker = await Asset.findById(asset_id);

          if(checker){ 
                if(checker.liked_by.length > 0){
                        const removed = await Asset.findByIdAndUpdate(asset_id, {
                                 $pull: { liked_by: { user: clicker}}
                        }, { new: true})
                        
                        
                        if(removed){
                                const deleteNotification = await Notifications.findOneAndRemove({ "sender.senderId": clicker})
                                const all_assets = await Asset.find({ created_for: removed.created_for});
                
                                res.status(200).json({ data: all_assets, asset: removed })
                        }
                }else{
                       const result = await Asset.findByIdAndUpdate(asset_id, {
                                $push: { liked_by: { user: clicker, is_liked: true}}
                        }, { new: true})

                        if(result){
                                const creator = await User.findById(result.creator);
                                
                                const notify = await Notifications.create({
                                         notification_type: 'Like',
                                         sender: {
                                                  senderId: clicker,
                                                  senderName: result.created_for,
                                                  senderMsg: `You liked an asset created by ${creator.name}`,
                                                  profilePhoto: req.user.profilePic.url
                                         },
                                         receipient: {
                                                  receipientId: result.creator,
                                                  receipientName: creator.name,
                                                  receipientMsg: `Your asset was liked by ${result.created_for}`,
                                                  profilePhoto: creator.profilePic.url
                                         }
                                })
                                const all_assets = await Asset.find({ created_for: result.created_for})
                                
                                res.status(200).json({ data: all_assets, asset: result});
                        }else{
                                res.status(500).json({ message: 'Asset could not be liked'})
                        }
                }
          }
 })

 //Endpoint for brand to bookmark an asset
 export const BookmarkAsset = asyncHandler(async(req, res) => {
          const { asset_id } = req.body;

          const checker = await Asset.findById(asset_id);

          if(checker){
                if(checker.bookmarked){
                        const removeAssetBookmark = await Asset.findByIdAndUpdate(asset_id, {
                                bookmarked: false
                        }, { new: true})
                        if(removeAssetBookmark){
                                 const all_assets = await Asset.find({ created_for: removeAssetBookmark.created_for});
                                 res.status(200).json({ data: all_assets, asset: removeAssetBookmark, msg: 'You have removed asset from your bookmarks'})
                        }
                }else{
                        const updateAssetBookmark = await Asset.findByIdAndUpdate(asset_id, {
                                bookmarked: true
                        }, { new: true})
                        if(updateAssetBookmark){
                                 const all_assets = await Asset.find({ created_for: updateAssetBookmark.created_for})
                                 res.status(200).json({ data: all_assets, asset: updateAssetBookmark, msg: 'You have added asset to your bookmarks'})
                        }
                }
                
          }else{
                 res.status(500).json({ message: "Asset not found with that id"})
          }
 })


 //Comment on Asset
 export const CommentOnAsset = asyncHandler(async(req, res) => {
        const { asset, comment, commentor, name, photo } = req.body;
        const assetID = new mongoose.Types.ObjectId(asset);
        const commentorID = new mongoose.Types.ObjectId(commentor);
        
        const newComment = await Comment.create({
                   asset_id: assetID,
                   commenter: {
                          commenter_id: commentorID,
                          name: name,
                          photo: photo
                   },
                   comment: comment
        })

        if(newComment){
                res.status(201).json({message: 'Comment added succesfully'})
        }else{
                res.status(500).json({message: 'Your comment not posted. Internal server error'})
        }

 })