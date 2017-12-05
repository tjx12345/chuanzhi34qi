#### 使用方式
* 开发方式启动 `npm run dev`
* 构建生产代码 `npm run build`

#### 项目github地址
* https://github.com/tjx12345/chuanzhi34qi.git

#### 项目第一天注意事项
* 如果轮播图无法出现，确保index.html上的doctype删除
* 如果项目中出现一些奇怪无法理解的报错,  类似es6.tostring...
    - 重新解压node_modules包
* 注重vue代码编写，css/html可以简化一点


#### 日期格式
* YYYY-MM-DD HH:mm:ss 
* 四个大姨，两个大妹妹，两个大弟弟


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


#### 项目依赖包记录
* `npm i vue vue-router vue-preview axios mint-ui -S && npm i css-loader style-loader less-loader less file-loader url-loader babel-loader babel-core babel-preset-env babel-plugin-transform-runtime vue-loader vue-template-compiler html-webpack-plugin webpack webpack-dev-server -D`