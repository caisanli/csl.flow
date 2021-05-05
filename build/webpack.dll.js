// webpack.dll.js
const path = require('path');
const process = require('process');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
console.log(typeof webpack.DllPlugin)
module.exports = {
  // manifest 缓存文件的请求上下文（默认为 Webpack 执行环境上下文）
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', 'css'],
    modules: [__dirname, 'node_modules'],
  },
  entry: {
    // 指定需要打包的 JS 模块，或是 CSS/Less/图片/字体文字等
    // 但注意要在 module 参数配置好相应的 loader
    library: ['react', 'react-dom', 'redux', 'react-redux'],
  },
  output: {
    // 这个是最终生成的包含分离的包的文件名称
    // 需要手动或者 AddAssetHtmlWebpackPlugin 添加进 HTML 中
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './build/library'),
    // 存放 dll 文件的全局变量名称，需要注意命名冲突
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      // 当前 dll 的所有内容都会存放在这个参数指定变量名的一个全局变量下
      // 需要与 output.library 保持一致
      name: '[name]',
      // manifest.json 文件的输出位置
      path: './build/library/[name].json',
    }),
    // 文件路径与 DllPlugin 输出的位置要一致
    new AddAssetHtmlPlugin([{ filepath: path.resolve(__dirname, './build/library/*.dll.js') }]),
  ],
};