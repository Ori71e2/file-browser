<template>
  <div>
    <div v-if="show">
      <el-amap-marker
        v-for="[key, marker] of markersIconMap.entries()"
        :key="key"
        :z-index="trigger"
        :position="markersMap.get(key).position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :clickable="marker.clickable"
        :ext-data="key"
        :vid="key"
        :content-render="marker.contentRender"
      />
    </div>
    <div>
      <el-button slot="reference" type="primary" @click="addMarker">
        添加<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </div>
  </div>
</template>
<script>
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
// import lineMarkerExp from '../transmission-line/LineMarkerExp'

export default {
  components: {
    // lineMarkerExp
  },
  mixins: [spreadAmapInstance],

  data() {
    return {
      markersIconMap: new Map(),
      change: false,
      show: true
    }
  },
  computed: {
    trigger() {
      return this.change ? 100 : 99
    },
    markersMapUpdate() {
      return this.$store.getters.markersMapUpdate
    },
    markersMapAdd() {
      return this.$store.getters.markersMapAdd
    },
    // 由于vue2.X无法响应map变化，使用一个key触发更新
    markersMap() {
      /* eslint-disable */
      const trigger = this.$store.getters.markersMapUpdate
      return this.$store.getters.markersMap 
    },
    zoom() {
      return this.$store.getters.currentZoom
    }
  },
  watch: {
    markersMapAdd (newValue, oldValue) {
      this.generateMarkersIcon()
    },
    markersMapUpdate(newValue, oldValue) {
      this.change = !this.change
    }
  },
  mounted() {
    this.generateMarkersIcon()
  },
  activated() {

  },
  methods: {
    addMarker() {
    },
    generateMarkersIcon() {
      // 只添加新增的id,对于其他数据有变化的不进行更新
      if (this.markersMap.size !== 0) {
        this.markersMap.forEach((value, key, map) => {
          if (!this.markersIconMap.has(key)) {
            this.markersIconMap.set(key, this.markerRawToRipe(value))
          }
        })
      }
      // console.log('markersIconMap')
      // console.log(this.markersIconMap)
      this.show = false
      this.show = true
    },
    markerRawToRipe(v) {
      const { id } = v
      // marker选项，仅id和position是来着store
      const options = {
        id,
        clickable: true,
        visible: true,
        draggable: false
      }
      options.events = {
        click: (e) => {
          console.log('click marker')
          // 反序列化
          console.log(e.target.getExtData())
        },
        dblclick: (e) => {
          // const draggable = e.target.getDraggable()
          const id = e.target.getExtData()
          const options = this.markersIconMap.get(id)
          options.draggable = !options.draggable
          this.markersIconMap.set(id, options)
          this.change = !this.change
        },
        rightclick: (e) => {
          this.changemarkersRaw()
        },
        dragend: (e) => {
          // console.log('---event---: dragend')
          // position的变化涉及两处变化同步变更及一处网络更新
          const id = e.target.getExtData()
          const position = [e.lnglat.lng, e.lnglat.lat]

          // 设置markersMap
          const value = this.markersMap.get(id)
          value.position = position
          this.$store.dispatch('amap/setMarkersMap', value)
          this.$store.dispatch('amap/setMarkersMapUpdate')
        }
      }
      options.contentRender = (h, instance) => {
        return h(
          // 一定要给lineMarkerExp设置大小，否则无法方便点击和拖拽
          lineMarkerExp,
          {
            props: { change: this.change, id: id, zoom: this.zoom, svgIconCode: this.markersMap.get(id).SICCode, 'voltage-class': 110, draggable: this.markersIconMap.get(id).draggable }
          }
        )
      }
      return options
    }
  }
}
</script>
<style scoped>

</style>
