import mongoose, { Schema } from "mongoose";
//import User from "./usersModel";

const videosSchema = mongoose.Schema({
         creator: {
              type: Schema.Types.ObjectId,
              ref: 'User'
         },
         created_for: {
                   type: String,
                  required: true
         },
         published: {
               type: Boolean,
         },
         brand_product: {
                type: String
         },
         caption: {
               type: String,
         },
         video: {
                asset_id: { type: String},
                 url: { type: String, required: true},
                 thumbnail: { type: String, required: true}
         }
}, { timestamps: true})

const Video = mongoose.model('Video', videosSchema);

export default Video