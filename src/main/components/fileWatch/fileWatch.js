import { ipcMain } from 'electron'
import Message from '@/../utils/message.js'

console.log('xxxxxxxxx')
function addIpcListener() {
  ipcMain.on('file-browser', (e, { action, data }, arg) => {
    if (action === 'getFiles') {
      e.sender.send('file-browser-replay', new Message('xx', 'xx'))
    }
  })
}
addIpcListener()
