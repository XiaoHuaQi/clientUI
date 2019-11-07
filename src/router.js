import Vue from 'vue';
import Router from 'vue-router';

import Index from './page/Index'
import Zodiac from './page/Zodiac'
import Company from './page/Company'
import News from './page/News'
import Product from './page/Product'
import About from './page/About'

Vue.use(Router)
const vueRouter=new Router({
    routes:[
        {
            path:'/',
            name:'Index',
            component: Index
        },
        {
            path:'/Index',
            name:'IndexHome',
            component: Index
        },
        {
            path:'/zodiac',
            name:'Zodiac',
            component: Zodiac
        },
        {
            path:'/company',
            name:'Company',
            component: Company
        },
        {
            path:'/news',
            name:'News',
            component: News
        },
        {
            path:'/product',
            name:'Product',
            component: Product
        },
        {
            path:'/about',
            name:'About',
            component: About
        },
    ]
});

export default vueRouter
