import express from 'express';
import jwt from  'jsonwebtoken'



const JWT_SECRET = "Secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = decoded; // Add decoded user ID to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default verifyToken;
