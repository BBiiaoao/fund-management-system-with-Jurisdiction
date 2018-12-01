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
        height: 100%;
    }
    .row-bg{
        width: 100%;
        height: 100%;
    }
    .user{
        padding-top: 200px;
        width: 100%;
        height: 100%;
        text-align: right;
    }
    .avatar{
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }
    .userinfo{
        padding-top: 200px;
        width: 100%;
        height: 100%;
        background-color: #ddd;
    }
    .user-item{
        margin: 10px 0 10px 15px;
        font-size: 25px;
        font-weight: 600;
    }
</style>