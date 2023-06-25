const express = require("express");
const authController  = require("../controllers/authController");
const req = require("express/lib/request");
const router=express.Router();
const User = require("../model/user");

router.get("/edit_info",async (req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    const user_data=await User.findOne({username:user});
    
    res.render("edit_info.ejs",{isLoggedIn,user,user_data});
});

router.post("/edit_info",async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    console.log(req.body);
    await User.findOneAndUpdate({username:user},
    {
        name:req.body.name,
        img:req.body.img,
        password:req.body.password,
    }).then(()=>{
        console.log("Information edited");
    });
    res.redirect("/profile");

});

module.exports=router;