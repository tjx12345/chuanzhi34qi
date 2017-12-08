<template>
<div :style="'height:' + height">
            <nav-bar title="商品列表"></nav-bar>

    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
        <ul ref="ul">
            <li v-for="goods in goodsList" :key="goods.id">
            <!-- 1:去哪里 -->
                <router-link :to="{name:'goods.detail',params:{goodsId:goods.id} }">
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
                </router-link>
            </li>         
        </ul>
    </mt-loadmore>
</div>
</template>
<script>
export default {
    props:['appRefs'],//接受app里的头和底部
    methods:{
        //触发上拉函数
        loadBottom(){
            this.$axios.get(`getgoods?pageindex=${this.page}`)
            .then(res=>{
                //判断是否还有数据
                if(res.data.message.length == 0){
                    this.$toast({
                      message: '提示:没有更多数据了',
                      duration: 2000
                    });
                    //禁止下拉刷新函数调用
                    this.allLoaded = true;
                    // return;  有了他，少了一次通知回到初始状态的过程，少了过程loadding的区域一直存在，把元素向上顶了
                }
                //追加下一页的数据
                this.goodsList = this.goodsList.concat(res.data.message);
                this.page ++; 
                //从loading状态通知回到pull初始状态
                this.$refs.loadmore.onBottomLoaded();
            })
            .catch(err=>console.log(err));

            //this.page -> 5
            //获取第五页的数据追加，并自增 -> 6

            // this.allLoaded = true; //一次后，禁止该函数的调用

            //发请求获取数据
            // this.$refs.loadmore.onBottomLoaded();
            // console.log(this.$refs.loadmore);
            // console.log(this.$refs.ul);
            // console.log(this);
        },
        changeHeight(){//改变父盒子高度
            this.height = document.documentElement.clientHeight -
            this.appRefs.header.$el.offsetHeight;
        }
    },
    data(){
        return {
            goodsList:[],//商品列表
            isAutoFill:false,//是否自动检测，并调用loadBottom
            allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
            page:1, //页码
            height:'',//根节点div高度
        }
    },
    //操作DOM
    mounted(){
        this.changeHeight();
    },
    created(){
        //获取路由参数
        this.page = this.$route.query.page||1;
        //发请求
        this.$axios.get(`getgoods?pageindex=${this.page}`)
        .then(res=>{
            this.goodsList = res.data.message;
            this.page ++; 
        })
        .catch(err=>console.log(err));
    }
}


</script>
<style scoped>

.title{
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.mint-loadmore{
    margin-bottom: 59px;
}
ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    height: 300px;
    box-sizing: border-box;
}


li > a {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a img {
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
