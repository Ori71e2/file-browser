<template>
  <div>
    <div>
      <line-phytower />
    </div>
    <div>
      <el-button slot="reference" type="primary">
        线路<i class="el-icon-arrow-up el-icon--right"/>
      </el-button>
    </div>
  </div>
</template>
<script>
import spreadAmapInstance from '../mixins/SpreadAmapInstance'
import linePhytower from '../transmission-line/LinePhytower'
export default {
  components: {
    linePhytower
  },
  mixins: [spreadAmapInstance],
  data() {
    return {

    }
  },
  computed: {
    zoom() {
      return this.$store.getters.currentZoom
    }
  },
  watch: {
    zoom(val) {
      console.log('zoom ' + val)
      console.log(this.$amap.getResolution())
    }
  },
  mounted() {

  },
  activated() {

  },
  methods: {
  }
}
</script>
<style scoped>

</style>
