const req = require("express/lib/request");
const user = require("../model/user");

exports.logout = (req, res) => {
    req.session.isLoggedIn = false;
    req.session.username = null;

    res.redirect("/");
};

exports.postSignUp = async (req, res) => {

    const e = req.body.email;
    const chk =await user.find({ email: e });

    if (chk.length>0) {
        console.log(chk);
        res.send("User exist");
    }
    else {
        const u = await user.create({
            name: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            admin: true,
            username: req.body.email.split(['@'])[0],
            problems: [{}]
        }).then(console.log("user is created"));

        req.session.isLoggedIn = true;
        req.session.username = req.body.email.split(['@'])[0];
        res.redirect("/");
    }
};

exports.postLogin = async (req, res) => {

    let User = await user.findOne({ email: req.body.email, password: req.body.password });

    if (User) {
        req.session.isLoggedIn = true;
        req.session.username = User.username;
        res.redirect("/");
    }
    else {
        res.send("wrong input");
    }
};