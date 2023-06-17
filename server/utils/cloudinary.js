import cloudinary from 'cloudinary'
import asyncHandler from 'express-async-handler'
cloudinary.config({
       cloud_name: process.env.CLOUDINARY_NAME,
       api_key: process.env.CLOUDINARY_API_KEY,
       api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = asyncHandler(async(path, folder, res) => {
       const uploaded = await cloudinary.v2.uploader.upload(path, { folder })

       if(uploaded){
              res.status(201).json({
                     message: 'Upload Successful'
              })
       }else{
              res.status(401).json({ message: "Upload Failed"})
       }
}) 


export const removeFromCloudinary = asyncHandler(async(public_id) => {
       await cloudinary.v2.uploader.destroy(public_id, function(error, result){
                   console.log(result, error);
       })
})