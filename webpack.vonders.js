// new webpack.DllPlugin(options)

// 入口 vue 、vue-router、vuex
'use strict';
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:{
       'vonders':['vue','vue-router','vue-preview','moment','axios','vuex'] 
    },
    //抽取到哪里
    output:{
        filename:'./vonders.js',
        library:'vonders', //保持该属性与DllPlugin中的name一致
        //声明
    },
    module:{
        loaders:[
            {
                //处理vue
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
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
        ]
    },
    //插件
    plugins:[
        new UglifyJsPlugin(),
        new webpack.DllPlugin({
            name:'vonders', //未来获取
            path:'./manifest.json',//main与vonders.js的关系
         })

    ]
}