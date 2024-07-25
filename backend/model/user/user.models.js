import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required:true
    },
    lastname: {
      type: String,  
      required:true
    },
    email: {
      type: String, 
      required:true
    },
    password: {
      type: String,
      required:true
      
     
    },
    mobile: {
      type: Number,
      required:true
      
      
    },
    avatar: {
      type: String,
      required:true
      
     
    },
    role:{
      type:String,
      default:"user"
    },
    otp:{
      type:Number,
      
    },
    otpExpire:{
      type:String,
      

    }
  },
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const User = mongoose.model('User', userSchema);

export default User;
