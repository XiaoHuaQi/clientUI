import Vue from 'vue';
import Router from 'vue-router';

import Index from './page/Index'
import Zodiac from './page/Zodiac'
import Company from './page/Company'
import News from './page/News'
import NewsInfo from './page/NewsInfo'
import Product from './page/Product'
import ProductInfo from './page/ProductInfo'
import About from './page/About'
import Video from './page/Video'
import VideoInfo from './page/VideoInfo'

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
            name:'Index',
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
            path:'/newsInfo',
            name:'NewsInfo',
            component: NewsInfo
        },
        {
            path:'/product',
            name:'Product',
            component: Product
        },
        {
            path:'/productInfo',
            name:'ProductInfo',
            component: ProductInfo
        },
        {
            path:'/video',
            name:'Video',
            component: Video
        },
        {
            path:'/videoInfo',
            name:'VideoInfo',
            component: VideoInfo
        },
        {
            path:'/about',
            name:'About',
            component: About
        },
    ]
});

export default vueRouter
