/**
 * webpackHotMiddleware <https://github.com/webpack-contrib/webpack-hot-middleware>
 * 配置项可以通过query 方式添加到webpack config中的路径来传递给客户端
 * noInfo - 设置为true禁用信息控制台日志记录。
 * reload - 设置为true在Webpack卡住时自动重新加载页面。
 * 
 */
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
/**
 * 启动热跟新客户端
 * 阅读源码查看API <https://github.com/webpack-contrib/webpack-hot-middleware/blob/cb29abb9dde435a1ac8e9b19f82d7d36b1093198/client.js>
 * client有subscribe函数属性，注意源码中processMessage函数，其中switch case代码块中'built'无break语句，可以直接执行到default段
 * '''
 * 'default':
 *    if (customHandler) {
 *      customHandler(obj);
 *    }
 * '''
 */
hotClient.subscribe(event => {
  /**
   * Reload browser when HTMLWebpackPlugin emits a new index.html
   *
   * Currently disabled until jantimon/html-webpack-plugin#680 is resolved.
   * https://github.com/SimulatedGREG/electron-vue/issues/437
   * https://github.com/jantimon/html-webpack-plugin/issues/680
   */
  // if (event.action === 'reload') {
  //   window.location.reload()
  // }

  /**
   * Notify `mainWindow` when `main` process is compiling,
   * giving notice for an expected reload of the `electron` process
   */
  if (event.action === 'compiling') {
    document.body.innerHTML += `
      <style>
        #dev-client {
          background: #4fc08d;
          border-radius: 4px;
          bottom: 20px;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
          color: #fff;
          font-family: 'Source Sans Pro', sans-serif;
          left: 20px;
          padding: 8px 12px;
          position: absolute;
        }
      </style>

      <div id="dev-client">
        Compiling Main Process...
      </div>
    `
  }
})
