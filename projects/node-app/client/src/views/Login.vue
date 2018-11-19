<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="submit-btn-container">
                        <el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                    <el-form-item class="tiparea-container">
                        <div class="tiparea">
                            <p>还没有账号?现在<router-link to="/register">注册</router-link></p>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "login",
        components: {},
        data(){
            return{
                loginUser:{
                    email:'',
                    password:''
                },
                rules:{
                    email:[
                        {
                            type:'email',required:true,message:'邮箱格式不正确',trigger:'blur'
                        }
                    ],
                    password:[
                        {
                            required:true,message:"密码不能为空",trigger:'blur'
                        },
                        {
                            min:6,max:30,message:'长度在6到30之间',trigger:'blur'
                        }
                        ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.loginUser);
                        this.$axios.post("/api/users/login",this.loginUser)
                            .then(res=>{
                                // console.log(res);
                                //token
                                //解构赋值
                                const {token}=res.data;
                                //存储到localstorage中
                                localStorage.setItem("eleToken",token);
                                this.$router.push("/index");
                            });
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .login {
        position:relative;
        width: 100%;
        height: 100%;
        background:url("../assets/imgs/bc.jpg") no-repeat center center;
        background-size:cover;
        text-align: center;
    }
    .loginForm{
        position:absolute;
        width: 370px;
        top: 15%;
        left: 50%;
        margin-left: -185px;
        padding: 25px 20px 0 10px;
        background-color: #eee;
        border-radius: 5px;
        text-align: center;
    }
    .manage_tip{
        padding-top: 50px;
    }
    .manage_tip .title{
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color:#fff;
    }
    .submit-btn{
        margin-left: -40px;
        width: 80%;
    }
    .tiparea-container{
        margin: -15px 0 5px -30px;
        height: 40px;
    }
    .tiparea p{
        margin: 0;
        line-height: 40px;
    }
    .tiparea p a{
        padding-left: 2px;
        color: #66b1ff;
        text-decoration: none;
    }
</style>