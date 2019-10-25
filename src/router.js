import Vue from 'vue';
import Router from 'vue-router';

import Index from './page/Index'
import Zodiac from './page/Zodiac'

Vue.use(Router)
const vueRouter=new Router({
    routes:[
        {
            path:'/',
            name:'Index',
            component: Index
        },
        {
            path:'/zodiac',
            name:'Zodiac',
            component: Zodiac
        },

    ]
});

export default vueRouter
