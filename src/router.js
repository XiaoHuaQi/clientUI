import Vue from 'vue';
import Router from 'vue-router';

import Index from './page/Index'
import ProductInfo from './page/ProductInfo'
import Home from './page/Home'
import Login from './page/Login'


Vue.use(Router)
const vueRouter=new Router({
    routes:[
        {
            path:'/',
            name:'Index',
            component: Index
        },
        {
            path:'/Login',
            name:'Login',
            component: Login
        },
        {
            path:'/ProductInfo',
            name:'ProductInfo',
            component: ProductInfo
        },
        {
            path:'/Home',
            name:'Home',
            component: Home
        },

    ]
});

export default vueRouter
