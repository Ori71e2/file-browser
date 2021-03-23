<template>
  <div>
    <el-popover placement="top" trigger="hover">
      <div>
        <el-row :gutter="10" type="flex" class="row-bg" justify="space-around">
          <el-col :span="4">
            <el-switch :inactive-value="true" :active-value="false" v-model="activeSelectPoi" active-color="#dcdcdc" inactive-color="#13ce66" inactive-text="选点" class="el-switch"/>
          </el-col>
          <el-col :span="7"><el-input v-model="positionX" placeholder="请输入内容"/></el-col>
          <el-col :span="7"><el-input v-model="positionY" placeholder="请输入内容"/></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleCopy">复制</el-button></el-col>
          <el-col :span="4"><el-button type="danger" @click="toggleMove">移动</el-button></el-col>
        </el-row>
      </div>
      <el-button slot="reference" type="primary">
        选点定位<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  mixins: [spreadAmapInstance],
  data() {
    return {
      activeSelectPoi: false,
      copyBoard: '',
      // 这样设置，保证引入时不会触发setZoom, setCenter
      amapZoom: -1,
      amapCenter: '',
      positionX: null,
      positionY: null
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
        this.positionX = null
        this.positionY = null
      }
    },
    positionx(newValue) {
      this.positionX = this.activeSelectPoi ? newValue : null
    },
    positiony(newValue) {
      this.positionY = this.activeSelectPoi ? newValue : null
    }
  },
  mounted() {
  },
  methods: {
    toggleSelectPoi(newValue) {
      if (newValue) {
        this.activeSelectPoi = !this.activeSelectPoi
      }
    },
    toggleCopy() {
      this.copyBoard = [this.positionX, this.positionY]
      this.$copyText(this.copyBoard).then(function(e) {
        console.log(e)
      }, function(e) {
        console.log(e)
      })
    },
    toggleMove() {
      this.$store.dispatch('setInitCenter', this.selectPosition)
    }
  }
}
</script>
<style scoped>
.el-icon-arrow-down {
  font-size: 12px;
}
.el-switch {
  top: 50%;
  transform: translate(0,-50%);
}
</style>
