import mongoose, { Schema } from "mongoose";

const rewardSchema = mongoose.Schema({
       reward_owner: {
             type: Schema.Types.ObjectId,
             ref: 'User'
       },
       beneficiaries: [{ type: Schema.Types.ObjectId, ref: "User"}],
       reward_type: {
               type: String,
               required: true
       },
       reward_name: {
             type: String,
             required: true
       },
       reward_code: {
            type: String,
            default: ""
       },
       reward_description: {
            type: String,
            required: true
       }
}, { timestamps: true})

const Reward = mongoose.model("Rewards", rewardSchema);

export default Reward