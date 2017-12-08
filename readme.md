#### 使用方式
* 开发方式启动 `npm run dev`
* 构建生产代码 `npm run build`

#### 项目github地址
* https://github.com/tjx12345/chuanzhi34qi.git


#### 日期格式
* YYYY-MM-DD HH:mm:ss 
* 四个大姨，两个大妹妹，两个大弟弟

#### 项目第一天注意事项
* 如果轮播图无法出现，确保index.html上的doctype删除
* 如果项目中出现一些奇怪无法理解的报错,  类似es6.tostring...
    - 重新解压node_modules包
* 注重vue代码编写，css/html可以简化一点

#### 项目第二天第一次练习注意事项
* 主题评论组件的测试，配置单独的路由 /test
* 1:先写死，id、pageindex
* 2:pageindex通过路由参数接收 查询字符串
* 3:区分追加和created中对comments不同的操作
    - 一个是赋值
    - 一个是追加
    - pageindex自增
    - 判断是否还有数据的操作

#### 评论组件对外依赖
* 主题id依赖父组件传递
* 页码依赖url的查询字符串，没有传递就是1


```javascript
获取以参数时间为基准的当前时间差
moment('2017-12-05 09:56:00').fromNow()
"4 minutes ago"
moment.locale('zh-cn');
"zh-cn"
moment('2017-12-05 09:56:00').fromNow()
"4 分钟前"
设置语言
moment.locale('en');
"en"
格式化日期
moment('2017-12-05 09:56:00').fromNow()
"4 minutes ago"
moment().format('YYYY-MM-DD HH:mm:ss ');
"2017-12-05 09:52:20 "

```

#### 零散知识点总结
* 过滤器可以传递多个参数 {{text | convert(1,2)}}
* `Vue.filter('convert',(value,1,2)=>{})`
* 页面初次是可以以data中声明的默认值来渲染的
    - 此时是一个对象，用对象来调用过滤器容易出异常
    - 如果页面调用过滤器等行为包裹在v-for内，初始值是[],则不会触发
* 头部组件的复用
    - 子组件的功能
        + html + css + js
    - 数据依赖外部 props:['xxx']
    - 样子依赖外部 slot填坑
* v-html中的元素，不被scoped样式所影响,其样式只影响当前存在于template中的元素

#### 新的API
``` javascript
var obj = {1:2,3:4};
undefined
obj
{1: 2, 3: 4}
Object.values(obj);
(2) [2, 4]
Object.keys(obj);
(2) ["1", "3"]
```

#### 项目依赖包记录
* `npm i vue vue-router vue-preview axios mint-ui -S && npm i css-loader style-loader less-loader less file-loader url-loader babel-loader babel-core babel-preset-env babel-plugin-transform-runtime vue-loader vue-template-compiler html-webpack-plugin webpack webpack-dev-server -D`

#### 项目第三天的难点
* 评论发表后的业务操作
* 商品列表
    - https://mint-ui.github.io/docs/#/zh-cn2/loadmore
    - 上拉或下拉
* 商品详情中小球的飞入
    - vue过渡效果
    - this.$set
