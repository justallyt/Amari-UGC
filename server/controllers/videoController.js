import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Video from "../models/videosModel.js";
import User from "../models/usersModel.js";

//Upload video
export const CreateVideo = asyncHandler(async(req,res) => {
        const user = await User.findById(req.user._id);

        if(user){
               try {
                     console.log(req.file)
                     // const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: 'Video Assets'});

                     // console.log(cloudinary_result)
                     // res.status(200).json({ data: cloudinary_result})
               } catch (error) {
                     console.log(error)
               }
               res.status(201).json({ message: 'Success' })
        }else{
               res.status(401).json({ message: 'An error occured. Not authorized to create a video.'})
        }
})