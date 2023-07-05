import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Video from "../models/videosModel.js";
import User from "../models/usersModel.js";

//Upload video
export const CreateVideo = asyncHandler(async(req,res) => {
        const user = await User.findById(req.user._id);

        if(user){
              let asset_id, url, thumbnail;
               try {
                     //  cloudinary.uploader.upload_large(req.file.path, { resource_type: 'video', folder: 'VideoAssets'}, (error, result) => {
                     //            if(error){
                     //                  console.log(error);
                     //                  return;
                     //            }
                     //            asset_id = result.asset_id;
                     //            url = result.secure_url;
                     //             //generate thumbnail by adding jpg ext on the url
                     //            thumbnail = `${url.slice(0, -3)}jpg`;  
                     //  })
                     const cloud_result = await new Promise((resolve, reject) => {
                             cloudinary.uploader.upload_large(req.file.path, {
                                     resource_type: 'video',
                                     folder: 'VideoAssets'
                             }, (error, result) => {
                                   if(error){
                                          reject(error);
                                           res.status(401).json({ message: 'Error uploading to cloudinary'})
                                   }
                                   resolve(result);
                             })
                     })

                     const { created_for, brand_product, caption } = req.body;

                     if(cloud_result){
                            asset_id = cloud_result.asset_id;
                            url = cloud_result.secure_url;
                           //generate thumbnail by adding jpg ext on the url
                            thumbnail = `${url.slice(0, -3)}jpg`;  

                            const video = await Video.create({ 
                                   creator: user._id,
                                   created_for: created_for,
                                   brand_product: brand_product,
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
                     // const { created_for, brand_product, caption } = JSON.parse(req.body);
       
               } catch (error) {
                     console.log(error)
               }
              
        }else{
               res.status(401).json({ message: 'An error occured. Not authorized to create a video.'})
        }
})