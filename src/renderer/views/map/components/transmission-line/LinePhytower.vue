<template>
  <div class="container">
    <div>
      <svg-icon-exp :style-name="svgStyle" :icon-class="iconClass" />
    </div>
  </div>
</template>

<script>
import svgIconExp from './components/SvgIconExp'
export default {
  components: {
    svgIconExp
  },
  props: {
    position: {
      type: Array,
      default: function() {
        return [0, 0]
      }
    }
  },
  data() {
    return {
      tower: null
    }
  },
  // init(options, map) {
  //   this.tower = new AMap.Rectangle(options)
  //   // return new
  //   // resolve(this.scale)
  // },
  computed: {
    svgStyle() {
      const val = this.zoom
      return this.changeSvgStyle(val)
    },
    iconClass() {
      return 'lineTower'
      // return this.sICToSvgName.searchEnName(this.svgIconCode)
    }
  },
  mounted: () => {
  },
  methods: {
    changeSvgStyle(val) {
      const width = 64
      const height = 64
      const style = {
        'width': width / Math.pow(2, 20 - val) + 'px',
        'height': height / Math.pow(2, 20 - val) + 'px'
      }
      return style
    }
  }
}

</script>
<style scoped>
.container {
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  height: auto;
}
</style>
