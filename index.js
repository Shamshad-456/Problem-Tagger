const express=require("express");
const bodyParser=require("body-parser");
const mongodb=require("mongoose");
const path=require("path");
const session = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const req = require("express/lib/request");
const port =process.env.PORT || 3000;

const addProblemRouter=require("./routers/addproblem");
const authRouter=require("./routers/auth");
const homeRouter=require("./routers/home");
const readRouter=require("./routers/read");
const addtagRouter=require("./routers/addtag");
const tagRouter=require("./routers/tag");
const profileRouter=require("./routers/profile");
const editinfoRouter=require("./routers/edit_info");

const MONGODB_URI = "mongodb+srv://shamshadco19:Z5NYQyPeDbOSmaiV@cluster0.rchl6xv.mongodb.net/"
const store=new MongoDBStore({uri:MONGODB_URI,collection:"sessions"});


const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));




app.get("/",(req,res)=>{
    const isLoggedIn=req.session.isLoggedIn;
    const user=req.session.username;
    
    res.render("home.ejs",{isLoggedIn,user});
});
app.use(addProblemRouter);
app.use(authRouter);
app.use(homeRouter);
app.use(readRouter);
app.use(addtagRouter);
app.use(tagRouter);
app.use(profileRouter);
app.use(editinfoRouter);

app.listen(port,()=>{
    console.log("connected at :",port);
});

mongodb.connect(MONGODB_URI,()=>{
    console.log("Connected to mongoose");
});
