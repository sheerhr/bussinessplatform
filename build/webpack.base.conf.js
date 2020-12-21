'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
require("babel-polyfill");

// 生成相对于根目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// eslint的规则
const createLintingRule = () => ({
  // 对.js和.vue结尾的文件进行eslint检查
  test: /\.(js|vue)$/,
  // 使用eslint-loader
  loader: 'eslint-loader',
  // enforce的值可能是pre和post。其中pre有点和webpack@1中的preLoader配置含义相似。
  // post和v1中的postLoader配置含义相似。表示loader的调用时机
  // 这里表示在调用其他loader之前需要先调用这个规则进行代码风格的检查
  enforce: 'pre',
  // 需要进行eslint检查的文件的目录存在的地方
  include: [resolve('src'), resolve('test')],
  // eslint-loader配置过程中需要指定的选项
  options: {
    // 文件风格的检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
    formatter: require('eslint-friendly-formatter'),
    // 是否需要eslint输出警告信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// 下面就是webpack基本的配置信息（可以理解成是开发环境和生产环境公共的配置）
module.exports = {
  // webpack解析文件时候的根目录(如果把webpack.config.js)放在了项目的根目录下面，这个配置可以省略
  context: path.resolve(__dirname, '../'),
  // 指定项目的入口文件
  entry: {
    // app: './src/main.js'
    app: ['babel-polyfill', './src/main.js']
  },
  // 项目的输出配置
  output: {
    // 项目build的时候，生成的文件的存放路径(这里的路径是../dist)
    path: config.build.assetsRoot,
    // 生成文件的名称
    filename: '[name].js',
    // 输出解析文件的目录，url 相对于 HTML 页面(生成的html文件中，css和js等静态文件的url前缀)
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块解析时候的一些选项
  resolve: {
    // 指定哪些类型的文件可以引用的时候省略后缀名
    extensions: ['.js', '.vue', '.json'],
    // 别名，在引入文件的时候可以使用
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // 可以在引入文件的时候使用@符号引入src文件夹中的文件
      '@': resolve('src'),
    }
  },
  // 下面是针对具体的模块进行的具体的配置
  // 下面的配置语法采用的是version >= @2的版本
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }  
      },
      // { //从这一段上面是默认的！不用改！下面是没有的需要你手动添加，相当于是编译识别sass! 
      //   test: /\.scss$/,
      //   loaders: ["style", "css", "sass"]
      // }
    ]
  },
  // 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
  // 这可以使最初为nodejs编写的代码可以在浏览器端运行
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
