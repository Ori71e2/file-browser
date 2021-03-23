<template>
  <div />
</template>
<script>
import { createCustomComponent } from 'vue-amap'
const customAmapLimitDispaly = createCustomComponent({
  name: 'custom-amap-limit-display',
  props: {
    opacity: {
      type: Number,
      default: 0.65
    },
    color: {
      type: String,
      default: '#000000'
    }
  },
  data() {
    return {
      districtExplorer: null,
      polygon: null,
      marker: null
    }
  },
  init(options, map) {
    return new Promise(resolve => {
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        this.districtExplorer = new DistrictExplorer({
          map: map
        })
        this.initPage()
        this.marker = new AMap.Marker({
          position: [121.59996, 31.177646]
        })
        this.amap = this.$amap
        // 不能resolve出districtExplorer，不是高德地图实例
        // 此处也不能resolve(this.polygon),会有一个bug,目前推断为polygon属性setOptions与vue-amap有冲突
        // resolve(this.districtExplorer)
        // resolve(this.polygon)
        resolve(this.marker)
      })
    })
  },
  contextReady() {
  },
  watch: {
    color(newValue, oldValue) {
      console.log(this.polygon)
      const polygonOptions = this.polygon.getOptions()
      polygonOptions.fillColor = newValue
      this.polygon.setOptions(polygonOptions)
    },
    opacity(newValue, oldValue) {
      if (newValue >= 0 && newValue <= 1) {
        const polygonOptions = this.polygon.getOptions()
        polygonOptions.fillOpacity = newValue
        this.polygon.setOptions(polygonOptions)
      }
    }
  },
  mounted: () => {
  },
  methods: {
    initPage() {
      var countryCode = 100000
      // var provCodes = [
      //   // 江苏省
      //   320000
      // ]
      var cityCodes = [
        // 宿迁市
        321300
      ]
      var countyCodes = [
        // 泗阳县
        321323
      ]
      this.districtExplorer.loadMultiAreaNodes(
        // 只需加载全国和市，全国的节点包含省级
        [countryCode].concat(cityCodes),
        (error, areaNodes) => {
          if (error) {
            return
          }
          var countryNode = areaNodes[0]
          var cityNodes = areaNodes.slice(1)
          var path = []
          // 首先放置背景区域，这里是大陆的边界
          path.push(this.getLongestRing(countryNode.getParentFeature()))
          // for (let i = 0, len = provCodes.length; i < len; i++) {
          //   // 逐个放置需要镂空的省级区域
          //   path.push.apply(path, this.getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])))
          // }
          // for (let i = 0, len = cityNodes.length; i < len; i++) {
          //   // 逐个放置需要镂空的市级区域
          //   path.push.apply(path, this.getAllRings(cityNodes[i].getParentFeature()))
          // }
          for (let i = 0, len = cityNodes.length; i < len; i++) {
            // 逐个放置需要镂空的县级区域
            path.push.apply(path, this.getAllRings(cityNodes[i].getSubFeatureByAdcode(countyCodes[i])))
          }
          // 绘制带环多边形
          // https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
          this.polygon = new AMap.Polygon({
            bubble: true,
            lineJoin: 'round',
            strokeColor: 'red', // 线颜色
            strokeOpacity: 1, // 线透明度
            strokeWeight: 1, // 线宽
            fillColor: 'black', // 填充色
            fillOpacity: 0.65, // 填充透明度
            map: this.$amap,
            path: path
          })
        }
      )
    },
    getAllRings(feature) {
      var coords = feature.geometry.coordinates
      // console.log('coords')
      // console.log(coords)
      var rings = []
      for (let i = 0, len = coords.length; i < len; i++) {
        rings.push(coords[i][0])
      }
      // console.log('rings')
      // console.log(rings)
      return rings
    },
    getLongestRing(feature) {
      var rings = this.getAllRings(feature)
      rings.sort(function(a, b) {
        return b.length - a.length
      })
      // console.log('rings[0]')
      // console.log(rings[0])
      return rings[0]
    }
  }
})
export default customAmapLimitDispaly
</script>
<style>

</style>
