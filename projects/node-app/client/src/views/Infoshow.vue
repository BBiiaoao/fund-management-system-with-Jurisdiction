<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img src="../assets/imgs/money.png" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">
                        <span>BBiiaoao</span>
                    </div>
                    <div class="user-item">
                        <span>管理员</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Infoshow"
    }
</script>

<style scoped>
    .infoshow{
        height: 100%;
    }
    .row-bg{
        height: 100%;
    }
    .user{
        padding-top: 200px;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: gray;
    }
    .avatar{
        width: 100px;
        height: 100px;
    }
    .userinfo{
        padding-top: 200px;
        width: 100%;
        height: 100%;
        background-color: #999;
    }

</style>