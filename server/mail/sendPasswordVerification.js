import dotenv from "dotenv"
import { generateOTP } from "../utils/generateOTP.js";
import UserVerification from "../models/VerificationModel.js";
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs"
import mongoose from "mongoose";
dotenv.config();

export const sendPasswordVerification = async(userData) => {
      const { _id, email, name } = userData;
      const otp = generateOTP();

      const templateString = fs.readFileSync('./mail/views/reset_verification.ejs', 'utf-8');
      const dynamicData = {
               name: name,
               otp: otp,
      }
      const html = ejs.render(templateString, dynamicData);

      const mailOptions = {
           from: `Amari Team <${process.env.EMAIL}>`,
           to: `${email}`,
           name: 'Amari Team',
           subject: 'AMARI UGC Password Reset Code',
           html: html
       }

       const verification = await UserVerification.create({
            user_id: new mongoose.Types.ObjectId(_id),
            uniqueOtp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 180000 //expires after 3 minutes
       })
     
     if(verification){
             mailTransport.sendMail(mailOptions).then(() => {
                  return true;
             })
      }else{
                return false;
      }
}