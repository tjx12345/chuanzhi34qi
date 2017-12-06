<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large">发表评论</mt-button>
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
                <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            comments:[],//评论信息
            page:1,//页码
            hasData:true,//是否还有数据
        }
    },
    methods:{
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
        }
    },
    created(){
        //写死ID值测试
        this.id = 37;
        //写死页码 1;
        this.page = this.$route.query.pageindex||1;
        //发请求
        // this.$axios.get('getcomments/'+id+'?pageindex='+pageindex)
        // ES6模板字符串
        this.$axios.get(`getcomments/${this.id}?pageindex=${this.page}`)
        .then(res=>{
            this.comments = res.data.message;
            //页码自增
            this.page ++;
        })
        .catch(err=> console.log(err) );

    }
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
