import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vant/lib/index.css';
import "../src/assets/font/iconfont.css"

//$cnpm i swiper@3.4.2 -S
import "swiper/dist/css/swiper.min.css"

import { Lazyload,Image as VanImage } from 'vant';
Vue.use(Lazyload,VanImage);

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
