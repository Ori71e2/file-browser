<template>
  <div>
    <h3>File Browser</h3>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
export default {
  name: 'file-browser',
  data() {
    return {
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
      console.log('xx')
      ipcRenderer.on('file-browser-replpy', (e, { action, data }, arg) => {
        console.log(data)
        console.log('xx')
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

</style>
