import mongoose, { Schema } from "mongoose";

const requestSchema = mongoose.Schema({
          creator: {
                 type: Schema.Types.ObjectId,
                 ref: 'User'
          },
          brand: {
                type: Schema.Types.ObjectId,
                ref: 'User'
          },
          message: {
                 type: String,
          }
}, { timestamps: true})

const Request = mongoose.model('Request', requestSchema);

export default Request