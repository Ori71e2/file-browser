<template>
  <div id="drawing"/>
</template>

<script>
import { createCustomComponent } from 'vue-amap'
import SVG from 'svg.js'
const customMapSvgJs = createCustomComponent({
  data() {
    return {
      svg: null,
      svgDraw: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      window.AMap.plugin('AMap.CustomLayer', () => {
        var size = this.$amap.getSize()
        // console.log('SvgJs 1')
        var draw = SVG('drawing').size(size.width, size.height)
        // console.log(draw)
        this.svgCanvas = draw
        // 使用draw.node获取svg元素
        // 图层之间的层级决定事件是否会被捕获
        var customLayer = new window.AMap.CustomLayer(draw.node, { zIndex: 300 })
        // console.log('svgjs customLayer')
        // console.log(customLayer)
        customLayer.render = this.onRender
        this.$amap.add(customLayer)

        draw.rect(10, 300).attr({ fill: '#f06' }).on('click', function() {
          console.log('svg rect1 clicked')
        })
        draw.rect(300, 20).attr({ fill: '#f56' }).click(function() {
          console.log('svg rect2 clicked')
        })
        resolve(this.customLayer)
      })
    })
  },
  contextReady() {
  },
  created: () => {
  },
  mounted: () => {
  },
  methods: {
    onRender() {

    },
    buildPath() {

    }
  }
})

export default customMapSvgJs
</script>
