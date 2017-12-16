'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const version = require('./package.json').version;
//提取css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
//给html插件追加引入
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
//压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //入口
    entry: {
        'main': './src/main.js'
    },
    //产出
    output: {
        //资源路径
        path: path.join(__dirname, 'dist8_lazy_router'),
        //js文件名
        // filename: 'build.js?v=' +version  版本号升级
        filename:'[name].[chunkhash:6].js', //文件数字签名
    },
    module: {
        loaders: [{
                //处理css
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",  //最终加载
                  use: "css-loader?minimize=true"//先css-loader
                })
            },
            {
                //处理less
                test: /\.less$/,
                 use: ExtractTextPlugin.extract({
                  fallback: "style-loader",  //最终加载
                  use: "css-loader?minimize=true!less-loader"//先css-loader
                })
            },
            {
                //处理文件
                test:/\.(jpg|png|svg|ttf|gif)$/,
                loader:'url-loader',
                options:{
                    // name:'[name].[ext]?v='+version,//源文件名和后缀
                    name:'[name].[hash:6].[ext]',
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
            },
            // {
            //     test: /vue-preview.src.*?js$/,
            //     loader: 'babel-loader'
            // }

        ]
    },
    plugins:[
        new UglifyJsPlugin(),
        //优先获取关联信息对象，得到全局对象的名称，关联文件中的有各自依赖和id以及文件路径
        new webpack.DllReferencePlugin({
            //文件基础路径
            context:__dirname,
            //获取manifest.json文件中的对象
            manifest:require('./manifest.json')
        }),
        //提取css
        new ExtractTextPlugin("styles.[contenthash:6].css"),
    //移动html
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
    //追加引入
         new AddAssetHtmlPlugin({ 
            filepath: path.join(__dirname,'vonders.js'),
            hash:true,//文件唯一标示
            includeSourcemap:false,//不要默认加.map
            outputPath:'js',//针对dist多一级js文件夹
            publicPath:'js',//link和script标签中添加js/
        }),

    ]
}