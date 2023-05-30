import asyncHandler from "express-async-handler";
import Consumer from "../models/consumerModel.js";
import generateToken from "../utils/generateToken.js";

//Login Consumer
export const LoginConsumer = asyncHandler(async(req, res) => {
     const { email, password } = req.body;

     const consumer = await Consumer.findOne( { email } );

     if(consumer && (await consumer.matchPasswords(password))){
            generateToken(res, consumer._id);

            res.status(201).json({
                 message: "Login Successful. Thanks"
            });
     }else{
            res.status(401);
            throw new Error("Invalid Email or Password");
     }
});

//Register Consumer
export const RegisterConsumer = asyncHandler(async(req, res) => {
       const { name, email, password } = req.body;

       const userExists = await Consumer.findOne({ email });

       if(userExists){
             res.status(400);
             throw new Error("Consumer Account already exists.")
       }

       const consumer = await Consumer.create({
            name,
            email,
            password
       });

       if(consumer){
               generateToken(res, consumer._id);

               res.status(201).json({
                    _id: consumer._id,
                    name: consumer.name,
                    email: consumer.email
               });
       }else{
               res.status(400);
               throw new Error("Invalid Consumer data. Please try again");
       }
});

export const LogoutConsumer = asyncHandler(async(req, res) => {
        res.cookie("jwt", "", {
               httpOnly: true,
               expires: new Date(0)
        })
        res.status(200).json({ message: "Consumer logged out Successfully"})
})