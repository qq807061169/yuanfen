// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './common/css/reset.css'
import store from "./store/index.js"
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './request/api.js'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.prototype.$api = api


router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
		console.log(sessionStorage.getItem('is_set'))
    if (sessionStorage.getItem('is_set') == 1) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/info', // 未登录则跳转至login页面
        });
    }
  } else {
    next();
  }
});





/* eslint-disable no-new */
new Vue({
  el: '#app',
    store,
		router,
  components: { App },
  template: '<App/>'
})




