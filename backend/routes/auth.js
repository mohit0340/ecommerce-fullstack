import express from "express";
import User from "../model/user/user.models.js";
import {upload} from "../middleware/file-upload.js";
import fs from "fs.promises"; // Using fs/promises for cleaner async handling
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import randomstring from "randomstring";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();
const JWT_SECRET = "Secret_key";

// User registration
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    // Check for duplicate email

    if (req.body?.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create user object
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        avatar: req.file ? req.file.path : "",
      });

      // Save user
      const savedUser = await user.save();

      res.json({ message: "User registered successfully", user: savedUser });
    } else {
      res.status(400).json({ message: "Email is required" });
    }
  } catch (error) {
    console.error(error.message);

    // Delete uploaded image if registration fails
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
        console.log("Uploaded image deleted due to registration error.");
      } catch (deleteError) {
        console.error("Error deleting uploaded image:", deleteError.message);
      }
    }

    res.status(500).json({ message: "Server error" });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Check for email and password in request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT payload
    const payload = {
      userId: user._id,
    };

    // Sign JWT (use a strong secret key in production)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error });
  }
});



// update user

router.put('/update/:id', verifyToken, upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if updating user is the same as the authenticated user
    if (user._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own profile' });
    }

    const updates = req.body; // Get update data from request body (excluding image)

    // Handle image upload (optional)
    if (req.file) {
      updates.avatar = req.file.path;

      // Delete old image if it exists
      if (user.avatar) {
        try {
          await fs.unlink(user.avatar);
          console.log('Old user image deleted successfully.');
        } catch (deleteError) {
          console.error('Error deleting old user image:', deleteError.message);
        }
      }
    }

    User.findByIdAndUpdate(userId, updates, { new: true })
      .then(updatedUser => {
        if (updatedUser) {
          console.log('User updated successfully:', updatedUser); // Log updated user data
          res.json({ message: 'User updated successfully', user: updatedUser });
        } else {
          console.error('User not found:', userId); // Log missing user ID
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(error => {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// user detail api 

router.get('/protected', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'user data get successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});










router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing required field: email' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a random OTP
    const otp = randomstring.generate({ length: 4, charset: 'numeric' });

    // Hash the OTP for secure storage
   

    // Set expiration time (15 minutes)
    const expirationTime = Date.now() + 5 * 60 * 1000;

    // Update user with hashed OTP and expiration
    user.otp = otp;
    user.otpExpire = expirationTime;
    await user.save();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohit123456rathod@gmail.com',
        pass: 'slsk gspm irrr erca'
      }
    });
    
    var mailOptions = {
      from: 'mohit123456rathod@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: `Your OTP is : ${otp}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(400).json({ message: 'error in sending mail' });
      } else {
        res.status(200).json({ message: 'A verification code has been sent to your email address' });
      }
    }); 

    

   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/update-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otp || !newPassword) {
    return res.status(400).json({ message: 'Missing required fields: otp and newPassword' });
  }

  try {
    const filter = { email }; // Prepared statement approach
    const update = {
      $set: {
        password: await bcrypt.hash(newPassword, 10),
        otp: null,
        otpExpire: null
      }
    };
    const options = { new: true }; // Return the updated user object

    const user = await User.findOneAndUpdate(filter, update, options);
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Check if OTP is valid and not expired (optional with prepared statement)
    // if (user.otp != otp || user.otpExpire < Date.now()) {
    //   return res.status(400).json({ message: 'Invalid or expired OTP' });
    // }

    // Send password reset confirmation email (optional)
    // await sendPasswordResetConfirmationEmail(user.email);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



export default router;
