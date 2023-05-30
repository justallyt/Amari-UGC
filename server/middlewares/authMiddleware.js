import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Consumer from "../models/consumerModel.js";

export const protect = asyncHandler(async(req, res, next) => {
       let token;

       token = req.cookies.jwt;

       if(token){
             try{
                  const decoded = jwt.verify(token, process.env.JWT_SECRET);

                  req.consumer = await Consumer.findById(decoded.userId).select('-password');

                  next();
             }catch(error){
                  res.status(401);
                  throw new Error("Not Authorized. Invalid Token");
             }
       }else{
            res.status(401);
            throw new Error("Not Authorized. No token found");
       }
})