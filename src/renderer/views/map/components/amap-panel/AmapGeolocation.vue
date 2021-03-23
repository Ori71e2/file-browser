<template>
  <div>
    <custom-amap-geolocation @set-current-location="setCurrentLocation"/>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      {{ msg }}
    </el-dialog>
  </div>
</template>

<script>
import customAmapGeolocation from '../amap-custom/Geolocation'
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
export default {
  components: {
    customAmapGeolocation
  },
  mixins: [spreadAmapInstance],
  data() {
    return {
      dialogVisible: false,
      msg: ''
    }
  },
  mounted() {},
  methods: {
    setCurrentLocation(data) {
      const currentLocation = [data.position.getLng(), data.position.getLat()]
      this.$store.dispatch('setCurrentLocation', currentLocation)
      const info = data.info
      if (info === 'SUCCESS') {
        this.msg = 'GeoLocation Success!'
        // console.log('SUCCESS')
      } else if (info === 'NOT_SUPPORTED') {
        this.msg = 'Not Supperted!'
        // console.log('NOT_SUPPORTED')
      } else if (info === 'FAILED') {
        this.msg = 'GeoLocation Failed!'
        // console.log('FAILED')
      }
      console.log(this.msg)
      // this.dialogVisible = true
      // setInterval(() => { this.dialogVisible = false }, 2000)
    }
  }
}
</script>
<style scoped>
</style>
