import dotenv from "dotenv"
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs"
import Notifications from "../models/NotificationsModel.js";

dotenv.config();

export const sendRewardEmail = async(type, user, brandName, coupon, description) => {
      const { name, email } = user;
      const templateString = fs.readFileSync("./mail/views/reward_creator.ejs", 'utf-8')
      const customTemplateString = fs.readFileSync("./mail/views/custom_reward.ejs", "utf-8")
      const single_name = name.split(" ")[0]
 
      if(type === 'Custom'){
              const dynamicData2 = {
                     name: single_name,
                     brand: brandName,
                     description: description
              }

              const html2 = ejs.render(customTemplateString, dynamicData2)

              const mailOptions2 = {
                      from: `Amari Team <${process.env.EMAIL}>`,
                      to: `${email}`,
                      name: "Amari Team",
                      subject: "Congratulations! You have a new reward from Amari",
                     html: html2
               }

                       //Send notification to creator
             await Notifications.create({
                  notification_type: "Reward",
                  sender: {
                      senderId: user._id,
                      senderMsg: `Congratulations! You have been rewarded by ${brandName}`,
                      profilePhoto: user.profilePic.url
                    }
                })
           mailTransport.sendMail(mailOptions2)

      }else{
        // send cuopon reward
           const dynamicData = {
                name: single_name,
                brand: brandName,
                coupon: coupon,
                description: description
           }

           const html = ejs.render(templateString, dynamicData);

           const mailOptions = {
                from: `Amari Team <${process.env.EMAIL}>`,
                to: `${email}`,
                name: "Amari Team",
                subject: "Congratulations! You have a new reward from Amari",
                html: html
          }

        //Send notification to creator
         await Notifications.create({
                   notification_type: "Reward",
                   sender: {
                         senderId: user._id,
                         senderMsg: `Congratulations! You have been rewarded by ${brandName}`,
                         profilePhoto: user.profilePic.url
                    }
         })
         mailTransport.sendMail(mailOptions)


 }


      




}