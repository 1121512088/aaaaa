const path = require('path');

let publicPath = "";
if ((process.env.BABEL_ENV || process.env.NODE_ENV || 'development') !== 'development') {
  publicPath = '/mobile/';
}
export default {
  extraBabelPlugins: [
    ["import", {
      "libraryName": "antd-mobile",
      "libraryDirectory": "es",
      "style": true,
    }]
  ],
  "manifest": {
    "basePath": "/mobile/",
  },
  "hash": true,
  "publicPath": publicPath,
  "outputPath": './dist/mobile/',
  "html": {
    template: "./src/index.ejs",
    inject: true,
    title: "指数",
  },
  "alias": {
    "@": path.resolve(__dirname, "./src"),
  }
}
