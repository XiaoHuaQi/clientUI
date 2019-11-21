import Vue from 'vue'
import App from './App.vue'

import './assets/less/reset.less'
import './assets/less/mmp.less'

// 自适应解决方案
import flexible from './assets/js/flexible'
Vue.use(flexible);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//复制到剪贴板
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer);

import router from './router';

import request from './request'
Vue.use(request)

/*import axios from 'axios';
Vue.prototype.$axios=axios;*/

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
