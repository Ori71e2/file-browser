import { ipcMain } from 'electron'
import Message from '@/../utils/message.js'
import { Node, MultiwayTree } from './multiwayTree.js'

const os = require('os')
const path = require('path')
const fs = require('fs')
const AsyncLock = require('async-lock')
const lock = new AsyncLock()

let platform = os.platform()
let id = 0
let fileBrowserTree = null
/* eslint-disable */
function fileBrowserInit() {
  fileBrowserTree = new MultiwayTree()
  if (platform === 'linux') {
    lock.acquire(fileBrowserTree, () => {
      // return value or promise
      fileBrowserTree.add(new Node(0, '/', addFileWatcher('/')))
      return fileBrowserTree
    }, opts).then(function() {
      // lock released
    })
    let pathName = '/'
    fs.readdir(pathName, function(err, files) {
      let dirs = []
      (function iterator(i) {
        if (i == files.length) {
          // console.log(dirs)
          return
        }
        fs.stat(path.join(pathName, files[i]), function(err, data) {
          if (data.isDirectory()) {
            dirs.push(files[i])
          }
          iterator(i + 1)
        })
      })(0)
    })
  }
}
function addFileWatch() {

}
function addIpcListener() {
  ipcMain.on('file-browser', fileBrowserListener)
}
function addFileWatcher(filename) {
  fileRoot = os.homedir()
  let appDir = os.homedir() + '/test'
  let watcher = null
  try {
    watcher = fs.watch(filename, { persistent: true, recursive: false }, (eventType, filename) => {
      /**
         * 某些平台监视的是文件节点，在被监视的文件被删除时，节点仍在被监视，调用close彻底关闭监视。
         * 此处必须捕获异常，否则当页面被销毁，此处未销毁，会报错。
         * 可以在页面销毁时，同步销毁此处。但是无法获知是否还有其它处监听，用捕获异常来的方便
         */
      try {
        e.reply('file-browser-reply', new Message(fileBrowser, fileBrowser))
      } catch (err) {
        console.log('all renderer page has been destroyed!')
        ipcMain.removeLinstener('file-browser', fileBrowserListener)
      }
    })
  } catch (err) {
    /**
     * 1、若watch的文件不存在会报错。2、被监听的文件被删除，fs.wtach会触发回调。
     * 在 Linux 或 macOS 系统上， fs.watch() 解析路径到索引节点并监视该索引节点。
     * 如果删除并重新创建监视的路径，则会为其分配一个新的索引节点。
     * 监视器会因删除而触发事件，但会继续监视原始的索引节点。 不会因新建索引节点而触发事件。 这是预期的行为。
     */
    console.log('watch filed!')
    wtacher = null
  }
  return watcher
}
function fileBrowserListener(e, { action, data }) {
  fileRoot = os.homedir()
  let appDir = os.homedir() + '/test'
  let watcher = null
  try {
    if (action === 'getFiles') {
      watcher = fs.watch(appDir, { persistent: true, recursive: true }, (eventType, filename) => {
        console.log(filename)
        /**
         * 某些平台监视的是文件节点，在被监视的文件被删除时，节点仍在被监视，调用close彻底关闭监视。
         */
        watcher.close()
        console.log(watcher)
        /**
         * 此处必须捕获异常，否则当页面被销毁，此处未销毁，会报错。
         * 可以在页面销毁时，同步销毁此处。但是无法获知是否还有其它处监听，用捕获异常来的方便
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
    /**
     * 1、若watch的文件不存在会报错。2、被监听的文件被删除，fs.wtach会触发回调。
     * 在 Linux 或 macOS 系统上， fs.watch() 解析路径到索引节点并监视该索引节点。
     * 如果删除并重新创建监视的路径，则会为其分配一个新的索引节点。
     * 监视器会因删除而触发事件，但会继续监视原始的索引节点。 不会因新建索引节点而触发事件。 这是预期的行为。
     */
    console.log('watch filed!')
  }
  return watcher
}
addIpcListener()
