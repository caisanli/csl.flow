const merge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 开启热更新
    hot: true,
    contentBase: path.join(__dirname, './../dist')
  },
  devtool: 'inline-source-map'  
})