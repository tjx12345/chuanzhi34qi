<template>
    <div>
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50" v-model="content"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>666条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convertTime}}
                </li>
                
            </ul>
                <mt-button type="danger" size="large" plain @click="loadMore">加载更多{{page}}</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'comment',
    // 声明props
    props:['cid'],
    data(){
        return {
            comments:[],//评论信息
            page:1,//页码
            hasData:true,//是否还有数据
            content:'',//评论内容
            id:0, //当前主体id
        }
    },
    methods:{
        //发表评论
        sendComment(){
            //评论内容 v-model
            this.$axios.post(`postcomment/${this.id}`
                ,`content=${this.content}`)
            .then(res=>{
                    //调用loadByPage函数
                    this.loadByPage(1); //函数内部会自增
                    //随即将组件内存储的页码归1
                    this.page = 1;
                    //清空当前数据
                    this.content = '';
            })
            .catch(err=>console.log(err));
        },
        loadMore(){
            //判断是否有数据
            if(!this.hasData)return;

            this.$axios.get(`getcomments/${this.id}?pageindex=${this.page}`)
            .then(res=>{
                this.comments = this.comments.concat(res.data.message);
                
                //设置数据检查结果
                if(res.data.message.length == 0){
                    this.hasData = false;
                    this.$toast('没有更多数据了');
                    return;
                }

                //也要自增
                this.page ++;


            })
            .catch(err=>console.log(err));
        },
        loadByPage(page){
        
                // ES6模板字符串
                this.$axios.get(`getcomments/${this.id}?pageindex=${page}`)
                .then(res=>{
                    this.comments = res.data.message;
                    //页码自增
                    this.page ++;
                })
                .catch(err=> console.log(err) );
        }
    },
    created(){
        // //写死ID值测试
        // this.id = 37;
        //写死页码 1;
        // this.page = this.$route.query.pageindex||1;
        // //发请求
        // // this.$axios.get('getcomments/'+id+'?pageindex='+pageindex)
        // // ES6模板字符串
        // this.$axios.get(`getcomments/${this.id}?pageindex=${this.page}`)
        // .then(res=>{
        //     this.comments = res.data.message;
        //     //页码自增
        //     this.page ++;
        // })
        // .catch(err=> console.log(err) );
        
        //创建组件的时候，接收父组件参数，传递值
        this.id = this.cid;

        this.page = this.$route.query.pageindex||1;
        //调用loadByPage函数
        this.loadByPage(this.page);
    },
}


</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
