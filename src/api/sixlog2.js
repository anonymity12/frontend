import request from '@/utils/request'

export function apiSendSixLog(data) {
  return request({
    url: '/api/sixlog2/add',
    method: 'post',
    data
  })
}

export function api_getAllLogByPage(size, nthPage) {
  return request({
    url: '/api/sixlog2/all/' + size + '/' + nthPage,
    method: 'get',
  })
}
export function api_getTotalAmount() {
  return request({
    url: '/api/sixlog2/getTotalAmount',
    method: 'get'
  })
}