const getters = {
  markersMap: state => state.amap.markersMap,
  markersMapUpdate: state => state.amap.markersMapUpdate,
  markersMapAdd: state => state.amap.markersMapAdd,
  initZoom: state => state.amap.initZoom,
  initCenter: state => state.amap.initCenter,
  currentZoom: state => state.amap.currentZoom,
  currentCenter: state => state.amap.currentCenter,
  selectPosition: state => state.amap.selectPosition
}
export default getters
