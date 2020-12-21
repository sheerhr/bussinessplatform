'use strict'
// 引入nodejs的path模块，用于操作路径
const path = require('path')
// 引入模板的配置文件，下面就需要去这个文件中看看有什么基本的配置
const config = require('../config')
// 提取特定文件的插件，比如把css文件提取到一个文件中去
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 加载package.json文件
const packageConfig = require('../package.json')

// 生成编译输出的二级目录
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // path.posix是path模块跨平台的实现（不同平台的路径表示是不一样的）
  return path.posix.join(assetsSubDirectory, _path)
}

// 为不同的css预处理器提供一个统一的生成方式，也就是统一处理各种css类型的打包问题。
// 这个是为在vue文件中的style中使用的css类型
exports.cssLoaders = function (options) {
  options = options || {}

  // 打包css模块 
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 编译postcss模块
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // 创建loader加载器字符串，结合extract text插件使用
  function generateLoaders (loader, loaderOptions) {
    // 通过usePostCSS 来标明是否使用了postcss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    // 如果指定了具体的loader的名称
    if (loader) {
      // 向loaders的数组中添加该loader对应的加载器
      // 一个很重要的地方就是，一个数组中的loader加载器，是从右向左执行的。
      loaders.push({
        loader: loader + '-loader',
        // 对应的加载器的配置对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 如果明确指定了需要提取静态文件，则使用
    // ExtractTextPlugin.extract({})来包裹我们的各种css处理器。
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 使用这个函数，为那些独立的style文件创建加载器配置。
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  // node-notifier是一个跨平台的包，以类似浏览器的通知的形式展示信息。
  const notifier = require('node-notifier')

  return (severity, errors) => {
    // 只展示错误的信息
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
