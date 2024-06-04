import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/usersModel.js";
import Request from "../models/RequestsModel.js";
import mongoose, { mongo } from "mongoose";
import Notifications from "../models/NotificationsModel.js";
import UserVerification from "../models/VerificationModel.js";
import { sendEmailVerification } from "../mail/sendEmailVerification.js";
import { sendWelcomeEmailToCreator } from "../mail/sendCreatorEmail.js";
import { sendWelcomeEmailToBrand } from "../mail/sendBrandEmail.js";
import { sendPasswordVerification } from "../mail/sendPasswordVerification.js";
import { sendPasswordResetEmail } from "../mail/sendPassworResetConfirmation.js";
import Reward from "../models/RewardModel.js";

//Login User
export const LoginUser = asyncHandler(async(req, res) => {
       const { email, password } = req.body;

       const user = await User.findOne({ email });
       if(!user) {
              throw new Error("Invalid account details. Please create an account.")
       }
       const isUserVerified = user.verified;

       if(isUserVerified){
               if(user && (await user.matchPasswords(password))){
                       generateToken(res, user._id);

                       res.status(201).json({
                             message: "Login Successful.",
                             verified: true,
                             id: user._id,
                             role: user.role,
                             username: user.username
                        })
              }else{
                      res.status(401);
                      throw new Error("Invalid Email or Password. Please try again")
               }
       }else{
              if(user && (await user.matchPasswords(password))){
                     const email_result = sendEmailVerification(user);
                     if(email_result){
                            res.status(201).json({
                                   verified: false,
                                   message: "Email verification sent to your email",
                                   name: user.name,
                                   id: user._id
                            })
                     }
              }else{
                     res.status(401);
                     throw new Error("Invalid Email or Password. Please try again"); 
              }
       }
})

//Register User
export const RegisterUser = asyncHandler(async(req, res) => {
        const { email, role  } = req.body

        const userExists = await User.findOne({ email });

        if(userExists){
               res.status(400);
               throw new Error("User Account already exists.");
        }
        
        if(role.toLowerCase() === 'brand'){
               const { name, password, phone, country, businessType } = req.body;
               const url = 'https://res.cloudinary.com/dfwrvpy2t/image/upload/v1710081790/dummylogo_nwaba0.jpg';

               const user = await User.create({ name, email, password, phone, address: {country}, profilePic: {url}, role, businessType });

               if(user){
                        const email_result = sendEmailVerification(user);
                         if(email_result){
                              res.status(201).json({
                                   message: "Email verification sent to your email.",
                                   name: user.name,
                                   id: user._id
                              }) 
                         }else{
                               res.status(500);
                               throw new Error("Server error. Email verification not sent")
                         }
               }else{
                      res.status(400);
                      throw new Error("Invalid Company data. Please try again");
               }
        }else{
               const { name, password} = req.body;
               const url = 'https://res.cloudinary.com/dfwrvpy2t/image/upload/v1710080930/dummyuserphoto.jpg';
               const user = await User.create({ name, email, password, role, profilePic: { url } });

               if(user){
                     const email_result = sendEmailVerification(user);
                     if(email_result){               
                             res.status(201).json({
                                    name: user.name,
                                    message: 'Email verification sent to your email.',
                                    id: user._id
                             }) 
                     }
               }else{
                         res.status(400);
                         throw new Error("Invalid consumer data. Please try again")
               }
        }
})

//Verify account
export const ConfirmAccount = asyncHandler(async(req, res) => {
          const { otp, id } = req.body;
         
          const user_id = new mongoose.Types.ObjectId(id);
          const user = await User.findById(user_id);
          const dbOtp = await UserVerification.find({user_id: user_id});
          
          const { uniqueOtp, expiresAt } = dbOtp[0];
     
          if(expiresAt  < Date.now()){
                res.status(400);
                throw new Error("Sorry the Otp code has expired. Please resend another.");
                const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});
          }else{
                if(uniqueOtp === otp){
                     //otp verified
                     const updatedUser = await User.findByIdAndUpdate(user_id, {
                            verified: true,
                     }, { new: true});
                     
                     if(updatedUser){
                             generateToken(res, user._id);

                             res.status(201).json({
                                    message: "Account created successfully",
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    username: user.username
                             })
                             const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});

                             //Send Welcome Emails
                             if(user.role.toLowerCase() === 'brand'){
                                    sendWelcomeEmailToBrand(updatedUser);
                             }else{
                                   sendWelcomeEmailToCreator(updatedUser);
                             }
                     }else{
                            throw new Error("User account not verified.")
                     }
                }else{
                     throw new Error("Invalid Otp code. Please input the correct one.")
                }
          }
})

