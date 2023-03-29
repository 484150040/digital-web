import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
 const state={ //要设置的全局访问的state对象,赋予初始属性值
     user: JSON.parse(window.sessionStorage.getItem("user")),
     changeTokenCount:0,
     token:window.sessionStorage.getItem("token")
   }; 
const getters = {   //实时监听state值的变化(最新状态)
    getUser(state) {  //定义函数，返回处理过的val，命名最好有代表性
       return state.user
    },
    getToken(state) {  //定义函数，返回处理过的val，命名最好有代表性
      return state.token
   }
};
const mutations = {
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    clearCatch(state) { 
        state.token = "";
        state.changeTokenCount= 0;
    },
    setToken(state,token){ 
      state.token = token;
      state.changeTokenCount++;
   },
    setUser(state,user){ 
       state.user = user;
    }
};
const actions = {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    setUserAction(context,user){
     	context.commit('setUser',user);
    }
};
const store = new Vuex.Store({
       state, // 挂载存取数据功能
       getters, //挂载数据计算功能
       mutations, // 挂载函数功能
       actions, // 挂载异步函数
});
export default store;
