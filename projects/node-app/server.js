const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');//使用body-parser获取前端传送过来的数据
const passport=require('passport');//
const app=express();

//引入users.js
const users=require("./routes/api/users");

//DB config
const db=require("./config/keys").mongoURI;

//使用body-parser中间件
//使node支持两种请求体
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Connect to mongodb
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log("connected"))
    .catch(err=>console.log(err));

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users",users);


const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Serve running on port ${port}`);
})