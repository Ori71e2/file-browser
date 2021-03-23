const zoom = 11
const center = [118.716184, 33.720615]
const amap = {
  state: {
    // 采用反序列化对象，确保内容唯一
    markersMap: new Map(),
    // 被监听对象
    markersMapUpdate: 0,
    markersMapAdd: 0,
    initZoom: zoom,
    initCenter: center,
    currentZoom: zoom,
    currentCenter: center,
    currentLocation: center,
    selectPosition: [0, 0]
  },
  mutations: {
    SET_MARKERSMAP: (state, markerData) => {
      state.markersMap.set(markerData.id, markerData)
    },
    SET_MARKERSMAPUPDATE: (state) => {
      state.markersMapUpdate = state.markersMapUpdate + 1
    },
    SET_MARKERSADD: (state) => {
      state.markersMapAdd = state.markersMapAdd + 1
    },
    SET_INITZOOM: (state, initZoom) => {
      state.initZoom = initZoom
    },
    SET_INITCENTER: (state, initCenter) => {
      state.initCenter = initCenter
    },
    SET_CURRENTZOOM: (state, currentZoom) => {
      state.currentZoom = currentZoom
    },
    SET_CURRENTCENTER: (state, currentCenter) => {
      state.currentCenter = currentCenter
    },
    SET_CURRENTLOCATION: (state, currentLocation) => {
      state.currentLocation = currentLocation
    },
    SET_SELECTPOSITION: (state, selectPosition) => {
      state.selectPosition = selectPosition
    }
  },
  actions: {
    setMarkersMap({ commit }, markerData) {
      commit('SET_MARKERSMAP', markerData)
    },
    setMarkersMapUpdate({ commit }) {
      commit('SET_MARKERSMAPUPDATE')
    },
    setMarkersMapAdd({ commit }) {
      commit('SET_MARKERSADD')
    },
    setInitZoom({ commit }, initZoom) {
      commit('SET_INITZOOM', initZoom)
    },
    setInitCenter({ commit }, initCenter) {
      commit('SET_INITCENTER', initCenter)
    },
    setCurrentZoom({ commit }, currentZoom) {
      commit('SET_CURRENTZOOM', currentZoom)
    },
    setCurrentCenter({ commit }, currentCenter) {
      commit('SET_CURRENTCENTER', currentCenter)
    },
    setCurrentLocation({ commit }, currentLocation) {
      commit('SET_CURRENTLOCATION', currentLocation)
    },
    setSelectPosition({ commit }, currentPosition) {
      commit('SET_SELECTPOSITION', currentPosition)
    }
  }
}

export default amap
