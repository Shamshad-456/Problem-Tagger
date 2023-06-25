const express = require("express");
const req = require("express/lib/request");
const router=express.Router();
const User = require("../model/user");
const Question=require("../model/question");


router.get("/profile",async (req,res)=>{
    
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    const user_data=await User.findOne({username:user});

    const problem=user_data.problems;

    const user_question=await Question.find(
        {
            $or:
            [
                {"author":user},
                {"user_tag.username":user}
            ]
        
        }
    );
    const user_tag=user_data.tags;
    
    var flag1=false;
    var flag2=false;

    if(user_tag.length>0)
        flag1=true;
    if(user_question.length>0)
        flag2=true;

    res.render("profile.ejs",{isLoggedIn,flag1,flag2,user,user_data,user_question,user_tag});
});


module.exports=router;