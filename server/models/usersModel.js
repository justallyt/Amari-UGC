import mongoose from "mongoose";
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
             unique: true,
             default: 'null'
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
       address: {
              country: { type: String, default: 'null'},
              city: { type: String, default: 'null'}
       },
       businessType: {
             type: String
       },
       profilePic: {
              type: String,
              default: "null"
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