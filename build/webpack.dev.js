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
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader',
            options: {
                modules: true,
                localsConvention: 'camelCase' // 将样式文件的 box-header 导入后 改为 boxHeader
            }
        }, {
            loader: require.resolve('less-loader'), // compiles Less to LESS
            options: {
                sourceMap: true
            },
        }],
        exclude: /node_modules/
    },
    ]
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