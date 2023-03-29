//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter({
     mode:'history' ,
    routes :[
      {
        path: "/",
        ioc:"",
        name:'index',
        component: () => import("../view/login/login.vue"),
        meta:{
          mainCurrentRoute: '/',
          currentRoute: '/index'
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import("../components/componentsIndex.vue"),
        meta:{
          mainCurrentRoute: '/'
        },
        children:[
          {
            path: "/",
            ioc:"",
            name:'index',
            component: () => import("../components/index.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },
          {
            path: "/menu",
            ioc:"",
            name:'menu',
            component: () => import("../view/menu/index.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/meto",
            ioc:"",
            name:'meto',
            component: () => import("../components/index.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/diction",
            ioc:"",
            name:'diction',
            component: () => import("../components/index.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/timedTask",
            ioc:"",
            name:'timedTask',
            component: () => import("../components/index.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/role",
            ioc:"",
            name:'role',
            component: () => import("../view/role/role.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/user",
            ioc:"",
            name:'user',
            component: () => import("../view/user/user.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },{
            path: "/equipment",
            ioc:"",
            name:'equipment',
            component: () => import("../view/equipment/equipment.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },
          {
            path: "/index",
            ioc:"",
            name:'index',
            component: () => import("../components/aside.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/index'
            },
          },
          {
            path: "/aside",
            ioc:"",
            name:'aside',
            component: () => import("../components/configIndex.vue"),
            meta:{
              mainCurrentRoute: '/',
              currentRoute: '/aside'
            },
          }]
      },
        
      ]
})
//5.导入路由实例
export default router

