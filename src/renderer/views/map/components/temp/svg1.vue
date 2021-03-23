<template>
  <div/>
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customMapSvg = createCustomComponent({
  data() {
    return {
      svg: null,
      path: null,
      svgDraw: null
    }
  },
  init(options, map) {
    // console.log('svg init')

    return new Promise(resolve => {
      window.AMap.plugin('AMap.CustomLayer', () => {
        var size = this.$amap.getSize()

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.svgDraw = svg
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        svg.setAttribute('width', size.width)
        svg.setAttribute('height', size.height)

        var customLayer = new window.AMap.CustomLayer(svg, { zIndex: 200 })

        // console.log('svg customLayer')
        // console.log(this.customLayer)
        // 必须提供重绘函数，否则会出现不同步现象
        customLayer.render = this.onRender
        this.$amap.add(customLayer)

        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.path.onclick = function() {
          console.log('svg path clicked')
        }

        var styleText = []
        styleText.push('stroke:red')
        styleText.push('fill:green')
        styleText.push('fill-opacity:0.3')
        this.path.style.cssText = styleText.join(';')

        svg.appendChild(this.path)

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
      var newPath = this.buildPath()
      this.path.setAttribute('d', newPath)
    },
    buildPath() {
      var path = []
      var center = this.$amap.lngLatToContainer([118.716184, 33.720615])

      for (var k = 0; k < 6; k += 1) {
        var ag = Math.PI * 60 / 180 * k
        var x = center.x + Math.cos(ag) * 50
        var y = center.y + Math.sin(ag) * 50
        path.push((k === 0 ? 'M' : 'L') + x + ' ' + y)
      }
      return path.join(' ') + ' Z'
    }
  }
})

export default customMapSvg
</script>
