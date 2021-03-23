<template>
  <div />
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customAmapToolBarControl = createCustomComponent({
  props: {
    showToolBar: {
      Boolean,
      default: false
    },
    showToolBarDirection: {
      Boolean,
      default: false
    },
    showToolBarRuler: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      toolBar: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      AMap.plugin(['AMap.ToolBar'], () => {
        this.toolBar = new AMap.ToolBar({
          visible: false
        })
        this.$amap.addControl(this.toolBar)
        resolve(this.toolBar)
      })
    })
  },
  contextReady() {
  },
  handlers: {
    showToolBar(newValue, oldValue) {
      if (newValue) {
        this.show()
      } else {
        this.hide()
      }
    },
    showToolBarDirection(newValue, oldValue) {
      if (newValue) {
        this.showDirection()
      } else {
        this.hideDirection()
      }
    },
    showToolBarRuler(newValue, oldValue) {
      if (newValue) {
        this.showRuler()
      } else {
        this.hideRuler()
      }
    }
  },
  created: () => {
  },
  mounted: () => {
  }
})

export default customAmapToolBarControl
</script>
