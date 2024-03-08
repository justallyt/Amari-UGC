import dotenv from "dotenv"
import { generateOTP } from "../utils/generateOTP.js";
import UserVerification from "../models/VerificationModel.js";
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs"
dotenv.config();

export const sendEmailVerification = async(userData) => {
      const { _id, email, name } = userData;
      const otp = generateOTP();

      const templateString = fs.readFileSync('./mail/verification.ejs', 'utf-8');
      const dynamicData = {
               name: name,
               otp: otp,
      }
      const html = ejs.render(templateString, dynamicData);

      const mailOptions = {
           from: `Amari UGC Team <${process.env.EMAIL}>`,
           to: `${email}`,
           name: 'Amari Team',
           subject: 'AMARI UGC Verification Code',
           html: html
       }

       const verification = await UserVerification.create({
            user_id: _id,
            uniqueOtp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000
       })
     
     if(verification){
             mailTransport.sendMail(mailOptions).then(() => {
                  //    res.json(201).json({ message: 'Email verification saved and sent.'})
                  return true;
             })
      }else{
                return false;
      }
}