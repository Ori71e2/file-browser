<template>
  <div>
    <el-popover placement="top" trigger="hover">
      <div>
        <el-row :gutter="10" type="flex" class="row-bg" justify="space-around">
          <el-col>
            <sketch-color-picker v-model="colors" :preset-colors="presetColors" />
          </el-col>
          <el-col >
            <el-switch :inactive-value="true" :active-value="false" v-model="lockBounds" active-color="#dcdcdc" inactive-color="#13ce66" inactive-text="开启视图限制" class="el-switch" />
          </el-col>
        </el-row>
      </div>
      <el-button slot="reference" type="primary">
        视图<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </el-popover>
    <custom-amap-limit-display :color="colors.hex" :opacity="colors.a" />
    <custom-amap-lock-bounds :lock="lockBounds" />
  </div>
</template>

<script>
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
import customAmapLimitDisplay from '../amap-custom/LimitDisplay'
import customAmapLockBounds from '../amap-custom/LockBounds'
import { Sketch } from 'vue-color'

export default {
  components: {
    customAmapLimitDisplay, customAmapLockBounds, 'sketch-color-picker': Sketch
  },
  mixins: [spreadAmapInstance],
  data() {
    return {
      colors: {
        hex: '#000000',
        a: 0.65
      },
      presetColors: [
        '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
        '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
        '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
        'rgba(0,0,0,0)'
      ],
      lockBounds: true
    }
  },
  computed: {
  },
  watch: {
    colors() {
      // console.log(this.colors)
      // console.log(this.colors.hex)
      // console.log(this.colors.a)
      return this.colors.hex
    }
  },
  mounted() {
  },
  methods: {
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
