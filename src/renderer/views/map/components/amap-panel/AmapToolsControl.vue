<template>
  <div>
    <div>
      <custom-amap-scale-control :show-scale="showScale" />
      <custom-amap-tool-bar-control :show-tool-bar="showToolBar" :show-tool-bar-direction="showToolBarDirection" :show-tool-bar-ruler="showToolBarRuler"/>
      <custom-amap-over-view-control :show-over-view="showOverView" :open-over-view="openOverView"/>
    </div>
    <el-popover placement="top" trigger="hover">
      <el-checkbox-group v-model="checkedToolsList">
        <el-checkbox label="比例尺" @change="toggleScale"/>
        <el-checkbox label="工具条" @change="toggleToolBar"/>
        <el-checkbox :disabled="toolBarDirectionDisable" label="工具条方向盘" @change="toggleToolBarDirection"/>
        <el-checkbox :disabled="toolBarRulerDisable" label="工具条标尺" @change="toggleToolBarRuler"/>
        <el-checkbox :disable="overViewShowDisable" label="显示鹰眼" @change="toggleOverViewShow"/>
        <el-checkbox :disabled="overViewOpenDisable" label="展开鹰眼" @change="toggleOverViewOpen"/>
      </el-checkbox-group>
      <el-button slot="reference" type="primary">控件<i class="el-icon-arrow-up el-icon--right"/></el-button>
    </el-popover>
  </div>
</template>

<script>
/* eslint-disable */
import customAmapScaleControl from '../amap-custom/ScaleControl'
import customAmapToolBarControl from '../amap-custom/ToolBarControl'
import customAmapOverViewControl from '../amap-custom/OverViewControl'
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
// import CONSTANTS from '../utils/constant'
export default {
  components: {
    customAmapScaleControl,
    customAmapToolBarControl,
    customAmapOverViewControl
  },
  mixins: [spreadAmapInstance],
  data() {
    return {
      map: "",
      AMap: "",
      checkedToolsList: [], // 所有字段都是必须的，否则没法勾选

      showScale: false,
      showToolBar: false,
      showToolBarDirection: false,
      showToolBarRuler: false,
      showOverView: false,
      openOverView: false,

      toolBarDirectionDisable: true,
      toolBarRulerDisable: true,
      overViewShowDisable: false,
      overViewOpenDisable: true
    }
  },
  mounted() {

  },
  methods: {
    toggleScale() {
      this.showScale = !this.showScale
    },
    toggleOverViewShow() {
      this.showOverView = !this.showOverView
      if (this.showOverView) {
        this.overViewOpenDisable = false
      } else {
        this.overViewOpenDisable = true
      }
    },
    toggleOverViewOpen() {
      this.openOverView = !this.openOverView
    },
    toggleToolBar() {
      // console.log("toolBar" + this.showToolBar)
      // console.log(this.checkedToolsList)
      this.showToolBar = !this.showToolBar
      if (this.showToolBar) {
        this.showToolBarDirection = true
        this.showToolBarRuler = true
        this.setToolBarCheckState()
        this.setToolBarDirectioCheckState()
        this.setToolBarRulerCheckState()
      } else {
        this.showToolBarDirection = false
        this.showToolBarRuler = false
        this.hideToolBar()
        this.hideToolBarDirection()
        this.hideToolBarRuler()
      }
    },
    toggleToolBarRuler() {
      this.showToolBarRuler = !this.showToolBarRuler
    },
    toggleToolBarDirection() {
      this.showToolBarDirection = !this.showToolBarDirection
    },
    setToolBarCheckState() {
      this.toolBarDirectionDisable = false
      this.toolBarRulerDisable = false
    },
    hideToolBar() {
      this.toolBarDirectionDisable = true
      this.toolBarRulerDisable = true
    },
    setToolBarDirectioCheckState() {
      if (!this.checkedToolsList.includes("工具条方向盘")) {
        this.checkedToolsList.push("工具条方向盘")
      }
    },
    hideToolBarDirection() {
      if (this.checkedToolsList.includes("工具条方向盘")) {
        this.checkedToolsList.splice(this.checkedToolsList.findIndex(item => item == "工具条方向盘"), 1)
      }
    },
    setToolBarRulerCheckState() {
      if (!this.checkedToolsList.includes("工具条标尺")) {
        this.checkedToolsList.push("工具条标尺")
      }
    },
    hideToolBarRuler() {
      if (this.checkedToolsList.includes("工具条标尺")) {
        this.checkedToolsList.splice(this.checkedToolsList.findIndex(item => item == "工具条标尺"), 1)
      }
    }
  }
};
</script>
<style scoped>
.el-icon-arrow-down {
  font-size: 12px;
}
</style>