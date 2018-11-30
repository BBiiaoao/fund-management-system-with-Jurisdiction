//@login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");//密码加密组件
const gravatar = require('gravatar');//头像组件
const jwt=require('jsonwebtoken');//登陆成功返回token
const passport=require("passport");//验证token
const keys=require("../../config/keys");

const User = require("../../models/User");


//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get("/tes", (rep, res) => {
    res.json({msg: "login works"})
});


//$route Post api/users/register
//@desc 返回的请求的json数据
//@access public
router.post("/register", (req, res) => {
    // console.log(req.body);

    //查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册!")
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});//默认头像

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity:req.body.identity
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                });

            }
        })
});

//$route POST api/users/login
//@desc 返回token jwt password
//@access public

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在!")
            }

            //密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule={
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        };
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{//jwt.sign(规则，密钥，过期时间，箭头函数)
                            if(err)
                                throw(err);
                            return res.json({
                                success:true,
                                token:"Bearer "+token
                            });
                        })
                        // res.json({msg: "success"});
                    }
                    else{
                        return res.status(400).json("密码错误！")
                    }
                })

        })
});

//$route GET api/users/current
//@desc 返回 current user
//@access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
})


module.exports = router;