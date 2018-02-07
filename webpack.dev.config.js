const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin('css/[name].[hash].css');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        publicPath: 'http://192.168.1.135:8096/dest/',
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    // 配置 url-loader 的可选项
                    options: {
                        // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                        limit: 10000,
                        // 超出限制，创建的文件格式
                        // bin/images/[图片名].[hash].[图片格式]
                        name: 'images/[name].[ext]'
                    }
                }]
            },{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })  
            }
        ]
    },
    plugins: [
        extractCss,

        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        })
    ],
    devServer: {
        port: 8096
    }
}