import request from '@/utils/request'

// 批量获取列表
export function fetchImagesList(query) {
  return request({
    url: '/amap/images',
    method: 'get',
    params: query
  })
}
