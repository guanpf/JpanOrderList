import request from '@/utils/request'

//获取商品列表
export function getList(params) {
  return request({
    url: '/api/demo/goods/page',
    method: 'get',
    params
  })
}

//获取商品详情
export function getDetail(id) {
  return request({
    url: `/api/demo/goods/${id}`,
    method: 'get'
  })
}

//新增商品
export function add(data) {
  return request({
    url: `/api/demo/goods`,
    method: 'post',
    data
  })
}

//删除商品
export function deleteApi(id) {
  return request({
    url: `/api/demo/goods/${id}`,
    method: 'delete'
  })
}

//更新商品
export function update(data) {
  return request({
    url: `/api/demo/goods`,
    method: 'put',
    data
  })
}