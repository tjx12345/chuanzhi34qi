<template>
    <div>  
        
        <nav-bar title="图文详情"></nav-bar>

        <div class="photo-title">
            <p>{{imgInfo.title}}</p>
            <span>发起日期：{{imgInfo.add_time|convertTime}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img,index) in imgs" :key="index">
                <img class="preview-img" :src="img.src" @click="$preview.open(index, imgs)">

            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>

        <!-- 使用评论组件 -->
        <comment :cid="$route.params.imgId"></comment>


    </div>
</template>
<script>
export default {
    data(){
        return {
            imgInfo:{},//图文详情数据
            imgs:[], //图片数据
        }
    },
    created(){
        //获取路由参数
        let imgId = this.$route.params.imgId;
        //获取图文详情
        this.$axios.get('getimageInfo/' + imgId)
        .then(res=>{
            this.imgInfo = res.data.message[0];
        })
        //获取缩略图
        this.$axios.get('getthumimages/' + imgId)
        .then(res=>{
            this.imgs = res.data.message;
            //给缩略图宽高,确定x点
            this.imgs.forEach(ele=>{
                ele.h = 400;
                ele.w = 600;
            })
        })
    }
}

</script>
<style scoped>
img{
    width: 100%;
}


li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 18px;
}

</style>
