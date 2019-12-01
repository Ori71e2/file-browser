'use strict'

const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null
let manualRestart = false
let hotMiddleware

function logStats (proc, data) {
  let log = ''

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}
/**
 * WebpackDevServer <== hotMiddleware 
 * 下面的逻辑较为乱，需要梳理
 */
function startRenderer () {
  return new Promise((resolve, reject) => {
    /*
     ** entry入口文件先执行dev-client.js后执行renderer/main.js，以启动hotClient（启动热替换客户端）
     */
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)
    rendererConfig.mode = 'development'
    const compiler = webpack(rendererConfig)
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.compilation.tap('compilation', compilation => {
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })

    compiler.hooks.done.tap('done', stats => {
      logStats('Renderer', stats)
    })
    /**
     * 见webpack-dev-server api example例子 <https://github.com/webpack/webpack-dev-server/blob/3fbda407d5ffaac7e9925ffe3bec3e65b80df7d2/examples/api/simple/server.js>
     * 参数1：webpack.config.js配置，参数2：webpack-dev-server参数
     * webpack-dev-server <https://github.com/webpack/webpack-dev-server>
     */
    const server = new WebpackDevServer(
      compiler, // 下面的ctx指的就是它
      {
        /**
         * Tell the server where to serve content from
         */
        contentBase: path.join(__dirname, '../'),
        /**
         * With devServer.quiet enabled, nothing except the initial startup information will be written to the console. This also means that errors or warnings from webpack are not visible.
         */
        quiet: true,
        /**
         * Provides the ability to execute custom middleware prior to all other middleware internally within the server. This could be used to define custom handlers
         * 见源码 <https://github.com/webpack/webpack-dev-server/blob/3fbda407d5ffaac7e9925ffe3bec3e65b80df7d2/lib/Server.js>
         * setupBeforeFeature() {
         * // Todo rename onBeforeSetupMiddleware in next major release
         * // Todo pass only `this` argument
         * this.options.before(this.app, this, this.compiler);
         * }
         * @param {*} app 
         * @param {*} ctx 即complier
         */
        before (app, ctx) {
          /**
           * 见源码，注意出现了express框架
           * setupApp() {
           * // Init express server
           * // eslint-disable-next-line new-cap
           *  this.app = new express();
           * }
           */
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )
    /**
     * 启动服务器端
     */
    server.listen(9080)
  })
}

function startMain () {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)
    mainConfig.mode = 'development'
    const compiler = webpack(mainConfig)

    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      logStats('Main', chalk.white.bold('compiling...'))
      /**
       * webpack-hot-middleware发送publish消息，action字段可自定义，与client客户端配合，该字段在webpack-hot-middleware源码client中处于switch case代码块的default中
       * 与本项目中的client中action.comipling相匹配
       * 见middleware.js源码<https://github.com/webpack-contrib/webpack-hot-middleware/blob/930157c5aa0db965166b22c76eb673601140c6db/middleware.js>
       * 深入点涉及到createEventStream源码段，再深入参考<https://www.html5rocks.com/en/tutorials/eventsource/basics/>
       */
      hotMiddleware.publish({ action: 'compiling' })
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

function startElectron () {
  var args = [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js')
  ]
  /**
   * detect yarn or npm and process commandline args accordingly
   */
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }

  electronProcess = spawn(electron, args)
  
  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

function greeting () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 104) text = 'electron-vue'
  else if (cols > 76) text = 'electron-|vue'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

function init () {
  greeting()

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init()
