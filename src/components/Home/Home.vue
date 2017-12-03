<template>
    <div>
            <mt-button @click="test" type="danger" size="large">点我测试</mt-button>
            {{lunbo}}
    </div>
</template>
<script>
    export default {
        methods:{
            test(){
                this.$axios.get('getlunbo')
                .then( res=>{
                    this.lunbo = res.data.message; //数组
                })
            }
        },
        data(){
            return {
                lunbo:[],
            }
        }
    }
</script>
<style>
    
</style>