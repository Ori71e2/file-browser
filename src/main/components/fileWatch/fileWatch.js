import { ipcMain } from 'electron'
import Message from '@/../utils/message.js'
// import MainGlobal from '@/utils/mainGlobal.js'
const os = require('os')
const path = require('path')
const fs = require('fs')
function addFileWatch() {

}
function addIpcListener() {
  ipcMain.on('file-browser', fileBrowserListener)
}
function fileBrowserListener(e, { action, data }) {
  let appDir = os.homedir()
  try {
    if (action === 'getFiles') {
      fs.watch(appDir, { persistent: true, recursive: true }, (eventType, filename) => {
        console.log(filename)
        console.log(global.mainGlobalMianWindow)
        /**
         * 此处必须捕获异常，否则当页面被销毁，此处未销毁，会报错。
         * 可以在页面销毁时，同步销毁此处。
         */
        try {
          e.reply('file-browser-reply', new Message(filename, filename))
        } catch (err) {
          console.log('renderer page has been destroyed!')
          ipcMain.removeLinstener('file-browser', fileBrowserListener)
        }
      })
    }
  } catch (err) {
  }
}
addIpcListener()
