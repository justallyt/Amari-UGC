import dotenv from "dotenv";
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs";

dotenv.config();

export const sendWelcomeEmailToCreator = async(userData) => {
     const { email, name } = userData;
     const templateString = fs.readFileSync('./mail/views/welcomeCreator.ejs', 'utf-8');
     const dynamicData = {
        name: name,
}
     const html = ejs.render(templateString, dynamicData);

     const mailOptions = {
        from: `Amari Team <${process.env.EMAIL}>`,
        to: `${email}`,
        name: 'Amari Team',
        subject: 'Welcome to Amari  –  Where Your Voice Shapes the Brands You Love! ',
        html: html
    }
    
    //Send email
    mailTransport.sendMail(mailOptions).then(() => {
           return true;
   })

}