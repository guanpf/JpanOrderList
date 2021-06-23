import request from '@/utils/request'
import qs from "qs"

export function login(data) {
  let config = {
    headers:{
      "Content-Type":"application/json"
    }
  }
  return request({
    url: '/api/demo/login',
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
  console.log(26,token)
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
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
