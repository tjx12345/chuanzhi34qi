<template>
    <div>
        <my-swipe url="getlunbo"></my-swipe>
        <!-- 下有九宫格 -->
        <my-ul>
             <my-li v-for="(r,index) in homeRouters" :key="index">
                <router-link :to="r.router">
                   <div :class="'back-img ' + r.className">
                       {{r.title}}
                   </div>
                </router-link>
            </my-li>
        </my-ul>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                homeRouters:[{
                    className:'news',
                    title:'新闻列表',
                    router:{name:'news.list'}
                },{
                    className:'pic',
                    title:'图文分享',
                    router:{name:'photo.list',params:{categoryId:0}}
                },{
                    className:'goods',
                    title:'商品列表',
                    router:{name:'goods.list',query:{page:1} }
                },{
                    className:'feedback',
                    title:'留言反馈',
                    router:{name:'news.list'}
                },{
                    className:'search',
                    title:'搜索资讯',
                    router:{name:'news.list'}
                },{
                    className:'callme',
                    title:'联系我们',
                    router:{name:'news.list'}
                }]
            }
        }
    }
</script>
<style scoped>

/*九宫格样式*/
.back-img{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
}

li a{
    color:black;
}
/*图片*/
.news {
    background-image: url(../../static/img/news.png);
}
.pic {
    background-image: url(../../static/img/picShare.png);
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}
</style>