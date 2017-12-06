<template>
    <div>
        <!-- 使用nav-bar组件 -->
        <nav-bar title="新闻列表"></nav-bar>
    <div class="demo">
      <ul>
            <li v-for="news in newsList" :key="news.id">
                <router-link :to="{name:'news.detail',query:{newsId:news.id} }">
                    <img :src="news.img_url">
                    <div >
                        <span>{{news.title|convertTitle(18)}}</span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time|convertTime}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="line"></li>
        </ul>
    </div>

    </div>
</template>
<script>
    export default {
        created(){
            this.$axios.get('getnewslist')
            .then(res=>{
                    this.newsList = res.data.message;
            })
            .catch(err=>{
                console.log('新闻列表异常',err);
            })
        },
        data(){
            return {
                newsList:[],//新闻列表数据
            }
        }
    }
</script>
<style scoped>
p{
    margin:2px 30px 0px 0px;
}
.demo img{

    width: 42px;
    height: 42px;
    margin-right: 20px;

}

.demo a {
    display: flex;
    padding-left: 5px;
    align-items: center;
    margin: 5px 0px;
    border-bottom: 1px solid #dfdcdc;
    padding-bottom: 5px;
    color:black;
}

.news-desc{
    display: flex;
    color:#2196f3;
}



</style>