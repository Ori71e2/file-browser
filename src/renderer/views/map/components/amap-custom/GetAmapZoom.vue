<template>
  <div/>
</template>
<script>
import { createCustomComponent } from 'vue-amap'
const getAmapZoom = createCustomComponent({
  name: 'get-amap-zoom',
  data() {
    return {
      amap: null,
      amapZoom: 0,
      marker: null
    }
  },
  init(options, map) {
    this.amap = this.$amap
    this.zoomEndListener = AMap.event.addListener(this.$amap, 'zoomchange', function() {
      this.amapZoom = this.amap.getZoom()
      this.$emit('set-amap-zoom', this.amapZoom)
    }, this)
    return this.zoomEndListener
  },
  mounted: () => {
  },
  contextReady() {
  }
})
export default getAmapZoom
</script>
