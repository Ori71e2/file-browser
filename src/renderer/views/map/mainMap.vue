<template>
  <div class="amap-container">
    <div class="amap-wrapper">
      <el-amap :center="initCenter" :zoom="initZoom" :zooms="zooms" :expand-zoom-range="expandZoomRange" vid="amap-vue" class="amap-box">
        <get-amap-instance @set-amap-instance="setAmapInstance"/>
        <get-amap-zoom @set-amap-zoom="setAmapZoom"/>
        <custom-amap-select-poi @set-select-position="setSelectPoi" />
        <custom-amap-searchbox @select="selectSearch" />
      </el-amap>
      <div class="amap-panel">
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
          <el-col :span="4"><amap-limit-lock :amap-instance="amapInstance" /></el-col>
          <el-col :span="4"><amap-tools-control :amap-instance="amapInstance" /></el-col>
          <el-col :span="6"><amap-select-poi :amap-instance="amapInstance" /></el-col>
          <el-col :span="4"><amap-driving-nav :amap-instance="amapInstance" :panel-id="panelId" /></el-col>
          <!-- <el-col :span="4"><amap-geometry :amap-instance="amapInstance" :select-poi="selectPoi" /></el-col> -->
          <el-col :span="4"><amap-marker :amap-instance="amapInstance"/></el-col>
          <el-col :span="4"><amap-line :amap-instance="amapInstance"/></el-col>
        </el-row>
      </div>
      <amap-geolocation :amap-instance="amapInstance" />
      <div ref="drivingNavPanel" class="driving-nav-panel"/>
    </div>
  </div>
</template>

<script>
import getAmapInstance from './components/amap-custom/GetAmapInstance'
import getAmapZoom from './components/amap-custom/GetAmapZoom'
import customAmapSearchbox from './components/amap-custom/Search'
import customAmapSelectPoi from './components/amap-custom/SelectPoi'

import amapToolsControl from './components/amap-panel/AmapToolsControl'
import amapGeolocation from './components/amap-panel/AmapGeolocation'
import amapSelectPoi from './components/amap-panel/AmapSelectPoi'
import amapDrivingNav from './components/amap-panel/AmapDrivingNav'
import amapLimitLock from './components/amap-panel/AmapLimitLock'
// import amapGeometry from './components/amap-panel/AmapGeometry'
import amapMarker from './components/amap-panel/AmapMarker'
import amapLine from './components/amap-panel/AmapLine'
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
if (!window.amap) {
  // 包括center在内的所有属性都不是在这里设置
  VueAMap.initAMapApiLoader({
    resizeEnable: true,
    // 高德key
    key: 'c46f30625ff814b3983110be101fd461',
    v: '1.4.12',
    uiVersion: '1.0.11'
  })
}

export default {
  // 一定要有名字，否则无法缓存
  name: 'MainMap',
  components: {
    customAmapSearchbox, customAmapSelectPoi, getAmapInstance, getAmapZoom, amapToolsControl, amapGeolocation, amapSelectPoi, amapDrivingNav, amapLimitLock, amapMarker, amapLine
  },
  data() {
    return {
      amapInstance: null,
      panelId: '',
      selectPoi: null,
      position: [],
      // 地图初始化使用，将其放大级别扩展到20
      zooms: [1, 20],
      expandZoomRange: true
    }
  },
  computed: {
    initZoom() {
      return this.$store.getters.initZoom
    },
    initCenter() {
      return this.$store.getters.initCenter
    }
  },
  mounted() {
    this.panelId = this.$refs.drivingNavPanel
  },
  methods: {
    setAmapValue() {
    },
    selectSearch(poi) {
      const { location, name, adcode, district, address } = poi
      const center = [location.lng, location.lat]
      this.selectMarker = {
        label: { content: `<div>
          <div>${name}</div>
          <div>${adcode}</div>
          <div>${district}</div>
          <div>${address}</div>
        </div>`,
        offset: [20, 20] },
        position: [...center]
      }
      this.center = center
    },
    setAmapInstance(amap) {
      this.amapInstance = amap
    },
    setAmapZoom(zoom) {
      this.$store.dispatch('setCurrentZoom', zoom)
    },
    setSelectPoi(poi) {
      this.selectPoi = poi
      this.$store.dispatch('setSelectPosition', poi)
    }
  }
}
</script>

<style scoped>
.amap-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* padding: 5px; */
}

.amap-wrapper {
  width: 100%;
  height: 100%;
}

.amap_box {
  width: 100%;
  height: 100%;
}
.custom-componet-input {
  position: absolute;
  width: 100%;
  height: 100%;
}
.tip {
    background-color: #ddf;
    color: #333;
    border: 1px solid silver;
    box-shadow: 3px 4px 3px 0px silver;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    z-index: 99;
}
.tip input {
    height: 25px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
}
.amap-tools-control {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.amap-panel{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
}
.driving-nav-panel {
  position: fixed;
  background-color: white;
  max-height: 70%;
  overflow-y: auto;
  top: 25%;
  right: 1%;
  width: 14.5%;
}
</style>
