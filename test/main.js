// 测试vuex功能的代码
import Vue from 'vue';
import Vuex from 'vuex';
import GoodsModule from './modules/goods';
import UserModule from './modules/user';
Vue.use(Vuex);

//配置，新建一个仓库
const store = new Vuex.Store({
  modules:{
    //模块名:模块配置对象 state/mutations/actions/getters/modules
    goods:GoodsModule,
    user:UserModule
  }
});

//如何让state.count发生改变呢 
// store.commit('改变行为名',追加数据(可以是对象));
// store.commit('increment',25);  //提交一个操作.自增 
// console.log(store.state.count);

//以上都不建议直接操作。获取和更改，建议使用套路来完成



//调用action 发生业务行为，触发数据改变  ，增删改
store.dispatch('incrementGoodsNum', 120)
console.log('aaaaa');
//查询数据
console.log(store.getters.getTotalCount);


//调用改名的行为触发 改名的数据改变
// store.dispatch('rename','rose');
console.log(store.getters.getName);