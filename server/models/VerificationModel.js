import mongoose from "mongoose";

const verificationSchema = mongoose.Schema({
        user_id: String,
        uniqueOtp: String,
        createdAt: Date,
        expiresAt: Date
})

const UserVerification  = mongoose.model("UserVerification", verificationSchema);

export default UserVerification;