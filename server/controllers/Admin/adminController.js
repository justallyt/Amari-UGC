import asyncHandler from "express-async-handler";
import cloudinary from "../../utils/cloudinary.js";
import User from "../../models/usersModel.js";

export const UpdateAdminProfile = asyncHandler(async(req, res) => {
       const user = await User.findById(req.user._id);

       if(user){
                try{
                     let public_id, url;
                     //profile photo not uploaded

                     if(!req.file){
                            public_id = user.profilePic.public_id;
                            url = user.profilePic.url;
                     }else{
                           const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: 'profilephotos'});

                           public_id  = cloudinary_result.public_id;
                           url = cloudinary_result.secure_url;
                     }

                     //Update admin Account
                     const { name, username, email, phone, country, city, password } = JSON.parse(req.body.data);

                     const updateAdmin = await User.findByIdAndUpdate(user._id, {
                             name: name,
                             email: email,
                             username: username,
                             phone: phone,
                             address: {
                                     country: country,
                                     city: city
                             },
                             profilePic: {
                                    public_id: public_id,
                                    url: url
                             }
                     }, { new: true })

                     if(updateAdmin){
                             res.status(201).json({ message: 'Details updated successfully', info: updateAdmin})
                     }else{
                            res.status(401).json({ message: 'Accout update failed. Please try again later.'})
                     }
                } catch(error){
                        console.log("Upload error. Internal server error")
                }
       }else{
              res.status(401).json({ message: 'An error occured. Not authorized to update at this time.'})
       }
})