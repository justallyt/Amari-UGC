import mongoose, { Schema } from "mongoose";
//import User from "./usersModel";

const videosSchema = mongoose.Schema({
         user: {
              type: Schema.Types.ObjectId,
              ref: 'User'
         },
         created_for: {
                   type: String,
                  required: true
         },
         brand_product: {
                type: String
         },
         caption: {
               type: String,
         },
         video: {
                public_id: { type: String},
                 url: { type: String},
                 thumbnail: { type: String}
         }
}, { timestamps: true})

const Video = mongoose.model('Video', videosSchema);

export default Video