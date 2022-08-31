import request from '@/utils/request'
import qs from "qs"

export function login(data) {
  let config = {
    headers:{
      "Authorization":'Bearer 0bbccbe8749e4749b3e334912dcc0f9b',
      "Content-Type":"application/json"
    }
  }
  return request({
    url: '/api/login',
    method: 'post',
    data
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
  let config = {
        headers: {
          "Authorization": token,
          // "Authorization":`Basic ${Base64.encode(_data.username+":"+_data.password)}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
  return request({
    url: '/api/demo/system/user/info',
    method: 'get',
    ...config
  })
}

export function logout() {
  return request({
    url: '/api/demo/logout',
    method: 'get'
  })
}

export function getAccountList(params) {
  return request({
    url: '/api/account/list',
    method: 'get',
    params
  })
}
