import dotenv from "dotenv";
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs";

dotenv.config();

export const sendWelcomeEmailToBrand = async(userData) => {
     const { email, name } = userData;
     const templateString = fs.readFileSync('./mail/welcomeBrand.ejs', 'utf-8');
     const dynamicData = {
        name: name,
}
     const html = ejs.render(templateString, dynamicData);

     const mailOptions = {
        from: `Amari UGC Team <${process.env.EMAIL}>`,
        to: `${email}`,
        name: 'Amari Team',
        subject: 'Welcome to AMARI UGC',
        html: html
    }
    
    //Send email
    mailTransport.sendMail(mailOptions).then(() => {
           return true;
   })

}