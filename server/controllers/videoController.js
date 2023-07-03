import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Video from "../models/videosModel.js";

//Upload video
export const CreateVideo = asyncHandler(async(req,res) => {
       res.status(201).json({ message: 'Upload your video omera'})
})