import asyncHandler from "express-async-handler";
import User from "../../models/usersModel.js";
import Notifications from "../../models/NotificationsModel.js";
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