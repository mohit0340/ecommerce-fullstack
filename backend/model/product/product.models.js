import mongoose from "mongoose";


const productSchema= new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

productSchema.index({ productname: 'text', category: 'text' });

const Product =mongoose.model('Product',productSchema)
export default Product