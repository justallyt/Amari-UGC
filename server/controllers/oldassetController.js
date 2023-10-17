import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Asset from "../models/assetsModel.js";
import User from "../models/usersModel.js";

//Upload video
export const CreateAsset = asyncHandler(async(req,res) => {
        const user = await User.findById(req.user._id);

        if(user){
              let asset_id, url, thumbnail;
               try {
                     const cloud_result = await new Promise((resolve, reject) => {
                             cloudinary.uploader.upload_large(req.file.path, {
                                     resource_type: 'video', 
                                     folder: 'VideoAssets',
                                     timeout: 300000
                             }, (error, result) => {
                                   if(error){
                                          reject(error);
                                           res.status(501).json({ message: 'Error uploading to cloudinary'})
                                   }
                                   resolve(result);
                             })
                     })

                     const { brand, product, caption } = JSON.parse(req.body.data);

                     if(cloud_result){
                            asset_id = cloud_result.asset_id;
                            url = cloud_result.secure_url;
                           //generate thumbnail by adding jpg ext on the url
                            thumbnail = `${url.slice(0, -3)}jpg`;  

                            const video = await Video.create({ 
                                   creator: user._id,
                                   created_for: brand,
                                   brand_product: product,
                                   caption: caption,
                                   video: {
                                           asset_id: asset_id,
                                           url: url,
                                           thumbnail: thumbnail
                                   }
                             })

                             if(video){
                                   res.status(201).json({ message: 'Your asset created Successfully'})
                              }else{
                                  res.status(401).json({ message: 'Error occurred. Please check your inputs and try again.'})
                              }
                     }   
               } catch (error) {
                     console.log(error)
               }
              
        }else{
               res.status(401).json({ message: 'An error occured. Not authorized to create a video.'})
        }
})

//Get User Videos
export const getUserAssets = asyncHandler(async(req, res) => {
       const assets = await Video.find({ creator: req.user._id})

       if(assets){
            res.status(200).json({assets})
     }else{
             res.status(400).json({ message: "User data could not be fetched at this time."})
     }
})