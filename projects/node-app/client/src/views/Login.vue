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
    import jwt_decode from 'jwt-decode';
    export default {
        name: "login",
        components: {},
        data(){
            return{
                loginUser:{
                    email:'test@test.com',
                    password:'123456'
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
                //validate为表单提供了强大的验证功能
                //在html元素中，添加ref属性，通过this.$refs属性来获取
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login",this.loginUser)
                            .then(res=>{
                                // console.log(res);
                                //token
                                //解构赋值
                                const {token}=res.data;

                                //存储到localstorage中
                                localStorage.setItem("eleToken",token);

                                //解析token
                                const decoded=jwt_decode(token);

                                //token存储到vuex中
                                //dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
                                //commit：同步操作，写法：this.$store.commit('mutations方法名',值)
                                this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
                                this.$store.dispatch("setUser",decoded);

                                this.$router.push("/index");
                            });
                    }
                });
            },
            isEmpty(value){
                return(
                    value === undefined ||
                    value === null ||
                    (typeof value === 'object' && Object.keys(value).length === 0) ||//Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
                    (typeof value === 'string' && value.trim().length === 0)//trim()函数用于去除字符串两端的空白字符
                )
            }
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