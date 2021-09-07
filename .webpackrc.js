const path = require('path');
const packagejson = require('./package.json');

let publicPath = "/";
if ((process.env.MAIN_ENV || process.env.NODE_ENV || 'development') !== 'development') {
  publicPath = '/mobile/';
}

export default {
  entry: "./src/index.js",
  extraBabelPlugins: [
    ["import", {
      "libraryName": "antd-mobile",
      "libraryDirectory": "es",
      "style": true,
    }]
  ],
  manifest: {
    basePath: process.env.BASE_PATH || "/mobile_client/",
  },
  hash: true,
  publicPath: publicPath,
  outputPath: process.env.OUTPUT_PATH || './dist/mobile_client/',
  html: {
    template: process.env.TMPL || "./src/index.ejs",
    inject: true,
    title: "学生端",
  },
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  // commons: [
  //   {
  //     name: 'vendor.js',
  //     filename: 'vendor.js',
  //     minChunks: (module) => {
  //       var resource = module.resource;
  //       if (!resource)
  //         return false;
  //       for (var libName of Object.keys(packagejson.dependencies)) {
  //         if (resource.indexOf(path.resolve(__dirname, 'node_modules', libName)) >= 0)
  //           return true;
  //       }
  //     },
  //   },
  // ],
}
