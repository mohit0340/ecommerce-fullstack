import { response, Router } from "express";
import User from "../model/user/user.models.js"; // Assuming the correct path
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

const JWT_SECRET = "Secret_key";

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];


  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Assuming the format is "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
   
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Failed to authenticate token:", err);
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

// Route to fetch all users
router.get("/users", authenticate, async (req, res) => {
  try {
    const userId = req.user;
    // Find the cart for the user
    
    let userrole = await User.findById(userId.userId);

    if (userrole.role && userrole.role == "admin") {
      const users = await User.find();

      if (users.length > 0) {
        res
          .status(200)
          .json({ message: "Users fetched successfully", data: users });
      } else {
        res.status(404).json({ message: "No users found" });
      }
    } else {
      res
        .status(404)
        .json({ message: "Sorry You unauthorised For this requeste" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/:_email", async (req, res) => {
  const { _email } = req.params;

  const param = String(_email);
  try {
    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { firstname: { $regex: param, $options: "i" } },
            { lastname: { $regex: param, $options: "i" } },
            { email: { $regex: param, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          email: 1,
          firstname: 1,
          lastname: 1,
        },
      },
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/",verifyToken,async (req, res) => {
  const { role, Id } = req.body;
  console.log(role,Id);
  const {userId}=req.user
  try {
    const admin= User.findOne({_id:userId})
    console.log(admin.role)

    if(admin?.role=="admin"){
  const { role, Id } = req.body;
  console.log(role);
  const lowercaseName = role.toLowerCase();
 
    if (!userId || !role) {
      return res.status(404).json({ message: "No users found" });
    } else {
      const users = await User.updateOne({ _id: Id }, [
        { $set: { role: lowercaseName } },
      ]);
      if (users) {
        res
          .status(200)
          .json({ message: "User Role Updated successfully", users });
      }
    }}
    else{
      res.status(401).json('You have not authority for update role')
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
