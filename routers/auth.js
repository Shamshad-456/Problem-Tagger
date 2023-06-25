const express = require("express");
const authController  = require("../controllers/authController");
const req = require("express/lib/request");
const router=express.Router();

router.get("/login",(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    res.render("login.ejs",{isLoggedIn,user});
});

router.get("/signup",(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    res.render("signup.ejs",{isLoggedIn,user});
});
router.post("/login",authController.postLogin);

router.post("/signup",authController.postSignUp);

router.get("/logout",authController.logout);



module.exports=router;