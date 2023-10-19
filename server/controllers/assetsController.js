import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Asset from "../models/assetsModel.js";
import User from "../models/usersModel.js";
import Notifications from "../models/NotificationsModel.js";

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