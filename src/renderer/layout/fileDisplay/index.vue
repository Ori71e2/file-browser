<template>
  <div class="custom-tree-container">
    <div>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Message from '@/../utils/message.js'
const path = require('path')
let id = 1000
export default {
  name: 'file-browser',
  data() {
    const data = [{
      id: 1,
      label: '一级 111111111111111111111111111111111111111',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      pathInfo: '',
      data: JSON.parse(JSON.stringify(data))
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
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  & div {
    // 在父级div宽度较小时，子级div自动撑开内容，且显示滚动条
    // 在父级div宽度较大且能完全容纳子级div时，子级div宽度与父级一致
    display: inline-block;
    min-width: 100%;
    // height: 100%;
    min-height: 100%;
  }
}
.custom-tree-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>
