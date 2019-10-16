import axios from 'axios'
import router from './router'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use( res => {
    // 对响应数据做点什么
    //Vue.$indicator.close();
    if(res.data.code==301){
        router.replace({ path: '/Login' });
    }
    return res;
}, err => {
    // 对响应错误做点什么
    return Promise.reject(err);
});

const Install = (Vue) => {
    Vue.prototype.$axios = axios
}

if (typeof window !== 'undefined' && window.Vue) {
    Install(window.Vue);
}

export default Install;
