import request from '@/utils/request'

//获取采购记录列表
export function getList(params) {
  return request({
    url: '/api/demo/order/record/page',
    method: 'get',
    params
  })
}

//获取采购记录详情
export function getDetail(id) {
  return request({
    url: `/api/demo/order/record/${id}`,
    method: 'get'
  })
}

//新增采购记录
export function add(data) {
  return request({
    url: `/api/demo/order/record`,
    method: 'post',
    data
  })
}

//删除采购记录
export function deleteApi(id) {
  return request({
    url: `/api/demo/order/record/${id}`,
    method: 'delete'
  })
}

//更新采购记录
export function update(data) {
  return request({
    url: `/api/demo/order/record`,
    method: 'put',
    data
  })
}