//Resend OTP code
export const ResendUserOtp = asyncHandler(async(req, res) => {
         const { id } = req.body;
         const user_id = new mongoose.Types.ObjectId(id);
         const user = await User.findById(user_id);
         const dbVerify =  await UserVerification.find({ user_id: user_id });
         if(dbVerify){
              const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});
         }
         const otpSent = sendEmailVerification(user);

         if(otpSent){
              res.status(201).json({
                     name: user.name,
                     id: user._id
              }) 
         }else{
              res.status(500);
              throw new Error("OTP not sent. Please try again later");
         }
})

//Reset Password Methods
export const SendResetPasswordCode = asyncHandler(async(req, res) => {
       const { email } = req.body;

       const user = await User.findOne({ email });
       
       if(user){
             const email_result = sendPasswordVerification(user);
             if(email_result){
                      res.status(201).json({
                             message: "We've sent you an OTP to your account email address.",
                             id: user._id
                      })
             }
       }else{
              res.status(400);
              throw new Error("Invalid User account. Kindly register with us first.")
       }
})

//Confirm password reset request
export const ConfirmPasswordResetRequest = asyncHandler(async(req, res) => {
        const { id, otp } = req.body;

        const user_id = new mongoose.Types.ObjectId(id);
        const user = await User.findById(user_id);
        const dbOtp = await UserVerification.find({ user_id: user_id });

        const { uniqueOtp, expiresAt } = dbOtp[0];

        if(expiresAt < Date.now()){
                 res.status(400);
                 throw new Error("Sorry the Otp code has expired. Please resend another.");
                 const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});

        }else{
                if(uniqueOtp === otp){
                         //otp verified
                         res.status(201).json({
                                id: user._id,
                                message: 'Password Reset Request Verified',
                         })
                         const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});
                }else{
                       res.status(400);
                       throw new Error("Invalid password reset OTP. ")
                }
        }
})

//Resend Password Reset OTP
export const ResendPasswordResetOtp = asyncHandler(async(req, res) => {
       const { id } = req.body;
       const user_id = new mongoose.Types.ObjectId(id);
       const user = await User.findById(user_id);
       const dbVerify =  await UserVerification.find({ user_id: user_id });
       if(dbVerify){
            const deleteOtp = await UserVerification.findOneAndRemove({ user_id: user_id});
       }
       const otpSent = sendPasswordVerification(user);

       if(otpSent){
            res.status(201).json({
                   message: "We've sent you an OTP to your account email address",
                   name: user.name,
                   id: user._id
            }) 
       }else{
            res.status(500);
            throw new Error("OTP not sent. Please try again later");
       }
})

//Reset Password
export const ResetUserPassword = asyncHandler(async(req, res) => {
         const { id, password } = req.body;

         const user_id = new mongoose.Types.ObjectId(id);
         const updatePassword = await User.findByIdAndUpdate(user_id, {
                 password: password
         }, { new: true})

         if(updatePassword){
                   res.status(201).json({
                          message: 'Password reset successful'
                   })
                   sendPasswordResetEmail(updatePassword)
         }else{
               throw new Error("Password reset unsuccessful")
         }
})


//Get User Profile
export const GetProfile = asyncHandler(async(req, res) => {
       const user =  await User.findById(req.user._id).select('-password');
       //const user = await User.findOne({ _id: req.user._id, verified: true}).select("-password")
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
             res.cookie('mimic', '', {
                   expires: new Date(0)
             })
            
             res.status(200).json({ message: 'You have logged out'})
})


// Send Request to Admin to approve Creator to work with brand
export const AssetCreationRequest = asyncHandler(async(req, res) => {
         const { brandId } = req.body;
         const creator_id = req.user._id;
         const brand_id = new mongoose.Types.ObjectId(`${brandId}`)
         const creator_details = await User.findById(creator_id).select('name profilePic')
         const brand_details = await User.findById(brand_id).select('name profilePic')
         const admin_id = await User.find({ role: "Admin"}).select('_id');
         const admin_message = `${creator_details.name} requests to work with ${brand_details.name}`
         
         try {
              const creator_request = await Request.create({ creator: creator_id, brand: brand_id, message: admin_message})
              
              if(creator_request){
                     res.status(201).json({ status: 'Your request has been received.'});
                     
                     const notifications = await Notifications.create({
                            notification_type: 'Request',
                            sender: {
                                   senderId: creator_request.creator,
                                   senderMsg: `You have requested to work with ${brand_details.name}`,
                                   profilePhoto: creator_details.profilePic.url
                            },
                            receipient: {
                                   receipientId: admin_id[0]._id,
                                   receipientMsg: creator_request.message,
                            }
                      })
              }      
         } catch (error) {
                res.status(401).json({ message: "Request Failed. Sorry, its not your fault. Please try again later"});
                throw new Error('Request was not created')
         }
})

