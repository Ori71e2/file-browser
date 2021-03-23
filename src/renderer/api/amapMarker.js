import request from '@/utils/request'

// 批量获取列表
export function fetchMarkersList(query) {
  return request({
    url: '/amap/markers',
    method: 'get',
    params: query
  })
}

// 以下网络请求均是针对单个具体信息进行操作
export function fetchMarker(id) {
  return request({
    url: '/amap/marker',
    method: 'get',
    params: { id }
  })
}

export function updateMarker(id) {
  return request({
    url: '/amap/marker',
    method: 'patch',
    params: { id }
  })
}
export function createMarker(data) {
  return request({
    url: '/amap/marker',
    method: 'post',
    params: data
  })
}
export function deleteMarker(id) {
  return request({
    url: '/amap/marker',
    method: 'delete',
    params: { id }
  })
}
