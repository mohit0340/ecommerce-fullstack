    import mongoose from "mongoose";


    const CartSchema=new mongoose.Schema({
        addedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        
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
            },
            
            },
        ]
        
    },{timestamps:true})


    export const Cart=mongoose.model('Cart',CartSchema)