<template>
  <div/>
</template>

<script>
import { createCustomComponent } from 'vue-amap'
const geometryAmapDistance = createCustomComponent({
  name: 'geometry-amap-distance',
  props: {
    origin: {
      type: Array,
      default: () => {
        return [0, 0]
      }
    },
    destination: {
      type: Array,
      default: () => {
        return [0, 0]
      }
    },
    labelShow: {
      type: Boolean,
      default: false
    },
    compute: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      line: null,
      text: null,
      distance: 0,
      path: null
      // offset: null
    }
  },
  init(options, map) {
    this.path = [[this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]]
    this.line = new AMap.Polyline({
      map: this.showLabel ? this.$amap : null,
      strokeColor: '#80d8ff',
      isOutline: true,
      outlineColor: 'white',
      path: this.path
    })
    const textPos = []
    textPos[0] = (this.origin[0] + this.destination[0]) / 2
    textPos[1] = (this.origin[1] + this.destination[1]) / 2
    const position = new AMap.LngLat(textPos[0], textPos[1])
    // console.log(position)
    this.text = new AMap.Text({
      text: this.distance + '米',
      position: position,
      map: this.showLabel ? this.$amap : null,
      style: {
        'background-color': '#29b6f6',
        'border-color': '#e1f5fe',
        'font-size': '12px',
        'opacity': 0.8
      }
    })
    this.distance = AMap.GeometryUtil.distance([this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]])
    return this.line
  },
  watch: {
    origin(value) {
      this.path = [[this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]]
      this.distance = AMap.GeometryUtil.distance([this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]).toFixed(3)
      console.log('distance' + this.distance)
      this.line.setPath(this.path)

      const textPos = []
      textPos[0] = (this.origin[0] + this.destination[0]) / 2
      textPos[1] = (this.origin[1] + this.destination[1]) / 2
      const position = new AMap.LngLat(textPos[0], textPos[1])
      this.text.setPosition(position)
      this.text.setText(this.distance + '米')
    },
    destination(value) {
      this.path = [[this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]]
      this.distance = AMap.GeometryUtil.distance([this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]).toFixed(3)
      console.log('distance' + this.distance)
      this.line.setPath(this.path)

      const textPos = []
      textPos[0] = (this.origin[0] + this.destination[0]) / 2
      textPos[1] = (this.origin[1] + this.destination[1]) / 2
      const position = new AMap.LngLat(textPos[0], textPos[1])
      this.text.setPosition(position)
      this.text.setText(this.distance + '米')
    },
    labelShow(value) {
      this.line.setMap(value ? this.$amap : null)
      this.text.setMap(value ? this.$amap : null)
    },
    compute(value) {
      this.distance = AMap.GeometryUtil.distance([this.origin[0], this.origin[1]], [this.destination[0], this.destination[1]]).toFixed(3)
      console.log('distance' + this.distance)
    }
  },
  mounted() {
  },
  contextReady() {
  },
  methods: {
  }
})
export default geometryAmapDistance
</script>
