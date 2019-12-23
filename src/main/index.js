'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import Message from '@/../utils/message.js'

const path = require('path')
const glob = require('glob')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let height = 700
let width = 1000
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
function initialize() {
  makeSingleInstance()
  // addWindowListener()
  /**
   * 加载所有后台js文件
   */
  loadMainJs()

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function loadMainJs () {
  // console.log('load main js')
  // const files = glob.sync(path.join(__dirname, './components/**/*.js'))
  // files.forEach((file) => {
  //   console.log('.' + file.replace(__dirname, ''))
  //   require('.' + file.replace(__dirname, ''))
  // })
  require('./components/index')
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: height,
    minHeight: height,
    useContentSize: true,
    width: width,
    minWidth: width,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true // add this，因为electron自5.0后默认不允许在web页面中使用中nodejs API，本项目模板中使用了nodejs API，页面会白屏
    }
  })
  global.mainGlobalMianWindow = mainWindow
  mainWindow.show()
  mainWindow.loadURL(winURL)

  addIpcListener()
  addWindowListener()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function addIpcListener() {
  ipcMain.on('frame-controller', (e, { action, data }) => {
    frameController(e, action)
  })
}

function frameController(e, action) {
  switch (action) {
    case 'minimize':
      mainWindow.minimize()
      break
    case 'maximize':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
      break
    case 'fullScreen':
      mainWindow.setFullScreen(!mainWindow.isFullScreen())
      break
    case 'close':
      mainWindow.close()
      break
  }
}
/**
 * 采用监听方式是考虑到双击也可以全屏的操作
 */
function addWindowListener() {
  // 添加全屏事件监听
  mainWindow.on('maximize', (e) => {
    // console.log('maxmize')
    e.sender.send('frame-controller-relpy', new Message('maximize', true))
  })
  // 添加还原全屏事件监听
  mainWindow.on('unmaximize', (e) => {
    // console.log('unmaxmize')
    e.sender.send('frame-controller-relpy', new Message('unmaxmize', false))
  })
}
initialize()
