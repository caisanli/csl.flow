const merge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const path = require('path');
const StyleLoader = require('./styleLoader')
module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [ StyleLoader('dev') ]
  },
  devServer: {
    // 开启热更新
    hot: true,
    // 打开浏览器
    open: true,
    contentBase: path.join(__dirname, './../dist')
  },
  devtool: 'inline-source-map'  
})