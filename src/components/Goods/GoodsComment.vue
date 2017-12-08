<template>
    <div>
            <nav-bar title="商品评论"></nav-bar>
            <comment :cid="cid"></comment>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                cid:'',//商品详情传递来的cid
            }
        },
        created(){
            this.cid = this.$route.query.cid;
        }
    }
</script>
<style>
    
</style>