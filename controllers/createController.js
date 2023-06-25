const req = require("express/lib/request");
const User = require("../model/user");
const Question=require("../model/question");
const Tag=require("../model/tag");



exports.getInputForm=(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;

    res.render("problem_create.ejs",{isLoggedIn,user});
};

exports.createQuestion=async(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    const tagName=req.body.tags.split(" ");
    const q=await Question.create({
        title:req.body.title,
        tags:tagName,
        problem:req.body.problem,
        author:user
    })
    .then(console.log("question created"));
    User.findOneAndUpdate({username:user},
    {
        $addToSet:{
            problems:q._id,
            tags:{$each :tagName},
        }
    })
    const u=await User.find({username:user});
    
    let tags=await Tag.find({});
    if(tags.length>0)
    {
        await Tag.findOneAndUpdate({},
        { 
            $addToSet:{
                tag:{$each:tagName},
            }
        });
    }
    else
    {
        await Tag.create({
            tag:[...tagName],
        });
    }
    res.redirect("/home");
};