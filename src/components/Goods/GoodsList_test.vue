<template>
<div style="height:627px;">
            <nav-bar title="商品列表"></nav-bar>

    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" @bottom-status-change="changeStatus" :bottom-all-loaded="allLoaded">
        <ul ref="ul">
            <li v-for="goods in goodsList" :key="goods.id">
                <a>
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title|convertTitle(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </a>
            </li>         
        </ul>
    </mt-loadmore>
</div>
</template>
<script>
export default {
    methods:{
        //检测状态改变
        changeStatus(s){
            console.log(s);
        },
        //触发上拉函数
        loadBottom(){

            console.log('上拉触发了');
            this.allLoaded = true; //一次后，禁止该函数的调用

            //发请求获取数据
            this.$refs.loadmore.onBottomLoaded();
            // console.log(this.$refs.loadmore);
            // console.log(this.$refs.ul);
            // console.log(this);
        }
    },
    data(){
        return {
            goodsList:[],//商品列表
            isAutoFill:false,//是否自动检测，并调用loadBottom
            allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
        }
    },
    created(){
        //获取路由参数
        let page = this.$route.query.page||1;
        //发请求
        this.$axios.get(`getgoods?pageindex=${page}`)
        .then(res=>{
            this.goodsList = res.data.message;
        })
        .catch(err=>console.log(err));
    }
}


</script>
<style scoped>

ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}


li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}
</style>
