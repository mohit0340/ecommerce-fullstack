import express from "express";
import User from "../model/user/user.models.js";
import Product from "../model/product/product.models.js";
import {upload} from "../middleware/file-upload.js";
import fs from "fs"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import {uploadproduct} from '../middleware/file-upload.js'
import Category from "../model/product/category.js";



const router = express.Router();




// product add

router.post('/add', uploadproduct.single('image'), async (req, res) => {
  const {productname,category,price,description}=req.body
  const {path}=req.file
  try {
    console.log('Request body:', productname,category,price,description,path);
    

    if (productname&&category&&price&&description&&path) {
      const product = new Product({
        productname: productname,
        category: category,
        price:price,
        description: description,
        image:path,
      });

      const saveProduct = await product.save();
      if (saveProduct) {
        res.status(200).json({ message: 'Product added successfully', product });
      } else {
        // In case the product is not saved, delete the uploaded image
        if (req.file) {
          try {
            await fs.promises.unlink(req.file.path);
            console.log('Uploaded image deleted due to product not being saved.');
          } catch (deleteError) {
            console.error('Error deleting uploaded image:', deleteError.message);
          }
        }
        res.status(400).json({ message: 'Product not saved' });
      }
    } else {
      // In case of missing required data, delete the uploaded image
      if (req.file) {
        try {
          await fs.promises.unlink(req.file.path);
          console.log('Uploaded image deleted due to missing required data.');
        } catch (deleteError) {
          console.error('Error deleting uploaded image:', deleteError.message);
        }
      }
      res.status(400).json({ message: 'All data required' });
    }
  } catch (error) {
    console.error('Error:', error.message);

    // In case of any error, delete the uploaded image
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path);
        console.log('Uploaded image deleted due to registration error.');
      } catch (deleteError) {
        console.error('Error deleting uploaded image:', deleteError.message);
      }
    }

    res.status(500).json({ message: 'Server error' });
  }
});


// get products 
router.get('/', async (req, res) => {
  const { category, searchTerm } = req.query; // Look for category and searchTerm in query parameters

  try {
    const matchStage = {
      $match: {}
    };

    if (category && category !== 'all') {
      matchStage.$match.category = category; // Filter by category if provided and not 'all'
    }

    if (searchTerm) {
      matchStage.$match.productname = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search on product name
    }

    const products = await Product.aggregate([
      matchStage,
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          products: 1
        }
      }
    ]);

    const groupedProducts = products.reduce((acc, productGroup) => {
      acc[productGroup.category] = productGroup.products;
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

  router.delete('/:id',async(req,res)=>{
    const { id } = req.params;
    try{
      if(id){
      const deleteProduct=await Product.deleteOne({_id:id})

      if(deleteProduct){
        res.status(200).json({message:"Product deleted Successfully"})
      }
      else{
        res.status(400).json({message:"Somthing went wrong!"})
      }}
      else{
        res.status(404).json({message:"Product not Found!"})
      }

    }
    catch(err){
      res.status(500).json({message:"Server Error",err})  
    }

  })



  router.get('/category', async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.post('/category', async (req, res) => {
    const { name } = req.body;
  
    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: 'Please provide a name for the category' });
    }
  
    // Convert name to lowercase before saving
    const lowercaseName = name.toLowerCase();
  
    try {
      const existingCategory = await Category.findOne({ name: lowercaseName });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
  
      const category = new Category({ name: lowercaseName });
      await category.save();
  
      // Use status code 201 for successful creation
      res.status(200).json({ message: 'Category created successfully', category });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

  // Update or Delete a category (combined endpoint)
  router.put('/category/update', async (req, res) => {
    const { id, name } = req.body;
  
    // Check if id is provided
    if (!id) {
      return res.status(400).json({ message: 'Please provide the category ID' });
    }
  
    try {
      // Convert id to ObjectId
     
      const category = await Category.findById(id);
      console.log(category)
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      if (name) {
        // Update logic
        const lowercaseName = name.toLowerCase();
  
        const existingCategory = await Category.findOne({ name: lowercaseName });
        if (existingCategory && existingCategory._id.toString() !== id) {
          return res.status(409).json({ message: 'Category with this name already exists' });
        }
  
        category.name = lowercaseName;
        await category.save();
        return res.status(200).json({ message: 'Category updated successfully' });
  
      } else {
        // Delete logic
        await category.deleteOne();
        return res.status(200).json({ message: 'Category deleted successfully' });
      }
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' ,err});
    }
  });



export default router;
