<template>
  <div/>
</template>

<script>
import { createCustomComponent } from 'vue-amap'
const customAmapDrivingNav = createCustomComponent({
  props: {
    originX: {
      type: Number
    },
    originY: {
      type: Number
    },
    destinationX: {
      type: Number
    },
    destinationY: {
      type: Number
    },
    panelId: {
      // 此处只能将这两种类型同时写上，否则报错
      type: String | HTMLDivElement,
      default: null
    },
    panelShow: {
      type: Boolean,
      default: true
    },
    drivingSearch: {
      type: Boolean,
      default: false
    },
    drivingClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      panelDrivingNavElement: '',
      origin: {
        'X': 0,
        'Y': 0
      },
      destination: {
        'X': 0,
        'Y': 0
      },
      drivingNav: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      // console.log(this.panelId)
      AMap.plugin(['AMap.Driving'], () => {
        this.drivingNav = new AMap.Driving({
          map: this.$amap,
          panel: this.panelId
        })
        this.panelDrivingNavElement = this.panelId
        resolve(this.drivingNav)
      })
    })
  },
  contextReady() {
  },
  mounted() {
  },
  handlers: {

  },
  methods: {
  },
  watch: {
    originX(value) {
      console.log(this.panelDrivingNavElement)
      this.origin.X = value
    },
    originY(value) {
      this.origin.Y = value
    },
    destinationX(value) {
      this.destination.X = value
    },
    destinationY(value) {
      this.destination.Y = value
    },
    panelShow(value) {
      if (value) {
        this.panelDrivingNavElement.hidden = true
      } else {
        this.panelDrivingNavElement.hidden = false
      }
    },
    drivingSearch(value) {
      // 根据起终点经纬度规划驾车导航路线
      // LngLat()函数自动将经度修正到 [-180,180] 区间内
      this.drivingNav.search(new AMap.LngLat(this.origin.X, this.origin.Y), new AMap.LngLat(this.destination.X, this.destination.Y, false))
    },
    drivingClear(value) {
      this.drivingNav.clear()
    }
  }
})
export default customAmapDrivingNav
</script>
