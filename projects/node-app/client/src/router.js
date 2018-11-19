import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Register from './views/Register'
import Login from './views/Login'
import Notfind from './views/404'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name:'index',
            component: Index
        },
        {
            path: '/register',
            name:'register',
            component: Register
        },
        {
            path: '/login',
            name:'login',
            component: Login
        },
        {
            path:'*',
            name:'/404',
            component:Notfind
        }
    ]
})
