<template>
    <div class="tac-container">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#303030"
                        text-color="#fff"
                        active-text-color="#F26B3A">
                 <router-link to="/home" class="item">
                     <el-menu-item index="0">
                         <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-home"></use>
                         </svg>
                         <span slot="title">首页</span>
                     </el-menu-item>
                        <template v-for="item in items">
                            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                                <template slot="title">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                    <span slot="title">{{item.name}}</span>
                                </template>
                                <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                                    <el-menu-item :index="citem.path">
                                        <span slot="title">{{citem.name}}</span>
                                    </el-menu-item>
                                </router-link>
                            </el-submenu>
                        </template>
                 </router-link>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "LeftNav",
        data(){
            return{
                items:[
                    {
                        icon:'#icon-tubiao-qiapian',
                        name:'资金管理',
                        path:'fund',
                        children:[
                            {
                                path:'fundlist', name:'资金流水'
                            }
                        ]
                    },
                    {
                        icon:'#icon-tiaoshi',
                        name:'信息管理',
                        path:'info',
                        children:[
                            {
                                path:'infoshow', name:'个人信息'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
 .tac-container{
     position: absolute;
     top: 70px;
     z-index: 5;
 }
 .tac span{
     font-size: 16px;
 }
 .tac a{
     text-decoration: none;
 }
 .icon{
     font-size: 20px;
     margin-right: 5px;
 }
 .el-menu-vertical-demo{
     border-right: #F26B3A 2px solid;
     width: 250px;
     height: 500px;
 }
</style>