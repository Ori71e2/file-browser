<template>
  <div />
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customAmapOverViewControl = createCustomComponent({
  name: 'custom-amap-overview-control',
  props: {
    showOverView: {
      Boolean,
      default: false
    },
    openOverView: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      overView: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      AMap.plugin(['AMap.OverView'], () => {
        this.overView = new AMap.OverView({
          visible: false
        })
        this.$amap.addControl(this.overView)
        resolve(this.overView)
      })
    })
  },
  contextReady() {
  },
  handlers: {
    showOverView(newValue, oldValue) {
      if (newValue) {
        this.show()
      } else {
        this.hide()
      }
    },
    openOverView(newValue, oldValue) {
      if (newValue) {
        this.open()
      } else {
        this.close()
      }
    }
  },
  created: () => {
  },
  mounted: () => {
  }
})

export default customAmapOverViewControl
</script>
