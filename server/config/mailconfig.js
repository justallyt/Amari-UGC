import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

export const mailTransport = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
    }
}) 
 

// const activateMail =  () => {


//     mailTransport.verify((error) =>{
//             if(error){
//                     console.log(error)
//             }else{
//                   console.log("Connection activated")
//             }
//          })
// }
 