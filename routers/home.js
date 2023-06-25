const express =require("express");
const req = require("express/lib/request");
const Question=require("../model/question");
const router=express.Router();

router.get("/home",async(req,res)=>{

    const user=req.session.username;
    const isLoggedIn=req.session.isLoggedIn;
    
    console.log("here");
    const question=await Question.find({author:{$ne:user}});

    const user_question=await Question.find({author:user});
    
    var flag=false;
    if(user_question.length>0)
        flag=true;
    console.log(flag);
    res.render("all_question.ejs",{isLoggedIn,flag,user,question,user_question});

});

module.exports=router;