const express = require("express");
const { is } = require("express/lib/request");
const req = require("express/lib/request");
const Question = require("../model/question");
const User = require("../model/user");
const router = express.Router();


router.post("/addtag:id",async (req, res) => {

    const isLoggedIn = req.session.isLoggedIn;
    const user = req.session.username;
    const id = req.params.id.slice(1, 100);
    const tagName=req.body.tag.split(" ");
    
    const problem_tag = await Question.findById({ _id: id });
    const question = await Question.findById({ _id: id });

    if (question.user_tag.length > 0) {
        const user_tagger = await Question.find({ _id:id, 'user_tag.username': user });

            const question=await Question.findOneAndUpdate(
                { _id: id, "user_tag.username":  user  },
                {
                    $addToSet: {
                        "user_tag.$.tags": {$each:tagName},
                    },
                }
            );
            if(question===null)
            {
                await Question.findByIdAndUpdate({ '_id': id },
                {
                    $push: {
                        user_tag: {
                            username: user,
                            tags: [...tagName,...problem_tag.tags],
                        },
                    },
                });
            }
    }
    else {
        await Question.findByIdAndUpdate({ '_id': id },
        {
            $push: {
                user_tag: {
                    username: user,
                    tags: [...tagName,...problem_tag.tags],
                },
            },
        });
    }


    await User.findOneAndUpdate({username:user},
    {
        
        $addToSet:{
            tags:{$each:tagName},   
            problems:id,
        }
        
    });

    const path="/read:"+id;
    res.redirect(path);
});

module.exports=router;