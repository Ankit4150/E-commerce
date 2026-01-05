const mongoose=require("mongoose");


const productSchema=mongoose.Schema({
     productName:String,
    brandName:String,
    category:String,
    productImage:[],
    despcription:String,
    price:Number,
    sellingPrice:Number
},
{
    timestamps:true
}

)


const productModule=mongoose.model("product",productSchema);


module.exports=productModule;