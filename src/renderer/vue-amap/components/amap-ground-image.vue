<template>
  <div/>
</template>
<script>
import registerMixin from '../mixins/register-component'
export default {
  name: 'ElAmapGroundImage',
  mixins: [registerMixin],
  /* eslint-disable */
  props: [
    'vid',
    'clickable',
    'opacity',
    'url',
    'bounds',
    'visible',
    'events',
    'onceEvents'
  ],
  /* eslint-enable */
  data() {
    return {
      converters: {},
      handlers: {
        visible(flag) {
          if (flag === false) {
            this.setMap(null)
          } else {
            this.setMap(this.$amap)
          }
        }
      }
    }
  },
  destroyed() {
    this.$amapComponent.setMap(null)
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.ImageLayer(options)
    }
  }
}
</script>
