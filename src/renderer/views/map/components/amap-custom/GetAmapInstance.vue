<template>
  <div/>
</template>
<script>
import { createCustomComponent } from 'vue-amap'
const getAmapInstance = createCustomComponent({
  name: 'get-amap-instance',
  data() {
    return {
      amap: null,
      marker: null
    }
  },
  init(options, map) {
    this.marker = new AMap.Marker({
      position: [0, 0]
    })
    this.amap = this.$amap
    this.$emit('set-amap-instance', this.amap)
    return this.marker
  },
  mounted: () => {
  },
  contextReady() {
  }
})
export default getAmapInstance
</script>
