const { override, addLessLoader,fixBabelImports } = require('customize-cra');

// 实现 antd按需导入 和 less 配置
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true,
    cssLoaderOptions: {
      modules: {localIdentName: '[name]_[local]_[hash:base64:5]'},
    }, // .less file used css-loader option, not all CSS file.
  }),
)
