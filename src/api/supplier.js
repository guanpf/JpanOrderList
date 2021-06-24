import request from '@/utils/request'

//获取供应商列表
export function getList(params) {
  return request({
    url: '/api/demo/supplier/page',
    method: 'get',
    params
  })
}

//获取供应商详情
export function getDetail(id) {
  return request({
    url: `/api/demo/supplier/${id}`,
    method: 'get'
  })
}

//新增供应商
export function add(data) {
  return request({
    url: `/api/demo/supplier`,
    method: 'post',
    data
  })
}

//删除供应商
export function deleteApi(id) {
  return request({
    url: `/api/demo/supplier/${id}`,
    method: 'delete'
  })
}

//更新供应商
export function update(data) {
  return request({
    url: `/api/demo/supplier`,
    method: 'put',
    data
  })
}