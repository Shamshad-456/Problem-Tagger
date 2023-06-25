const req = require("express/lib/request");
const Question = require("../model/question");
const User = require("../model/user");
const Tag = require("../model/tag");
const tag = require("../model/tag");

exports.getTaginfo = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const user = req.session.username;


    let tag = await Tag.find({});

    if (tag.length == 0) {
        res.redirect("/");
    }
    else {
        tag = tag[0].tag;
        let user_tag = null;
        if (isLoggedIn) {
            user_tag = await User.find({ username: user });
            user_tag = user_tag[0].tags;
        }
        var flag =false;
        if(user_tag!=null)
        {
            if(user_tag.length>0)
                flag=true;
        }
        res.render("tag.ejs", { isLoggedIn,flag, user, tag, user_tag });
    }
};

exports.selectedTag = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const user = req.session.username;

    let tagName = req.body.checkbox;
    
    if(tagName==undefined)
    {
        
    }

    if (typeof (tagName) == 'string') {
        tagName = Array(tagName);
    
        const question = await Question.find(
            {
                $or:
                    [
                        { "tags": { $all: tagName } },
                        { "user_tag.tags": { $all: tagName } }
                    ]

            }
        );
        res.render("tagged_problem.ejs", { isLoggedIn, user, question });    
    }
    else
    {
        res.redirect('/home');
    }


    
};