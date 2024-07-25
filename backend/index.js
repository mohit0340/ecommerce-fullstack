import express from 'express';
import mongoose from 'mongoose';
import  userRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import adminRoutes from './routes/admin.js'
import cartRoutes from './routes/cart.js'
import cors from 'cors'
import {fileURLToPath} from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express()

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb://localhost:27017/employee-data',);
      if(conn){
        console.log(`MongoDB Connected`);
      }
     
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

  connectDB();

  app.use(cors())


  app.use(express.json());









  app.use('/uploads/avatar', express.static(path.join(__dirname, 'uploads/avatar')));
  app.use('/uploads/product', express.static(path.join(__dirname, 'uploads/product')));

  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/cart', cartRoutes);



  

  app.get('/',(req,res)=>{
    res.send("hii")
  })







app.listen('5000',()=>{
    console.log('app is listening on 5000')
  
})