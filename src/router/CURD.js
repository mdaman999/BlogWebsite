// All requirments
var express = require("express");
const path = require("path");
var mycol = require("../db/schema");
var router = new express.Router();

// Time function
function currtime() {
    var today = new Date();
    var hr=today.getHours();
    var min=today.getMinutes();
    var time="";
    if(min<10 && hr<10) time="0"+hr+":"+"0"+min;
    else if(min<10 && hr>=10) time=hr+":"+"0"+min;
    else if(min>=10 && hr<10) time="0"+hr+":"+min;
    else if(min>=10 && hr>=10) time=hr+":"+min;

    return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getUTCFullYear() + ", " + time;
}

// Insert Function
var i=0;
function insert(req,res){
    var p1 = new mycol({
        title: req.body.title,
        discription: req.body.discription,
        time: currtime(),
        order:i--
    });
    createp1 = p1.save();
    res.redirect("AllPost");
}

// Update function
function update(req,res){
    mycol.findOneAndUpdate({_id:req.body},req.body,{new:true},(err,doc)=>{
        if(!err) res.redirect("AllPost");
        else   console.log('Error during record update : ' + err);
    });
}


// 1.Crete && Update post
router.post("/AllPost",(req, res) => {
        if(req.body._id=="")  insert(req,res);
        else  update(req,res);
});

// 2. Read data from mongoDB
router.get("/AllPost", (req, res) => {
    mycol.find((err, doc) => {
        if(!err)  res.render("AllPost", { list: doc }); 
        else  console.log('Error in retrieving/get data from MongoDB :' + err); 
    });
});


// 3. Update data in mongoDB
router.get("/:id",(req, res) => {
    mycol.findById(req.params.id, (err, doc) => {
        if(!err) res.render("UpdatePost", { olddata: doc });
    });
});


// 4. Delete Data frpm mongoDB
router.get('/delete/:id',(req,res)=>{
    mycol.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) res.redirect("/AllPost");
        else console.log("Error in deleting :"+err);
    });
})

module.exports = router;