import express from 'express';
import mongoose from 'mongoose';
import  userRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import adminRoutes from './routes/admin.js'
import cors from 'cors'



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











  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/admin', adminRoutes);


  

  app.get('/',(req,res)=>{
    res.send("hii")
  })







app.listen('5000',()=>{
    console.log('app is listening on 5000')
  
})