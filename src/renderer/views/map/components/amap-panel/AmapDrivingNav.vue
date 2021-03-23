<template>
  <div>
    <el-popover placement="top" trigger="hover">
      <div>
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
          <el-col :span="2"><div><el-tag type="success">起点X</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="originX" placeholder="请输入内容"/></el-col>
          <el-col :span="2"><div><el-tag type="warning">终点X</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="destinationX" placeholder="请输入内容"/></el-col>
          <el-col :span="6"><el-switch :inactive-value="true" :active-value="false" v-model="activeSelectPoi" active-color="#dcdcdc" inactive-color="#13ce66" inactive-text="选点" class="el-switch" /></el-col>
          <el-col :span="4"><el-button type="primary" @click="toggleDrivingSearch">开始规划</el-button></el-col>
          <el-col :span="4"><el-button type="primary" @click="toggleDispalyDrivingNavPanel">显示文字</el-button></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
          <el-col :span="2"><div class="tag"><el-tag type="success">起点Y</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="originY" placeholder="请输入内容"/></el-col>
          <el-col :span="2"><div class="tag"><el-tag type="warning">终点Y</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="destinationY" placeholder="请输入内容"/></el-col>
          <el-col :span="6"><el-switch :inactive-value="true" :active-value="false" v-model="switchPoi" active-color="#ff4949" inactive-color="#13ce66" active-text="终点" inactive-text="起点" class="el-switch" /></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleClearDrivingSearch">取消规划</el-button></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleHideDrivingNavPanel">隐藏文字</el-button></el-col>
        </el-row>
      </div>
      <el-button slot="reference" type="primary">
        号航<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </el-popover>
    <custom-amap-driving-nav :origin-x="originX" :origin-y="originY" :destination-x="destinationX" :destination-y="destinationY" :panel-show="panelShow" :driving-search="drivingSearch" :driving-clear="drivingClear" :panel-id="panelId" />
  </div>
</template>

<script>
import customAmapDrivingNav from '../amap-custom/DrivingNav'
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
export default {
  components: {
    customAmapDrivingNav
  },
  mixins: [spreadAmapInstance],
  /* eslint-disable */
  props: {
    'panelId': {
      // 此处只能将这两种类型同时写上，否则报错
      type: String | HTMLDivElement,
      default: null
    }
  },
  data() {
    return {
      originX: null,
      originY: null,
      destinationX: null,
      destinationY: null,
      panelShow: '',
      drivingSearch: false,
      drivingClear: false,
      activeSelectPoi: false,
      switchPoi: true
    }
  },
  computed: {
    selectPosition() {
      return this.$store.getters.selectPosition
    },
    positionx() {
      return this.selectPosition[0]
    },
    positiony() {
      return this.selectPosition[1]
    }
  },
  watch: {
    activeSelectPoi(newValue) {
      if (!newValue) {
        this.originX = null
        this.originY = null
        this.destinationX = null
        this.destinationY = null
      }
    },
    positionx(newValue) {
      this.originX = this.activeSelectPoi ? (this.switchPoi ? newValue : this.originX) : null
      this.destinationX = this.activeSelectPoi ? (!this.switchPoi ? newValue : this.destinationX) : null
    },
    positiony(newValue) {
      this.originY = this.activeSelectPoi ? (this.switchPoi ? newValue : this.originY) : null
      this.destinationY = this.activeSelectPoi ? (!this.switchPoi ? newValue : this.destinationY) : null
    }
  },
  mounted() {
  },
  methods: {
    toggleDrivingSearch() {
      this.drivingSearch = !this.drivingSearch
    },
    toggleClearDrivingSearch() {
      this.drivingClear = !this.drivingClear
    },
    toggleHideDrivingNavPanel() {
      this.panelShow = true
    },
    toggleDispalyDrivingNavPanel() {
      this.panelShow = false
    }
  }
}
</script>
<style scoped>
.panelMapNav {
  position: fixed;
  background-color: white;
  max-height: 70%;
  overflow-y: auto;
  top: -20px;
  right: 10px;
  width: 280px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.position-float-left {
  float: left;
}
.position-float-none {
  float: none;
}
.el-switch {
  top: 50%;
  transform: translate(0,-50%);
}
</style>
