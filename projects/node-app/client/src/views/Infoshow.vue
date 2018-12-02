<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img :src="user.avatar" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_zhanghao"></use>
                        </svg>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bianji"></use>
                        </svg>
                        <span>{{user.identity == "manager" ? "管理员" : "普通员工"}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Infoshow",
        computed:{
            user(){
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>
    .infoshow{
        margin:200px auto 0;
        width: 380px;
        height: 240px;
        border-radius: 15px;
        box-shadow:-2px 2px 0px 0px #202020, -10px 10px 40px 0px rgba(0, 0, 0, 0.3);
        border: 2px solid #F26B3A;
        color:#ddd;
        background-color:#303030 ;
        transform: translate(0px, 0px) rotateX(15deg) rotateZ(-5deg);
        animation:upFloat 2s ease-in-out infinite alternate;
        transition: all 1s;
    }
    @keyframes upFloat{
        from{transform: translate(0px, 0px) rotateX(15deg) rotateZ(-5deg)}
        to{
            transform: translate(0px, -20px) rotateX(0deg) rotateZ(-5deg);
            box-shadow: -2px 1px 0px 0px #202020, -40px 40px 40px 0 rgba(0, 0, 0, 0.2);
        }
    }
    .infoshow:hover{
        animation-play-state: paused;
    }
    .row-bg{
        width: 100%;
        height: 100%;
    }
    .user{
        width: 100%;
        height: 100%;
        text-align: right;
    }
    .avatar{
        width: 120px;
        height: 120px;
        margin: 60px 0 0 10px;
        border-radius: 50%;
        overflow: hidden;
    }
    .userinfo{
        width: 100%;
        height: 100%;
        padding-top: 70px;
        margin-left: 20px;
    }
    .user-item{
        margin-top: 10px;
        font-size: 25px;
        font-weight: 600;
    }
    .icon{
        margin-right: 10px;
    }
</style>