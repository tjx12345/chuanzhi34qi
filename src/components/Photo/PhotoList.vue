<template>
    <div>
        <!-- 引入返回导航 -->
        <nav-bar title="图文分享"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getImgs(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{imgId:img.id}  }">
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
 export default {
    data(){
        return {
            categorys:[],//分类信息
            imgs:[],//图片信息
        }
    },
    
    created(){
        console.log('图文列表出生了');
        //获取路由参数
        let categoryId = this.$route.params.categoryId;
        this.$axios.all([
            this.$axios.get('getimgcategory'),
            this.$axios.get('getimages/' + categoryId)
        ])
        .then(this.$axios.spread((categoryRes,imgRes)=>{
                this.categorys = categoryRes.data.message;
                this.categorys.unshift({
                    id:0,title:'全部'
                });
                this.imgs = imgRes.data.message;
                if(this.imgs.length == 0){
                    this.$toast({
                      message: '提示:没有图片了',
                      duration: 5000
                    });
                }
            })
        )
    },
    //路由更新时间  当/a/1 切换成/a/2    path:'/a/:id'
     beforeRouteUpdate (to, from, next) {
                    //  0    24
                    // 从24到0
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
        //从路由参数中获取分类id
        // this.$axios.get('getimages/' + to.params.categoryId)
        // .then(res=>{
        //     this.imgs = res.data.message;
        //     next();
        // });

        this.getImgs(to.params.categoryId);
        next();
        
    },
    methods:{
        getImgs(id){//按分类获取图片数据
            this.$axios.get('getimages/' + id)
            .then( res=>{
                this.imgs = res.data.message;
                if(this.imgs.length == 0){
                    this.$toast({
                      message: '提示:没有图片了',
                      duration: 5000
                    });
                }
            })
            .catch( err=>{
                console.log(err);
            })
        }
    },
 }


</script>
<style>

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}



</style>
