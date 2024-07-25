    import mongoose from "mongoose";


    const CartSchema=new mongoose.Schema({
        addedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        
        },
        products: [
            {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min:1,
            },
            
            },
        ]
        
    },{timestamps:true})


  const Cart=mongoose.model('Cart',CartSchema)

 export default Cart