const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//Create Schema
//模型骨架
const UserSchema=new Schema({
    name:{
        type:String,
        //required表示是否必填
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//由schema构造生成model
module.exports=User=mongoose.model("users",UserSchema)