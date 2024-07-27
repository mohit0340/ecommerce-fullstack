import express from 'express';
import  Cart  from '../model/product/cart.js';
import verifyToken from '../middleware/verifyToken.js';




const router=express.Router();




router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    
  
    try {
      const cart = await Cart.findOne({ addedby: userId }).populate('products.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Please add cart in items' });
      }
      else{
        res.status(200).json({message:"cart get successfully",cart:cart});
      }
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/update', async (req, res) => {
    const { userId, productId, quantity, action } = req.body;
  
    try {
      let cart = await Cart.findOne({ addedby: userId });
  
      if (!cart) {
        // Create a new cart for the user
        cart = new Cart({ addedby: userId });
      }
  
      const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
  
      switch (action) {
        case 'add':
          if (productIndex !== -1) {
            // Product already exists, increment quantity
            cart.products[productIndex].quantity += 1;
          } else {
            // Add product to cart
            cart.products.push({ product: productId, quantity: quantity || 1 });
          }
          break;
        case 'increment':
          if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
          } else {
            // Handle error: product not found in cart
            return res.status(404).json({ message: 'Product not found in cart' });
          }
          break;
        case 'decrement':
          if (productIndex !== -1) {
            cart.products[productIndex].quantity -= 1;
            if (cart.products[productIndex].quantity === 0) {
              // Remove product from cart if quantity reaches 0
              cart.products.splice(productIndex, 1);
            }
          } else {
            // Handle error: product not found in cart
            return res.status(404).json({ message: 'Product not found in cart' });
          }
          break;
        case 'remove':
          if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
          } else {
            // Handle error: product not found in cart
            return res.status(404).json({ message: 'Product not found in cart' });
          }
          break;
        case 'clear':
          cart.products = [];
          break;
        default:
          return res.status(400).json({ message: 'Invalid action' });
      }
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

//   router.post('/update', verifyToken, async (req, res) => {
//     const { userId } = req.user;
//     const { action, productId, quantity } = req.body;
  
//     if (!action || !userId) {
//       return res.status(400).json({ error: "Missing required fields (action, userId)" });
//     }
  
//     try {
//       const update = { $set: {} }; // Create an update object
  
//       switch (action.toLowerCase()) {
//         case "add":
//           update.$addToSet = { products: { product: productId, quantity } }; // Add new product
//           break;
//         case "remove":
//           update.$pull = { products: { product: productId } }; // Remove product
//           break;
//         case "increment":
//           update.$inc = { "products.$[elem].quantity": quantity }; // Increment quantity using positional operator
//           break;
//         case "decrement":
//           update.$inc = { "products.$[elem].quantity": -1 }; // Decrement quantity
//           break;
//         case "clear":
//           update.$set = { products: [] }; // Clear cart
//           break;
//         default:
//           return res.status(400).json({ error: "Invalid action provided" });
//       }
  
//       const cart = await Cart.findOneAndUpdate(
//         { addedBy: userId },
//         update,
//         { new: true } // Return the updated cart
//       );
  
//       if (!cart) {
//         return res.status(404).json({ message: "Cart not found for the user" });
//       }
  
//       return res.status(200).json({ message: "Cart updated successfully", cart });
//     } catch (error) {
//       console.error(error);
  
//       if (error.name === "CastError") {
//         return res.status(400).json({ error: "Invalid product or user ID" });
//       }
  
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   });





  export default router


