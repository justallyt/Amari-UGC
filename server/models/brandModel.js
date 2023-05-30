import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const brandSchema = mongoose.Schema({
      name: {
          type: String,
          required: true
      },
      email: {
           type: String,
           required: true
      },
      phone: {
            type: String,
            required: true
      },
      country: {
            type: String,
            required: true
      },
      type_of_business: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      profilePic: {
            type: String
      }
}, { timestamps: true });

brandSchema.pre("save", async function(next) {
     if(!this.isModified('password')){
            next();
     }

     const salt = await bcrypt.genSalt(10);

     this.password = await bcrypt.hash(this.password, salt);
})

brandSchema.methods.matchPasswords = async function(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
}

const Brand = mongoose.model("Brand", brandSchema);

export default Brand