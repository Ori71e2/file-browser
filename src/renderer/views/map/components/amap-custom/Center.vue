<template>
  <div />
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customAmapCenter = createCustomComponent({
  name: 'custom-amap-center',
  props: {
    'zoom': {
      type: Number,
      default: -1
    },
    'center': {
      default: {
        X: -200,
        Y: -100
      }
    }
  },
  data() {
    return {
    }
  },
  init(options, map) {
    this.marker = new AMap.Marker({
      position: [0, 0]
    })
    return this.marker
  },
  contextReady() {
  },
  watch: {
    zoom(newValue, oldValue) {
      if (newValue > 0) {
        this.$amap.setZoom(Math.ceil(newValue))
      }
    },
    center(newValue, oldValue) {
      var poiX = newValue.X
      var poiY = newValue.Y
      if (poiX && poiY && poiX >= -180 && poiX <= 180 && poiY >= -90 && poiY <= 90) {
        this.$amap.setCenter([poiX, poiY])
      }
    }
  }
})

export default customAmapCenter
</script>
