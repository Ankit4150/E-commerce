const express=require("express");

const router=express.Router();

  const userSignUpController=require("../controller/user/userSingUp");
  const userSignInController=require("../controller/user/userSignIn")
  const userDetailsController=require("../controller/user/userDetails")
  const authToken=require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers=require("../controller/user/allUsers")
const UpdateUser =require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController=require("../controller/product/updateProduct")
const getCategoryProduct=require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct=require("../controller/product/getCategoryWiseProduct")
const getProductDetails=require("../controller/product/getProductDetails")
const  addToCartController=require("../controller/user/addToCartController")
const countAddToProduct=require("../controller/user/countAddToCartProduct")
const addToCartViewProduct =require("../controller/user/addToCartViewProduct")
const updateAddToCartToProduct=require("../controller/user/updateAddToCartProduct")
const deleteAddTopCartProduct=require("../controller/user/deleteAddToCartProduct");
const searchProduct=require("../controller/product/searchProduct");
const filterProductController=require("../controller/product/filterProduct")
const uesrEmail =require("../controller/user/email");
const changePassword =require("../controller/user/changePassword");
 const paymentController=require("../controller/order/paymentController")

 
    router.post("/signup",userSignUpController);
    router.post("/signin",userSignInController);
    router.get("/user-details",authToken,userDetailsController)
    router.get("/userLogout",userLogout);
      router.get("/all-user",authToken,allUsers);
      router.post("/update-user",authToken,UpdateUser)
      router.post("/upload-product",authToken,UploadProductController)
     router.get("/get-product",getProductController);
     router.post("/update-product",authToken,updateProductController);
     router.get("/get-categoryProduct",getCategoryProduct)
     router.post("/category-product",getCategoryWiseProduct);
     router.post("/product-details",getProductDetails)
     router.post("/addtocart",authToken, addToCartController)
     router.get("/countAddToCartProduct",authToken,countAddToProduct)
     router.get("/view-cart-product",authToken,addToCartViewProduct)
     router.post("/update-cart-product",authToken,updateAddToCartToProduct);
     router.post("/delete-cart-product",authToken,deleteAddTopCartProduct)
     router.get("/searchProduct",searchProduct);
     router.post("/filter-product",filterProductController);
      router.post('/email-send', uesrEmail );
      router.post("/change-password",changePassword);
      router.post("/checkout",authToken,paymentController);


module.exports=router;