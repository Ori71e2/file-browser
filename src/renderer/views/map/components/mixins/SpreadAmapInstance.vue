<template>
  <div/>
</template>
<script>
import CONSTANTS from '../utils/constant'
export default {
  props: {
    'amapInstance': {
      type: Object,
      default: null
    }
  },
  watch: {
    amapInstance(newValue, oldValue) {
      this.$children.forEach(component => {
        component.$emit(CONSTANTS.AMAP_READY_EVENT, newValue)
      })
      this.$amap = newValue
    }
  }
}
</script>
