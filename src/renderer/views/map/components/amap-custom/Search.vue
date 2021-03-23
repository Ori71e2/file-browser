<template>
  <div class="tip">
    <input :id="id" class="custom-componet-input" >
  </div>
</template>

<script>
import { createCustomComponent } from 'vue-amap'

const customAmapSearchbox = createCustomComponent({
  name: 'custom-amap-search-box',
  data() {
    return {
      id: `custom-componet-input-${Math.random()}`
    }
  },
  init(_options, map) {
    const options = {
      ..._options,
      input: this.id
    }
    return new Promise(resolve => {
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
        const autocomplete = new AMap.Autocomplete(options)
        AMap.event.addListener(autocomplete, 'select', (e) => {
          this.$emit('select', e.poi)
        })
        resolve(autocomplete)
      })
    })
  },
  contextReady() {
  },
  created: () => {
  },
  mounted: () => {
  }
})

export default customAmapSearchbox
</script>
<style>
.tip {
    background-color: #ddf;
    color: #333;
    border: 1px solid silver;
    box-shadow: 3px 4px 3px 0px silver;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 5px;
    line-height: 20px;
    z-index: 99;
}
.tip input {
    height: 25px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
}
</style>
