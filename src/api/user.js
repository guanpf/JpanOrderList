import request from '@/utils/request'
import qs from "qs"

export function login(data) {
  let _data = qs.stringify(data)
  console.log(666,_data)
  let config = {
    headers:{
      "Content-Type":"application/json"
    }
  }
  return request({
    url: '/api/demo/login',
    method: 'post',
    _data
  })
}

export function getCode(data) {
  return request({
    url: '/api/demo/imageCode',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
