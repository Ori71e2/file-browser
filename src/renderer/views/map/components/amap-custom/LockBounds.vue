<template>
  <div />
</template>
<script>
import { createCustomComponent } from 'vue-amap'
const customAmapLockBounds = createCustomComponent({
  name: 'custom-amap-lcok-bounds',
  props: {
    NorthEast: {
      type: Array
      // default: [121.068093, 34.524897]
    },
    Southwest: {
      type: Array
      // default: [117.113014, 32.618797]
    },
    lock: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      bounds: null,
      defaultNorthEast: [119.92045, 34.139673],
      defaultSouthWest: [117.644907, 33.231237],
      setColor: null
    }
  },
  init(options, map) {
    const Southwest = new AMap.LngLat(this.defaultSouthWest[0], this.defaultSouthWest[1])
    const NorthEast = new AMap.LngLat(this.defaultNorthEast[0], this.defaultNorthEast[1])
    // console.log(NorthEast)
    // console.log(Southwest)
    this.bounds = new AMap.Bounds(Southwest, NorthEast)
    this.$amap.setLimitBounds(this.bounds)
    return this.bounds
  },
  contextReady() {
  },
  mounted: () => {
  },
  watch: {
    lock(newValue) {
      if (newValue) {
        this.$amap.setLimitBounds(this.bounds)
      } else {
        this.$amap.clearLimitBounds()
        // console.log(this.bounds)
      }
    }
  },
  methods: {
  }
})
export default customAmapLockBounds
</script>
<style>

</style>
