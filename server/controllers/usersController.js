import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";
import User from "../models/usersModel.js";

//Login User
export const LoginUser = asyncHandler(async(req, res) => {
       const { email, password } = req.body;

       const user = await User.findOne({ email });

       if(user && (await user.matchPasswords(password))){
             generateToken(res, user._id);

             res.status(201).json({
                   message: "Login Successful.",
                   id: user._id,
                   role: user.role,
             })
       }else{
               res.status(401);
               throw new Error("Invalid Email or Password. Please try again")
       }
})

//Register User
export const RegisterUser = asyncHandler(async(req, res) => {
        const { email, role  } = req.body

        const userExists = await User.findOne({ email });

        if(userExists){
               res.status(400);
               throw new Error("User Account already exists");
        }
        
        if(role.toLowerCase() === 'brand'){
               const { name, password, phone, country, businessType } = req.body;

               const user = await User.create({ name, email, password, phone, address: {country}, role, businessType });

               if(user){
                        generateToken(res, user._id);

                        res.status(201).json({
                               message: "Account created successfully",
                               id: user._id,
                               name: user.name,
                               email: user.email,
                               role: user.role,
                        })
               }else{
                      res.status(400);
                      throw new Error("Invalid Company data. Please try again");
               }
        }else{
               const { name, password} = req.body;

               const user = await User.create({ name, email, password, role });

               if(user){
                       generateToken(res, user._id);

                       res.status(201).json({
                              message: "Account created successfully",
                              id: user._id,
                              name: user.name,
                              email: user.email,
                              role: user.role,
                       })
               }else{
                         res.status(400);
                         throw new Error("Invalid consumer data. Please try again")
               }
        }

})

//Get User Profile
export const GetProfile = asyncHandler(async(req, res) => {
       const user = req.user;

       res.status(200).json({ user})
})

//Update User Profile
export const UpdateProfile = asyncHandler(async(req, res) => {
         const user = await User.findById( req.user._id);

         const { name } = JSON.parse(req.body.data)
         if(user){
               res.status(201).json({ message:  req.file})
         }else{
               res.status(401);
               throw new Error("Sorry, You cannot update at this time.")
         }
})

//Logout User
export const LogOutUser = asyncHandler(async(req,res) => {
             res.cookie("jwt", "", {
                     httpOnly: true,
                     expires: new Date(0)
             })

             res.status(200).json({ message: 'You have logged out'})
})