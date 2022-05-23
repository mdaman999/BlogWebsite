var mongoose=require("mongoose");
var myschema=new mongoose.Schema({
    title:String,
    discription:String,
    time:String,
    order:Number
});

var mycol=mongoose.model("col",myschema);

module.exports=mycol;