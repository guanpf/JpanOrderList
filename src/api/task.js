import request from '@/utils/request'

//获所有供应商列表
export function getTaskList(params) {
  return request({
    url: '/api/task/list',
    method: 'get',
    params
  })
}