import Vue from 'vue'
import store from './utils/store'
import App from './App.vue'
import {post,get,put,setPost} from './config/network'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$put=put;
Vue.prototype.$post=setPost;
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//6.引入导出的路由
import router from './router/index'
import Router from 'vue-router'
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(store);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
