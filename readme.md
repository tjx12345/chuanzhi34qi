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

#### 总结
* 第一天（指令）
    - Vue是前端框架，减少DOM操作，内部js实现
    - 双向数据绑定:
        + 1:内存影响页面的改变
        + 2:页面影响内存的改变
    - 常用指令
        + v-xxx 叫做指令
        + v-text:双标签，innerText
        + v-html:双标签, innerHTML
        + v-if: 插入或移除
        + v-show: 显示或隐藏
        + v-else: 与v-if 是邻居
        + v-for 列表
        + v-on: 绑定事件 @事件名
        + v-bing: 绑定属性 :事件名
        + v-model: 双向数据绑定
* 第二天（组件）
    - 父用子
        + 全局 `Vue.component(组件名,组件对象);`
        + 组件内
            * 选项中的components
    - 父传子
        + 常量 `直接用`
        + 变量传 `v-bind`
    - 大家传(VueBus)
        + `VueBus.$on(事件名,回调函数(参数){})`
        + `VueBus.$emit(事件名,数据)`
    - 过滤器
        + `Vue.filter('过滤器名',fn(value,argv1,argv2){})`
        + 使用 `{value|过滤器名('1','2')}`
    - 全局和局部的组件、过滤器
        + 就是差个s
    - 声明周期
        + 创建和销毁->  
            * created操作数据
        + 激活和停用->  内置组件:<keep-alive></keep-alive>
        + 更新
            * 更新前，可以进行二次更改
            * 更新后，触发循环调用
        + 装载
            * mounted操作DOM
            * this.$refs.xxx获取
        + v-if影响:创建、销毁、激活、停用
    - watch
        + 监视单个
        + 深度监视  {deep:true,handler:fn}
            * 针对复杂数据类型
    - computed
        + 监视多个
* 第三天
    - 路由
    - 命名路由 + router-link 具名匹配
    - 多视图
        + 一次填多个坑，按名字来填入组件
    - 嵌套路由
        + 避免重复渲染，避免冗余代码
        + 让变化中存在变化，单独改变某些router-view
        + 写法:router-view包含router-view
        + 路由children路由
    - 编程导航
        + $router.push 变更锚点跳转路由
        + $router.go 历史记录前进后退
    - 元数据 路由对象携带的数据 to.meta.xx
    - 钩子 ->
        + 全局钩子 -> 权限控制
            * 前
            * 后 无法控制放行
        + 路由独享钩子
        + 组件内钩子 -> 影响组件 + 路由 -> 影响页面
            * 进入前 前期的数据准备
            * 更新   组件复用了，参数改变了
            * 离开前 用户改变锚点的确认及数据的存储
* 第四天axios
    - get/post
    - 原型挂载使用对象
    - baseURL 基础URL
    - params 查询字符串
    - data 数据
        + 字符串、对象、FormData
        + 类型放正确了头不用处理
    - headers
    - 拦截器
        + 1:loadding
        + 2:如果没有cookie,拦截器自动每次添加我们自己的标识（添加头）
    - onUploadProgress 上传进度
        + loaded、total
    - 取消请求
        + 1:获取取消请求的对象 `let c = Axios.cancelToken;`
        + 2:创建一个令牌生成器 `let source = c.source();`
        + 3:将令牌交给请求
                `请求的options:{ cancelToken:source.token }  `
        + 4:取消 `source.cancel();`
    - 合并请求
        + 在乎的是结果，全成功
            * 省市动态获取
    - 顺序请求
        + 在乎的过程
        + `请求1.then(res=>{ return 请求2 }).then().catch(err);`
* webpack基本配置（认识即可）
* $refs.xxx 获取DOM或者组件
    - `ref="xxx"写在组件上`，获取的就是组件，$el获取其DOM
    - `ref="xxx"写在DOM上`，获取的DOM对象
* 项目难点
    - 九宫格组件的抽取
        + slot 变化的DOM坑
        + slot 也可以具名，选择性填入DOM坑
        + 爷爷不管孙子
            * 爷爷组件只管爸爸组件的根节点
            * 爸爸组件最终会管孙子的所有节点
            * slot不能写class
    - 路由三板斧，去哪里，导航，去了干嘛
    - vue-preview也有小坑,h,w属性必要有
    - 组件的设计
        + 组件样子
        + 组件内部请求URL
        + 组件内部数据结构
        + 评论组件传递id，轮播图组件传递URL
    - 上拉加载更多
        + 触发的机制是父子元素底边重叠
        + onBottomLoaded()去通知
    - router-view可以传值给所有组件
    - 过渡效果(v-if)
        + 4点 进入前、进入后、离开前、离开后
        + 2段 动画 进入中、离开中
        + v-xxx
        + v代表transition组件的name属性
        + `<transition name="xxx"></transition>`
    - 二次为对象添加属性：
        + 1:在this.obj = xxx; 之前，将数据准备好到xxx中
        + 2:this.$set(this.obj,'属性1',value); 后操作的行为

#### vuex
* 是一个管理全局数据的插件,全局数据共享
* 不用担心组件显示的数据不同步
* + - * /
* 做加法、做减法、做乘法、做除法（函数的方式）
* 调用该方法
* 凡是vue中大型一点的应用都会使用vuex，来管理共享数据

#### 总结
* 1:引入 vuex
* 2:安装插件  Vue.use(Vuex);
* 3:创建仓库实例 `let store = new Vuex.store(options)`
* 4:options:
    - state 原数据
    - mutations: 改变数据   DB角色
    - actions: 业务行为，调用DB     controller
    - getters: 获取数据
    - modules: 继续细分模块
        + 内部是以上5个属性

#### git记录
* 提交  12345
* 切换到3 改代码，并提交，让本地有记录
* push 到master的时候，保证Pull下来最新的，时代统一了，就能push之前提交的了