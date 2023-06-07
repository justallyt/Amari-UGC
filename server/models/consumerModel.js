import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const consumerSchema = mongoose.Schema({
      name: {
           type: String,
           required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      role: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      profilePic: {
           type: String
      }
}, { timestamps: true });


consumerSchema.pre("save", async function(next) {
      if(!this.isModified('password')){
            next();
      }

      const salt = await bcrypt.genSalt(10);

      this.password = await bcrypt.hash(this.password, salt);
});

consumerSchema.methods.matchPasswords = async function(enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
}

const Consumer = mongoose.model("Consumer", consumerSchema);

export default Consumer;