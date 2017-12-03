'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //入口
    entry: {
        'main': './src/main.js'
    },
    //产出
    output: {
        //资源路径
        path: path.join(__dirname, 'dist'),
        //js文件名
        filename: 'build.js'
    },
    module: {
        loaders: [{
                //处理css
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                //处理less
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                //处理文件
                test:/\.(jpg|png|svg|ttf|gif)$/,
                loader:'url-loader',
                options:{
                    name:'[name].[ext]',//源文件名和后缀
                    limit:4096,//超出生成文件，否则base64
                }
            },
            {
                //处理js的ES6
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },{
                //处理vue
                test:/\.vue$/,
                loader:'vue-loader'
            }

        ]
    },
    plugins:[
    //移动html
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })

    ]
}