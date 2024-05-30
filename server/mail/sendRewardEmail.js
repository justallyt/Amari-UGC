import dotenv from "dotenv"
import { mailTransport } from "../config/mailconfig.js";
import ejs from "ejs"
import fs from "fs"
import Notifications from "../models/NotificationsModel.js";

dotenv.config();

export const sendRewardEmail = async(user, brandName, coupon) => {
      const { name, email } = user;
      const templateString = fs.readFileSync("./mail/views/reward_creator.ejs", 'utf-8')
      const single_name = name.split(" ")[0]
 
      const dynamicData = {
               name: single_name,
               brand: brandName,
               coupon: coupon
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