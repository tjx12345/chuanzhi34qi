// 引入资源
import Vue from 'vue';




// 注册全局过滤器 开始
import Moment from 'moment';
Vue.filter('convertTime',(value)=>{   //{'abc'| convert   }
    //2015-04-16T03:50:28.000Z
    return Moment(value).format('YYYY-MM-DD');
});
//处理title太长的问题
Vue.filter('convertTitle',(value,limit)=>{
    //预防网络太慢，在按照默认值渲染以后产生的问题
    if(!value)return;
    //判断
    if(value.length > limit){
       return value.substr(0,limit) + '...'
    }
    //返回原数据
    return value;
})
// 注册全局过滤器 结束



// 注册全局组件 开始
import MyLi from './components/Commons/MyLi.vue';
import MyUl from './components/Commons/MyUl.vue';
import NavBar from './components/Commons/NavBar.vue';
import Comment from './components/Commons/Comment.vue';
import MySwipe from './components/Commons/MySwipe.vue';
Vue.component(MySwipe.name,MySwipe);
Vue.component(Comment.name,Comment);
Vue.component(NavBar.name,NavBar);
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
// 注册全局组件 结束

import App from './components/App.vue';
// 路由相关组件 开始

const Home = r => require(['./components/Home/Home.vue'],r);
const Member = r => require(['./components/Member/Member.vue'],r);
const Shopcart = r => require(['./components/Shopcart/Shopcart.vue'],r);
const Search = r => require(['./components/Search/Search.vue'],r);
const NewsList = r => require(['./components/News/NewsList.vue'],r);
const NewsDetail = r => require(['./components/News/NewsDetail.vue'],r);
const PhotoList = r => require(['./components/Photo/PhotoList.vue'],r);
const PhotoDetail = r => require(['./components/Photo/PhotoDetail.vue'],r);
const GoodsList = r => require(['./components/Goods/GoodsList.vue'],r);
const GoodsListTest = r => require(['./components/Goods/GoodsList_test.vue'],r);
// const Comment = r => require(['./components/Commons/Comment.vue'],r);
const GoodsDetail = r => require(['./components/Goods/GoodsDetail.vue'],r);
const GoodsComment = r => require(['./components/Goods/GoodsComment.vue'],r);


// 路由相关组件 结束

//VuePreview 开始
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
//VuePreview 结束

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
    {name:'news.list',path:'/news/list',component:NewsList},//新闻列表
    {name:'news.detail',path:'/news/detail',component:NewsDetail},//新闻详情
    //如果写成 components 会爆错$createElement is undefined
    {name:'photo.list',path:'/photo/list/:categoryId',component:PhotoList},//图文分享
    {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail},  //图文详情
    { name:'test',path:'/test',component:GoodsListTest},//测试路由
    { name:'goods.list',path:'/goods/list',component:GoodsList},//商品列表
    {name:'goods.detail',path:'/goods/detail/:goodsId',component:GoodsDetail},
    {name:'goods.detail.show',path:'/goods/show/info',component:NewsDetail},//商品图文介绍
    {name:'goods.comment',path:'/goods/comment',component:GoodsComment} //商品评论
]);
// VueRouter 结束

// MintUi 开始
// import MintUi from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(MintUi);
import Indicator from './importMintUi.js';//加载多个组件，返回一个组件对象
// MintUi 结束

// 考虑未来可能有样式的覆盖，在之后再引入自己的css
import './static/css/global.css';



// Axios 开始
import Axios from 'axios';
Vue.prototype.$axios = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
// Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
//拦截器中实现loadding图标
Axios.interceptors.request.use(config=>{
    Indicator.open({
        text:'玩命加载中..',
        spinnerType:'triple-bounce'
    })
    return config;
})
Axios.interceptors.response.use( response =>{
    Indicator.close();
    return response;
});

// Axios 结束


// 加入Vuex 开始
import Vuex from 'vuex';
import GoodsTools from './components/Commons/GoodsTools';
//安装插件
Vue.use(Vuex);
//创建仓库
let store = new Vuex.Store({
    state:{
        //初始值
        num:GoodsTools.getTotalCount()
    },
    getters:{ //获取
        getNum(state){ //获取小球数量
            return state.num;
        }
    },
    actions:{ //业务
        addShopcart(store,num){
            store.commit('addNum',num);
        },
        changeGoodsNum(store,totalNum){
            //改变state
            store.commit('change',totalNum);
        }
    },
    mutations:{//改变数据
        addNum(state,num){
            state.num += num;
        },
        change(state,num){
            state.num = num;
        }
    }
});
//最终加入到new Vue中
// 加入Vuex 结束


//1:dist
console.log('更改了代码');
console.log('版本号以后改变代码');
console.log('使用数字签名hash以后，更改main.js,看图片请求');

console.log('就更改了一行js代码');



new Vue({
    el:'#app',
    render:c=>c(App),
    router,
    store
});