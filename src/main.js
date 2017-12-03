// 引入资源
import Vue from 'vue';

// 注册全局组件 开始
import MyLi from './components/Commons/MyLi.vue';
import MyUl from './components/Commons/MyUl.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
// 注册全局组件 结束


// 路由相关组件 开始
import App from './components/App.vue';
import Home from './components/Home/Home.vue'
import Member from './components/Member/Member.vue'
import Shopcart from './components/Shopcart/Shopcart.vue'
import Search from './components/Search/Search.vue'


// 路由相关组件 结束

// VueRouter 开始
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter();
router.addRoutes([
    // 重定向 到首页
    { path:'/',redirect:{
        name:'home'
    }},
    {name:'home',path:'/home',component:Home},//首页
    {name:'member',path:'/member',component:Member},//会员
    {name:'shopcart',path:'/shopcart',component:Shopcart},//购物车
    {name:'search',path:'/search',component:Search},//查找
]);
// VueRouter 结束

// MintUi 开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
// MintUi 结束






// 考虑未来可能有样式的覆盖，在之后再引入自己的css
import './static/css/global.css';



// Axios 开始
import Axios from 'axios';
Vue.prototype.$axios = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// Axios 结束


new Vue({
    el:'#app',
    render:c=>c(App),
    router
});