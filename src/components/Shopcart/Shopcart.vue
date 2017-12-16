<template>
    <div>
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="goods in shopcart" :key="goods.id">
                    <mt-switch v-model="goods.isSelected"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p>商品标题</p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="substract(goods)">-</span>
                            <span>{{goods.pickNum}}</span>
                            <span @click="add(goods)">+</span>
                            <a href="javascript:;" @click="del(goods)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
// 1:先使用$set来设置新增的两个属性,pickNum,isSelected
// 2:更改一下方式，自定义添加属性
// 3:创建组件的时候，发起请求
// 4:拼接ID URL:/api/goods/getshopcarlist/87,88,89
// 5:引入商品工具对象，获取到goodsObj
// 6:生成ids


import GoodsTools from '../Commons/GoodsTools.js';

export default {
     beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
        if(confirm('亲，确定要离开吗？')){
            //保存当前的数据到本地存储
            GoodsTools.saveArr(this.shopcart);
            
            //this.$store是内存中的js存储
            //GoodsTools.getTotalCount() 是localStorage
            this.$store.dispatch('changeGoodsNum',GoodsTools.getTotalCount());
            next();
        }else{
            next(false);
        }


  
        
    },
    computed:{
        payment:function(){
            let count = 0;
            let total = 0;

            //遍历数组，
            this.shopcart.forEach(ele =>{
                //判断是否选中
                if(ele.isSelected){
                    count += ele.pickNum;//统计件数
                    total += ele.pickNum * ele.sell_price;//金额
                }
            });
            return {
                count,total
            }
        }
    },
    created(){

        //获取工具对象中的goodsObj
        let goodsObj = GoodsTools.getGoods();
        //获取url中的ids
        let ids = Object.keys(goodsObj).join(',');
        //拼接URL
        let url = `goods/getshopcarlist/${ids}`;
        // console.log(url);
        this.$axios.get(url)
        .then(res=>{
                //加属性方式1
                // res.data.message.forEach(ele=>{
                //     ele.pickNum = goodsObj[ele.id];
                //     ele.isSelected = true;
                // });
     //触发Vue给shopcart对象接收的新值中的所有属性做监视
                this.shopcart = res.data.message;
                    // 遍历数组，添加属性
                this.shopcart.forEach(ele => {
                    // vm.$set(obj,key,value);
                    //挑选数量,加属性方式2
                    this.$set(ele,'pickNum',goodsObj[ele.id]);
                    this.$set(ele,'isSelected',true);
                    // ele.pickNum = goodsObj[ele.id];
                    // ele.isSelected = true;
                });

                // console.log(this.shopcart);

        })
        .catch(err => console.log(err));
    },
    methods:{
        add(obj){
            console.log('函数执行了');
            obj.pickNum ++;
        },
        substract(obj){
            obj.pickNum --;
        },
        //删除元素
        del(obj){
            if(confirm('亲约定要删除吗？很优惠哟!')){
                //找元素索引
             let index = this.shopcart.findIndex( ele => ele.id == obj.id);
             //删除
             this.shopcart.splice(index,1);
            }
        }
    },
    data(){
        return {
            shopcart:[], //购物车
        }
    }
}







</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