//Subscribe to work with a Brand
export const SubscribeToBrand = asyncHandler(async(req, res) => {
         const { brandId } = req.body;
         const creator_id = req.user._id;
         
         const brand_id = new mongoose.Types.ObjectId(`${brandId}`);
         const creator_details = await User.findById(creator_id)
         const brand_details = await User.findById(brand_id)

       //existance check
       const creatorCheck = creator_details.brands.some(item => item === brand_id);
       const brandCheck = brand_details.creators.some(item => item === creator_id);

       if(!creatorCheck && !brandCheck){//checks if creator has already subscribed to the subject brand
              const updateCreator = await User.findByIdAndUpdate(creator_id, {
                     $push: { brands: brand_id}
              }, { new: true})
              const updateBrand = await User.findByIdAndUpdate(brand_id, {
                     $push: { creators: creator_id}
               }, { new: true})

               if(updateBrand && updateCreator){
                     res.status(201).json({ status: "Subscription Successful"})
               }else{
                      res.status(500).json({ message: "Subscription failed. Please try again later."})
               }
       }

       //Create notifications for the above action
       const subscription_msg = `You have subscribed to ${brand_details.name}`

       const notify = await Notifications.create({
               notification_type: 'Subscription',
               sender: {
                      senderId: creator_id,
                      senderMsg: subscription_msg,
                      profilePhoto: creator_details.profilePic.url
               }
       })
})



//Get Submitted Brand Requests
export const GetUserBrandRequests = asyncHandler(async(req, res) => {
        const user_requests = await Request.find({ creator: req.user._id, handledStatus: 'Pending'}).select('brand');

        if(user_requests){
              res.status(200).json({ user_requests})
        }else{
              res.status(400).json({ message: 'Sorry, no request by this user'})
        }
})
//Get Brands Partially
export const GetAllBrandsForCreators = asyncHandler(async(req, res) => {
       const brands = await User.find({ role: 'Brand'}).select('name bio profilePic');

       if(brands){
               res.status(200).json({ brands })
       }else{
            res.status(400).json({ message: 'Sorry, no brands found for your selection'})
       }
})

// Get user unread Notifications
export const GetUserUnreadNotifications = asyncHandler(async(req, res) => {
       const unread_receipient_notifications = await Notifications.find({ "receipient.receipientId": req.user._id, "receipient.isRead": false})
       const unread_sender_notifications = await Notifications.find({ "sender.senderId": req.user._id, "sender.isRead": false})
       
        const notifications = unread_sender_notifications.concat(unread_receipient_notifications);
        
        if(notifications){
              res.status(201).json({ notifications })
        }else{
              res.status(500).json({ message: 'Sorry, no notifications found' })
        }
})
// Get all user notifications
export const GetAllUserNotifications = asyncHandler(async(req, res) => {
       const receipient_notifications = await Notifications.find({ "receipient.receipientId": req.user._id});
       const sender_notifications = await Notifications.find({ "sender.senderId": req.user._id });

       const notifications = sender_notifications.concat(receipient_notifications);

       if(notifications){
               res.status(201).json({ notifications})
       }else{
              res.status(500).json({ msg: 'Sorry, an error occured while pulling notifications from db'})
       }
})
//Update read Status for User Notifications
export const UpdateAllNotificationsStatus = asyncHandler(async(req, res) => {
        const updateReceiptNotifications = await Notifications.updateMany({"receipient.receipientId": req.user._id}, { "$set": {"receipient.isRead": true}})
    
        const updateSendNotifications = await Notifications.updateMany({ "sender.senderId": req.user._id }, { "$set" : { "sender.isRead": true }})
       
        if(updateReceiptNotifications.acknowledged && updateSendNotifications.acknowledged){
                 res.status(200).json({ msg: 'All Upto to date'})
        }else{
                res.status(500).json({ msg: 'An error occured while updating notifications'})
        }
})


//Retrieve all Rewards for a specific creator
export const GetAllRewardsForConsumer = asyncHandler(async(req, res) => {
         const creatorId = req.user._id;
         //filter rewards
         const result = await Reward.find({ beneficiaries: { $elemMatch: { $eq: creatorId} }})

         if(result){
                 res.status(200).json({ result })
         }else{
                 res.status(500).json({ message: "Internal server error, getting creator rewards failure"})
         }
})