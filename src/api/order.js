import request from '@/utils/request'
import qs from "qs"
//获所有供应商列表
// "country": "US", //国家
// "current": 1, //当前页
// "size": 10 //每页大小
export function getOrderList(params) {
  return request({
    url: '/api/order/list',
    method: 'get',
    params
  })
}

// 添加订单
export function addOrder(data) {
  return request({
    url: '/api/order/add',
    method: 'post',
    data
  })
}

// 根据订单获取产品
export function getProList(id) {
  return request({
    url: `/api/order/proList/${id}`,
    method: 'get'
  })
}

// 删除订单
export function deleteOrder(id) {
  return request({
    url: `/api/order/remove/${id}`,
    method: 'delete'
  })
}