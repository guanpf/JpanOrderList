import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/demo/supplier/page',
    method: 'get',
    params
  })
}
