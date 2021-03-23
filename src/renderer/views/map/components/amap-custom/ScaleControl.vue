<template>
  <div />
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customAmapScaleControl = createCustomComponent({
  name: 'custom-amap-scale-control',
  props: {
    showScale: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      scale: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      AMap.plugin(['AMap.Scale'], () => {
        this.scale = new AMap.Scale({
          visible: false
        })
        this.$amap.addControl(this.scale)
        resolve(this.scale)
      })
    })
  },
  contextReady() {
  },
  handlers: {
    showScale(newValue, oldValue) {
      if (newValue) {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  created: () => {
  },
  mounted: () => {
  }
})

export default customAmapScaleControl
</script>
