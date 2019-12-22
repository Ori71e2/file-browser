import { ipcMain } from 'electron'
import Message from '@/../utils/message.js'
const path = require('path')
function addIpcListener() {
  ipcMain.on('file-browser', (e, { action, data }) => {
    const appDir = process.execPath
    if (action === 'getFiles') {
      // console.log('xxxxxxxxxx')
      e.reply('file-browser-reply', new Message(appDir, appDir))
    }
  })
}
addIpcListener()
