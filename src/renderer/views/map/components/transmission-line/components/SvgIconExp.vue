<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true">
    <!-- <use :xlink:href="iconName" filter="url(#spotlight)"/> -->
    <use ref="icon" :xlink:href="iconName" transform="rotate(0)"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIconMul',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    styleName: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rotate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iconTransform: null
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    svgStyle() {
      return this.styleName
    }
  },
  watch: {
    rotate(val) {
      console.log(this.iconTransform)
      if (val) {
        this.iconTransform.setRotate(15, 0, 0)
      } else {
        this.iconTransform.setRotate(0, 0, 0)
      }
    }
  },
  mounted() {
    const iconHand = this.$refs.icon
    this.iconTransform = iconHand.transform.baseVal.getItem(0)
  }
}
</script>

<style scoped>
.svg-icon {
  width: 50px;
  height: 50px;
  vertical-align: -4.5px;
  overflow: hidden;
}
</style>
