'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/main/index.js')
  },
  /* 
  ** externals <https://webpack.js.org/configuration/externals/#root>
  ** The externals configuration option provides a way of excluding dependencies from the output bundles. 
  ** Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
  */
  externals: [
    ...Object.keys(dependencies || {}),
    /*
    ** 不打包devDependencies中的'electron-debug'
    ** 消除以下WARNING
    ** WARNING in ./node_modules/_electron-debug@3.0.1@electron-debug/index.js 96:45-58
    ** Critical dependency: the request of a dependency is an expression
    ** @ ./src/main/index.dev.js
    ** @ multi ./src/main/index.dev.js ./src/main/index.js
    */
    'electron-debug'
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter') // A simple formatter/reporter for ESLint that's friendly with Sublime Text and iterm2 "click to open file" functionality
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  /*
  ** node <https://webpack.js.org/configuration/node/#root>
  ** true: Provide a polyfill.
  ** 'mock': Provide a mock that implements the expected interface but has little or no functionality.
  ** 'empty': Provide an empty object.
  ** false: Provide nothing. Code that expects this object may crash with a ReferenceError.
  */
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  // 输出到/[root]/dist/electron文件夹
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  plugins: [
    /*
    ** NoEmitOnErrorsPlugin <https://webpack.js.org/loaders/eslint-loader/#noemitonerrorsplugin>
    ** webpack4 中自动启用
    ** NoEmitOnErrorsPlugin is now automatically enabled in webpack 4, when mode is either unset, or set to production.
    ** So even ESLint warnings will fail the build. No matter what error settings are used for eslint-loader, except if emitWarning enabled.
    */
    new webpack.NoEmitOnErrorsPlugin()
  ],
  /*
  ** resolve <https://webpack.js.org/configuration/resolve/#root>
  ** These options change how modules are resolved
  */
  resolve: {
    /*
    ** 按顺序解析同名不同文件格式
    ** Attempt to resolve these extensions in order.
    ** If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
    */
   alias: {
    '@': path.join(__dirname, '../src/main'),
    },
    extensions: ['.js', '.json', '.node']
  },
  /*
  ** target <https://webpack.js.org/configuration/target/>
  ** webpack can compile for multiple environments or targets.
  ** Instructs webpack to target a specific environment. 特定环境
  ** async-node、electron-main、electron-renderer、electron-preload、node、node-webkit、web、webworker
  */
  target: 'electron-main'
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  mainConfig.plugins.push(
    /*
    ** DefinePlugin <https://webpack.js.org/plugins/define-plugin/>
    ** 定义全局常量，以便在编译时使用，主要用于输出信息
    ** The DefinePlugin allows you to create global constants which can be configured at compile time.
    */
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    // 查看官网，了解在已有Babili这个包为何还使用这个插件<https://github.com/webpack-contrib/babel-minify-webpack-plugin>
    new BabiliWebpackPlugin(),
    // 定义一个全局常量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig
