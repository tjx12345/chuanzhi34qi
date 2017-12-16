<template>
    <div>
            <!-- 头部 -->
            <mt-header title="传智34期" ref="header"></mt-header>
            <transition name="rv" mode="out-in">
              <router-view class="tmpl" :appRefs="$refs"></router-view>
            </transition>
            <!-- 
              router-view最终会作为坑，填入不同的组件，在App中使用这些组件，就是子组件，就可以接收父组件的参数
            <home></home>
            <goods-list></goods-list> -->



            <!-- js中: this.$refs js中this.。template中直接用 -->
            <mt-tabbar v-model="selected" ref="footer">
              <mt-tab-item id="home">
                <img slot="icon" src="../static/img/index.png">
                首页
              </mt-tab-item>
              <mt-tab-item id="member">
                <img slot="icon" src="../static/img/vip.png">
                会员
              </mt-tab-item>
              <mt-tab-item id="shopcart">
                <img slot="icon" src="../static/img/shopcart.png">
                购物车<mt-badge type="error" size="small">{{shopcartNum}}</mt-badge>
              </mt-tab-item>
              <mt-tab-item id="search">
                <img slot="icon" src="../static/img/find.png">
                查找
              </mt-tab-item>
            </mt-tabbar>
    </div>
</template>
<script>
    export default {
        computed:{
          shopcartNum(){
              return this.$store.getters.getNum;
          }
        },  
        data(){
            return {
                selected:'',
            }
        },
        watch:{
            selected(newV){
                // console.log(newV);
                //让锚点值改变
                this.$router.push({
                    name:newV
                });
            }
        }
    }
</script>
<style scoped>
.rv-enter-active,.rv-leave-active{
   transition: opacity .5s
}

/*元素移除的时候home,默认透明度1 --> 0*/
/*元素插入的时候news,默认透明度0 --> 1*/

/*插入元素之后的1不需要设置*/
.rv-entry,.rv-leave-to{
  opacity: 0;
}

   .mint-tabbar{
    position: fixed;
    bottom:0;
   } 
</style>