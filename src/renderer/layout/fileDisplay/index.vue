<template>
  <div class="path">
    <!-- <h3>File Browser</h3> -->
    <span>{{ pathInfo }}</span>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
const path = require('path')
export default {
  name: 'file-browser',
  data() {
    return {
      pathInfo: ''
    }
  },
  mounted() {
    this.addIpcListener()
    this.fileBrowser('getFiles')
  },
  computed: {
  },
  methods: {
    fileBrowser(menuType) {
      ipcRenderer.send('file-browser', new Message(menuType, ''))
    },
    addIpcListener() {
      ipcRenderer.on('file-browser-reply', (e, { action, data }) => {
        console.log('data: ' + data)
        this.pathInfo = data.split(path.sep)
        this.pathInfo = data
        // if (action === 'maximize') {
        //   this.isMaximize = true
        //   console.log(action)
        // } else {
        //   this.isMaximize = false
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.path {
  width: 100%;
  height: 100%;
}
</style>
