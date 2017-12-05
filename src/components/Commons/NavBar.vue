<template>
    <div>
         <div class="cms-s-header">
            <h1 @click="goback">&nbsp<</h1>
            <h2 class="page-title">{{title}}</h2>
          </div> 
    </div>
</template>
<script>
    export default {
        // 组件名
        name:'nav-bar',
        methods:{
            goback(){
                this.$router.go(-1); //返回上一次记录
            }
        },
        props:['title'], //接收父组件值
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
.cms-s-header{
        height: 40px;
        background-color: #f7f7f7;
}
.page-title{
    margin-left: 25%;
}
h1,h2{
   display: inline-block;
   height: 40px;
   line-height: 40px;
   margin-top:0px;
   margin-bottom:0px;

}
</style>