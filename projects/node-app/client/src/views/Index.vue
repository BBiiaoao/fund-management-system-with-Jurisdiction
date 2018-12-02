<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <router-view></router-view>
    </div>
</template>

<script>
    import HeadNav from '../components/HeadNav';
    import LeftMenu from '../components/LeftNav'
    export default {
        name: "index",
        components:{
            HeadNav,
            LeftMenu
        }
    }
</script>

<style scoped>
    .index{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>