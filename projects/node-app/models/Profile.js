const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//Create Schema
//模型骨架
const ProfileSchema=new Schema({
    type:{
        type:String,
    },
    describe:{
        type:String,
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//由schema构造生成model
module.exports=Profile=mongoose.model("profile",ProfileSchema);