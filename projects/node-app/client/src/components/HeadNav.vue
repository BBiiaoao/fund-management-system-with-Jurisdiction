<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="12" class="logo-container">
                <img src="../assets/imgs/logo.png" alt="" class="logo">
                <p class="title">后台资金管理系统</p>
            </el-col>
            <el-col :span="12" class="user-container">
                <div class="userinfo">
                    <div class="img-container">
                        <img src="user.avatar" class="avatar" alt="">
                    </div>
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <!--下拉箭头-->
                        <el-dropdown @command="setDialogInfo">
                            <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name: "HeadNav",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        methods: {
            setDialogInfo(cmdItem) {
                // console.log(cmdItem);
                switch (cmdItem){
                    case "info":
                        this.showInfoList();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            showInfoList(){
                //跳转
                this.$router.push('/infoshow');
            },
            logout(){
                //清除token
                localStorage.removeItem('eleToken');
                //设置vuex store
                this.$store.dispatch("clearCurrentState");
                //跳转
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
    .head-nav {
        width: 100%;
        height: 60px;
        min-width: 600px;
        background: #1f6fb5;
        color: #fff;
        border-bottom: #1f6fb5 1px solid;
    }

    .logo-container {
        height: 50px;
        padding: 10px 0 0 15px;
    }

    .logo {
        width: 40px;
        height: 40px;
    }

    .title {
        position: absolute;
        display: inline-block;
        height: 40px;
        margin: 0 0 0 10px;
        line-height: 40px;
        font-size: 20px;
    }

    .userinfo {
        float: right;
        width: 130px;
    }
    .img-container{
        display: inline-block;
        width: 30px;
        height: 30px;
        padding-top: 15px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        padding-top: 15px;
    }

    .welcome {
        position: absolute;
        display: inline-block;
        top: 15px;
        width: 80px;
        height: 40px;
    }

    .name {
        margin: 0;
        line-height: 15px;
        text-align: center;
    }

    .comename {
        margin-bottom: 5px;
    }

    .avatarname {
        color: #f8f2dc;
    }

    .username {
        float: right;
        padding: 30px 5px 0 0;
    }

    .el-dropdown {
        color: #fff;
    }
</style>