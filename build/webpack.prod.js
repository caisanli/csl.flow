const merge = require('webpack-merge');
const base = require('./webpack.base');
// 打包时先清空打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        }, {
            loader: 'css-loader',
            options: {
                modules: true,
                localsConvention: 'camelCase' // 将样式文件的 box-header 导入后 改为 boxHeader
            }
        }, {
            loader: require.resolve('less-loader'), // compiles Less to LESS
            options: {
                modules: true,
            },
        }],
        exclude: /node_modules/
    },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['./public']
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css'
    })
  ]
});