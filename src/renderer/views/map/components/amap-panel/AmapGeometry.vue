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
          <el-col :span="4"><el-button type="primary" @click="toggleCompute">计算</el-button></el-col>
          <el-col :span="4"><el-button type="primary" @click="toggleShowLabel">显示标记</el-button></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
          <el-col :span="2"><div class="tag"><el-tag type="success">起点Y</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="originY" placeholder="请输入内容"/></el-col>
          <el-col :span="2"><div class="tag"><el-tag type="warning">终点Y</el-tag></div></el-col>
          <el-col :span="7"><el-input v-model.number="destinationY" placeholder="请输入内容"/></el-col>
          <el-col :span="6"><el-switch :inactive-value="true" :active-value="false" v-model="switchPoi" active-color="#ff4949" inactive-color="#13ce66" active-text="终点" inactive-text="起点" class="el-switch" /></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleClearResult">取消</el-button></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleHideLabel">隐藏标记</el-button></el-col>
        </el-row>
      </div>
      <el-button slot="reference" type="primary">
        计算<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </el-popover>
    <geometry-amap-distance :origin="origin" :destination="destination" :label-show="labelShow" :compute="compute" />
    <el-amap-marker :position="origin" :visible="originShow" :draggable="true" :events="originEvents" vid="origin-marker" />
    <el-amap-marker :position="destination" :destination="destinationShow" :draggable="true" :events="destinationEvents" vid="destination-marker" />
  </div>
</template>

<script>
import geometryAmapDistance from '../amap-geometry-util/Distance'
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
export default {
  components: {
    geometryAmapDistance
  },
  mixins: [spreadAmapInstance],
  props: {
    'selectPoi': {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // origin: null,
      // destination: null,
      originShow: false,
      destinationShow: false,
      originX: null,
      originY: null,
      destinationX: null,
      destinationY: null,
      labelShow: '',
      activeSelectPoi: false,
      switchPoi: true,
      compute: false,
      originEvents: {
        dragend: (event) => {
          console.log('dragend')
          this.setOrigin(event)
        }
      },
      destinationEvents: {
        dragend: (event) => {
          this.setDestination(event)
        }
      }
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
    toggleCompute() {
      if (this.originX && this.originY && this.destinationX && this.destinationY) {
        this.labelShow = true
        this.originShow = true
        this.destinationShow = true
        this.compute = !this.compute
      }
    },
    toggleClearResult() {
      this.originX = null
      this.originY = null
      this.destinationX = null
      this.destinationY = null
      this.labelShow = false
      this.originShow = false
      this.destinationShow = false
    },
    toggleShowLabel() {
      this.labelShow = true
    },
    toggleHideLabel() {
      this.labelShow = false
    },
    setOrigin(event) {
      // this.originX = event.lnglat.getLng()
      // this.originY = event.lnglat.getLat()
      this.origin = [event.lnglat.getLng(), event.lnglat.getLat()]
    },
    setDestination(event) {
      // this.destinationX = event.lnglat.getLng()
      // this.destinationY = event.lnglat.getLng()
      this.destination = [event.lnglat.getLng(), event.lnglat.getLat()]
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
