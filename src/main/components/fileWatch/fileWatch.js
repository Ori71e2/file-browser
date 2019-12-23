import { ipcMain } from 'electron'
import Message from '@/../utils/message.js'
// import MainGlobal from '@/utils/mainGlobal.js'
const os = require('os')
const path = require('path')
const fs = require('fs')
function addIpcListener() {
  ipcMain.on('file-browser', (e, { action, data }) => {
    const appDir = os.homedir()
    fs.watch(appDir, { persistent: true, recursive: true }, (eventType, filename) => {
      console.log(filename)
      console.log(global.mainGlobalMianWindow)
      global.mainGlobalMianWindow.webContents.send()
    })
    if (action === 'getFiles') {
      // console.log('xxxxxxxxxx')
      e.reply('file-browser-reply', new Message(appDir, appDir))
    }
  })
}

addIpcListener()
