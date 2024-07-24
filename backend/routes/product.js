import express from "express";
import User from "../model/user/user.models.js";
import Product from "../model/product/product.models.js";
import {upload} from "../middleware/file-upload.js";
import fs from "fs.promises"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import {uploadproduct} from '../middleware/file-upload.js'




const router = express.Router();




// product add

router.post("/add", uploadproduct.single("image"), async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);
  
      if (req.body?.productname && req.body?.category && req.body?.price && req.body?.description && req.file) {
        const product = new Product({
          productname: req.body.productname,
          category: req.body.category,
          price: req.body.price,
          description: req.body.description,
          image: req.file.path,
        });
  
        const saveProduct = await product.save();
        if (saveProduct) {
          res.status(200).json({ message: "Product added successfully", product });
        } else {
          res.status(400).json({ message: "Product not saved" });
        }
      } else {
        res.status(400).json({ message: "All data required" });
      }
    } catch (error) {
      console.error("Error:", error.message);
  
      if (req.file) {
        try {
          await fs.promises.unlink(req.file.path);
          console.log("Uploaded image deleted due to registration error.");
        } catch (deleteError) {
          console.error("Error deleting uploaded image:", deleteError.message);
        }
      }
  
      res.status(500).json({ message: "Server error" });
    }
  });



// get products 
router.get('/', async (req, res) => {
    const { category, searchTerm } = req.query; // Look for category and searchTerm in query parameters
  
    try {
      let query = {};
  
      if (category) {
        query.category = category; // Filter by category if provided
      }
  
      if (searchTerm) {
        query.$text = { $search: searchTerm }; // Text search using MongoDB full-text search
      }
  
      const products = await Product.find(query);
  
      // Group products by category
      const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {});
  
      res.json({ products: groupedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.put('/:id', uploadproduct.single('image'), async (req, res) => {
    const { id } = req.params;
    const { productname, category, price, description } = req.body;
    const file = req.file;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update product details
      if (productname) product.productname = productname;
      if (category) product.category = category;
      if (price) product.price = price;
      if (description) product.description = description;
  
      // Handle image update
      if (file) {
        // Remove old image if it exists
        if (product.image) {
          try {
            await fs.promises.unlink(product.image);
            console.log('Old image deleted');
          } catch (error) {
            console.error('Error deleting old image:', error.message);
          }
        }
        // Set new image path
        product.image = file.path;
      }
  
      const updatedProduct = await product.save();
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;
