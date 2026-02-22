
const mongoose=require("mongoose")

const reviewsSchema=  mongoose.Schema({
     review:String,
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
       required:true
     },
      productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  }
     
},{
     timestamps:true
}
)
const reviewModels= mongoose.model("review",reviewsSchema);

module.exports=reviewModels;