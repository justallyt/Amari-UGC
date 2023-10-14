import asyncHandler from "express-async-handler";
import cloudinary from "../../utils/cloudinary.js";
import User from "../../models/usersModel.js";
import Notifications from "../../models/NotificationsModel.js";
import Request from "../../models/RequestsModel.js";

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

//Get All Creators
export const GetAllCreators = asyncHandler(asyncHandler(async(req, res) => {
       const all_creators = await User.find({ role: 'Creator'}).select('-password');

       if(all_creators){
                res.status(200).json({ all_creators })
       }else{
               res.status(500).json({ message: 'Oops, no creators found. Server error'})
       }
}))

//Get All Brands
export const GetAllBrands = asyncHandler(async(req, res) => {
       const all_brands = await User.find({ role: 'Brand'}).select('-password');

       if(all_brands){
               res.status(200).json({ all_brands })
       }else{
            res.status(400).json({ message: 'Sorry, no brands found for your selection'})
       }
})

//Get all notifications za Admin
export const GetAdminNotifications = asyncHandler(async(req, res) => {
       const notifications = await Notifications.find({ "receipient.receipientId": req.user._id})
     
       if(notifications){
               res.status(200).json({ notifications })
       }else{
              res.status(500).json({ message: 'Sorry, no notifications could be pulled at this time'})
       }
})

//Get All Requests to the Admin
export const GetAllRequestsToAdmin = asyncHandler(async(req, res) => {
       const all_requests  = await Request.find({ approved: false, handledStatus: 'Pending'})

       if(all_requests){
               res.status(200).json({ all_requests })
       }else{
              res.status(500).json({ message: 'Sorry, no requests were received'})
       }
})


//Approve Creator Requests
export const ApproveCreatorRequest = asyncHandler(async(req, res) => {
       const { id } = req.body;
       const admin_id = req.user._id; 

       const request_id = new mongoose.Types.ObjectId(`${id}`);

       const update_request = await Request.findByIdAndUpdate(request_id, {
             approved: true,
             handledStatus: 'Completed'
       })

       if(update_request){
              res.status(200).json({ message: 'Approval Successful'})
              //Update Brands for A Creator
              const existingCreators = await User.findById(update_request.creator);
              const existingBrands = await User.findById(update_request.brand)
             
              const  creatorCheckTest = existingCreators.brands.some(item => item === update_request.brand);
              const brandCheckTest = existingBrands.creators.some(item => item === update_request.creator);

              if(!creatorCheckTest){ //checks if brand has already been added to a creator
                    //update creator brand list
                   const updateCreator = await User.findByIdAndUpdate(update_request.creator, {
                          $push: { brands: update_request.brand}
                   })
              }
              if(!brandCheckTest){ //checks if creator already added to a brand
                     //Update Creators for A Brand
                    const updateBrand = await User.findByIdAndUpdate(update_request.brand, {
                         $push: { creators: update_request.creator}
                    })
              }
               
              //Create a notification for the above actions
              const approval_msg = `You have been approved to work with ${existingBrands.name}`
              
              const notifications = await Notifications.create({
                   notification_type: 'Approval',
                   sender: {
                          senderId: admin_id,
                   },
                   receipient: {
                          receipientId: update_request.creator,
                          receipientMsg: approval_msg
                   }
             })
     
       }else{
              res.status(500).json({ error: 'Failed to approve request'})
       }
})

//Get All Approved Requests
export const ApprovedRequests = asyncHandler(async(req, res) => {
     const requests  = await Request.find({ approved: true, handledStatus: 'Completed'})

     if(requests){
             res.status(200).json({ requests })
     }else{
            res.status(500).json({ message: 'Sorry, no requests were received'})
     }
})