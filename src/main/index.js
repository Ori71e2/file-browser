'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

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
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
function initialize() {
  makeSingleInstance()
  // addWindowListener()
  loadMainJs()

  function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      height: 563,
      useContentSize: true,
      width: 1000,
      frame: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: true // add this，因为electron自5.0后默认不允许在web页面中使用中nodejs API，本项目模板中使用了nodejs API，页面会白屏
      }
    })
    mainWindow.show()
    mainWindow.loadURL(winURL)

    addIpcListener()

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

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
  const files = glob.sync(path.join(__dirname, 'src/main/**/*.js'))
  files.forEach((file) => { require(file) })
}

function addIpcListener() {
  ipcMain.on('main', (e, { action, data }, arg) => {
    if (action === 'frameController') {
      frameController(e, data)
    }
  })
}

function frameController(e, data) {
  switch (data) {
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

// function addWindowListener() {
//   // 添加全屏事件监听
//   mainWindow.on('maximize', (e) => {
//     e.sender.send('main-relpy', new Message('maximize', true))
//   })
//   // 添加还原全屏事件监听
//   mainWindow.on('unmaximize', (e) => {
//     e.sender.send('main-relpy', new Message('maximize', false))
//   })
// }

initialize()
