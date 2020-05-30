/**
 * 样式loader配置
 */
const path = require('path');
// 拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = {
  test: /\.(css|less)$/,
  use: [{
      loader: 'css-loader',
      options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]' // 自定义html显示的className             
          },
          sourceMap: true,
          localsConvention: 'camelCase' // 将样式文件的 box-header 导入后 改为 boxHeader
      }
  }, {
      loader: require.resolve('less-loader'), // compiles Less to LESS
      options: {
          sourceMap: true
      },
  }, {
    loader: 'sass-resources-loader',
    options: {
      resources: [ // 设置全局变量
        path.resolve(__dirname, '../src/assets/css/theme.less')
      ]
    }
  }],
  exclude: /node_modules/
};

module.exports = function(env) {
  if(env === 'dev') {
    base.use.unshift({loader: 'style-loader'});
    return base;
  } else {
    base.use.unshift({loader: MiniCssExtractPlugin.loader})
    return base;
  }
}
