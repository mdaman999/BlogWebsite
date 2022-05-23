// All Required modules && variables
var express=require("express");
var mongoose=require("mongoose");
var path=require("path");
var myrouter=require("../router/CURD");

//Hosting using express
var port=process.env.PORT || 8000;
var app=express();
app.listen(port,()=>{console.log("Server is running on "+port)});


// MongoDB connection
var atlasURL="mongodb+srv://mdaman999:aman123@cluster0.kvlhg.mongodb.net/PostDB?retryWrites=true&w=majority";
mongoose.connect(atlasURL).then( ()=>{console.log("PostDB connected succesfully!");}).catch( (e)=>{console.log("Data Base not Connected! "+e);});

// Template Engine : Handle bars
app.set("view engine","hbs");

// CSS && JS path
var cssurl=path.join(__dirname,"../../public/css");
app.use(express.static(cssurl));
var imgurl=path.join(__dirname,"../../public/images");
app.use(express.static(imgurl));
var jsurl=path.join(__dirname,"../../public/js");
app.use(express.static(jsurl));


// All Pages(3)
app.get("/home",(req,res)=>{
    res.status(201).render("home");
});

app.get("/CreatePost",(req,res)=>{
    res.status(201).render("CreatePost");
});

app.get("/",(req,res)=>{
    res.status(201).render("home");
});


// Depandancy & file used
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(myrouter);