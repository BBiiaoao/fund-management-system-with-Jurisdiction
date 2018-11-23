<template>
    <div class="home">
        <div class="container">
            <h1 class="title">资金管理系统</h1>
            <p class="lead">让你的资金更加安全！</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .home{
        position:absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../assets/imgs/homeBc.jpg") no-repeat center center;
        background-size:cover;
    }
    .home::before{
        position: absolute;
        left: 0;
        top:0;
        display: block;
        content: '';
        width:100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 2;
    }
    .container{
        position: relative;
        text-align: center;
        color: #fff;
        z-index: 3;
    }
</style>