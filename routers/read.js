const express =require("express");
const req = require("express/lib/request");
const Question=require("../model/question");
const router=express.Router();

router.get("/read:id",async(req,res)=>{
    const id=req.params.id.slice(1,100);
    const user=req.session.username;
    const isLoggedIn=req.session.isLoggedIn;
    
    const question=await Question.findById({_id:id});
    
    let user_tag=question.tags;
    if(question.user_tag.length>0)
    {
        const user_question=await Question.find({ _id:id, 'user_tag.username':user});
        let data=null;
        if(user_question.length>0)
        {
            data=user_question[0].user_tag;
        }
        
        for(let i in data)
        {
            if(data[i].username==user)
            {
                user_tag=data[i].tags;
                break;
            }
        }    
    }
    
    res.render("read.ejs",{isLoggedIn,user,question,user_tag});
});

module.exports=router;