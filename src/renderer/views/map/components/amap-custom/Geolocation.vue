<template>
  <div/>
</template>

<script>
import { createCustomComponent } from 'vue-amap'
const customAmapGeolocation = createCustomComponent({
  name: 'custom-amap-geolocation',
  props: {
    showMarker: {
      type: Boolean,
      default: true
    },
    markerContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      geolocation: null
      // markerContent: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      AMap.plugin(['AMap.Geolocation'], () => {
        /*
        var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
        })
        */
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          convert: true,
          showButton: true,
          buttonPosition: 'LB',
          buttonOffset: new AMap.Pixel(20, 60),
          showMarker: true,
          // markerOptions: {},
          showCircle: true,
          panToLocation: false,
          zoomToAccuracy: false
        })
        this.$amap.addControl(this.geolocation)
        this.geolocation.getCurrentPosition()
        // 返回定位信息
        AMap.event.addListener(this.geolocation, 'complete', this.onGeolocationComplete)
        // 返回定位出错信息
        AMap.event.addListener(this.geolocation, 'error', this.onGeolocationError)
        resolve(this.geolocation)
      })
    })
  },
  mounted() {
  },
  contextReady() {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onGeolocationComplete(data) {
      this.$emit('set-current-location', data)
    },
    onGeolocationError(data) {
      this.$emit('set-current-location', data)
    }
  }
})
export default customAmapGeolocation
</script>
