import mongoose, { Schema } from "mongoose";
//import User from "./usersModel";

const assetsSchema = mongoose.Schema({
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
         asset: {
                asset_id: { type: String},
                 url: { type: String, required: true},
                 thumbnail: { type: String, required: true}
         }
}, { timestamps: true})

const Asset = mongoose.model('Asset', assetsSchema);

export default Asset