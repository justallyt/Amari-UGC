import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const usersSchema = mongoose.Schema({
        name: {
              type: String,
              required: true
        },
        email: {
              type: String,
              required: true,
              unique: true
        },
        username: {
            type: String,
             default: 'null', 
        },
        bio: {
              type: String,
              default: 'null',
        },
        role: {
             type: String,
             required: true
        },
        password: {
              type: String,
              required: true
        },
        phone: {
              type: String,
        },
        brands: [{ type: Schema.Types.ObjectId , ref: 'User'}],
        creators: [{ type: Schema.Types.ObjectId, ref: 'User'}],
       address: {
              country: { type: String, default: 'null'},
              city: { type: String, default: 'null'}
       },
       businessType: {
             type: String
       },
       profilePic: {
             public_id: { type: String, default: 'null'},
             url: { type: String, default: 'null'}
       },
       verified: {
               type: Boolean,
               default: false
       }
}, { timestamps: true});


usersSchema.pre("save", async function (next) {
        if(!this.isModified('password')){
              next();
        }
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);
})

usersSchema.methods.matchPasswords = async function(enteredPassword) {
       return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", usersSchema);

export default User;