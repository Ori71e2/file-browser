<template>
  <div/>
</template>
<script>
import { fetchMarkersList } from '@/api/amapMarker'
export default {
  name: 'Test2',
  data() {
    return {
      markersUpdateMap: new Map()
    }
  },
  computed: {
    markersMap() {
      /* eslint-disable */
      const markersMapUpdate = this.$store.getters.markersMapUpdate
      console.log(this.$store.getters.markersMap)
      return this.$store.getters.markersMap
    }
  },
  mounted() {
    console.log('mounted')
    this.fetchMarkersListByParams()
  },
  activated() {
    console.log('actived')
    this.fetchMarkersListByParams()
  },
  methods: {
    fetchMarkersListByParams() {
      fetchMarkersList().then((response) => {
        const key = response.data.key
        const data = response.data.data
        this.markersUpdateMap.set(key, data)
        
        const newMarkers = data
        // 客户端markersMap对于获取后已删除的要维护数据状态，防止旧数据延迟到来，Map中不存在key而进行更新
        // data中time表明获取数据的时间，以此为更新队列顺序
        // 新来的数据与旧数据迟来的有重合的，以新来的为准，加入条件判断
        // 对所有客户端，服务器端维护一个消息队列，客户端要唯一，可以以账户和设备唯一ID为Key
        newMarkers.forEach((newM) => {
          console.log(this.markersMap)
          if (!this.markersMap.has(newM.id)) {
            this.$store.dispatch('setMarkersMap', newM)
            this.$store.dispatch('setMarkersMapAdd')
          } else {
            const newMModifyTime = new Date(newM.modifyTime)
            const mDodifyTime = new Date(this.markersMap.get(newM.id).modifyTime)
            // 测试用
            // if (newMModifyTime.getTime() >= mDodifyTime.getTime()) {
            if (newMModifyTime.getTime() > mDodifyTime.getTime()) {
              this.$store.dispatch('setMarkersMap', newM)
              this.$store.dispatch('setMarkersMapUpdate')
            }
          }
        })
        // 更新队列
        this.markersUpdateMap.delete(key)
      })
    }
  }
}
</script>
<style scoped>

</style>
