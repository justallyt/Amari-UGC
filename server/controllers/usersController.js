import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";
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
                   username: user.username
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
       const user =  await User.findById(req.user._id).select('-password');
       
       if(user){
              res.status(200).json({ user})
       }else{
               res.status(400).json({ message: "User data could not be fetched at this time."})
       }
})

//Update User Profile
export const UpdateProfile = asyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        
        if(user){
              try{
                     let public_id, url;
                     //file not uploaded
                     if(!req.file){
                            public_id = user.profilePic.public_id;
                            url = user.profilePic.url;
                     }else{
                            const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: "profilephotos"});

                            public_id = cloudinary_result.public_id;
                            url = cloudinary_result.secure_url;
                     }
                     
                     //Update Brand
                     if(user.role.toLowerCase() === 'brand'){
                             const { name, username, email, phone, bio, country, city, businessType} = JSON.parse(req.body.data);
                             
                             const updatedBrand = await User.findByIdAndUpdate(user._id, {
                                     name: name,
                                     email: email,
                                     username: username,
                                     phone: phone,
                                     businessType: businessType,
                                     bio: bio,
                                     address: {
                                             country: country,
                                             city: city
                                     },
                                     profilePic: {
                                            public_id: public_id,
                                            url: url
                                     }
                             }, { new: true});

                             if(updatedBrand){
                                     res.status(201).json({ message: 'User updated successfully', info: updatedBrand})
                             }else{
                                     res.status(401).json({ message: "User update failed"})
                             }
                     }else{
                            //Update Creator
                            const {name, username, email, phone, bio, country, city} = JSON.parse(req.body.data);

                            const updatedCreator = await User.findByIdAndUpdate(user._id, {
                                      name: name,
                                      email: email,
                                      username: username,
                                      phone: phone,
                                      bio: bio,
                                      address: {
                                             country: country,
                                             city: city
                                      },
                                      profilePic: {
                                              public_id: public_id,
                                              url: url
                                      }
                            }, { new: true});

                            if(updatedCreator){
                                   res.status(201).json({ message: 'User updated successfully', info: updatedCreator})
                            }else{
                                  res.status(500).json({ message: "User update failed"})
                            }
                     }

               }catch(error){
                     console.log(error)
              }
        }else{
              res.status(401).json({ message: 'An error occured. Not authorized to update at this time.'})
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


// Send Request to Admin to approve Creator to work with brand
export const AssetCreationRequest = asyncHandler(async(req, res) => {
         const creator_id = req.user._id;
         const brand = req.body

         res.status(200).json({ message: brand})
})


//Get All Brands
export const GetAllBrands = asyncHandler(async(req, res) => {
          const brands = await User.find({ role: 'Brand'}).select('name bio profilePic');

          if(brands){
                  res.status(200).json({ brands })
          }else{
               res.status(400).json({ message: 'Sorry, no brands found for your selection'})
          }
})