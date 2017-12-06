<template>
    <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
                <!-- 广告使用a标签 -->
                <a :href="pic.url">
                    <img v-bind:src="pic.img||pic.src">
                </a>
          </mt-swipe-item>
    </mt-swipe>
</template>
<script>
    export default {
        name:'my-swipe',
        props:['url'],
        created(){
            this.$axios.get(this.url)
                .then( res=>{
                    this.imgs = res.data.message; //数组
            })
        },
        data(){
            return {
                imgs:[],//轮播图图片
            }
        }
    }
</script>
<style scoped>
    /*轮播图样式*/
 .mint-swipe-item img {
    width: 100%;
    height: 100%;
 }
.mint-swipe{
    height: 30%;
}
</style>