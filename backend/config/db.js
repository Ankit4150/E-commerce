const mongoosh=require("mongoose");


async function connectDB() {
     try{
        await   mongoosh.connect(process.env.MONGODB_URI);
         
     }catch(e){
        console.log(e)
     }
}

module.exports= connectDB;