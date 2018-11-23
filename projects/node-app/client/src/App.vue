<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import jwt_decode from 'jwt-decode';
    export default {
        name: "app",
        components: {},
        created(){
            if(localStorage.eleToken){
                const decoded=jwt_decode(localStorage.eleToken);
                //将token存储到vuex中
                this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
                this.$store.dispatch("setUser",decoded);
            }
        },
        methods:{
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

<style>
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
    }
    body{
        margin: 0;
    }
</style>
