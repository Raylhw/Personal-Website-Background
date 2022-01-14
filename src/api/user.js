import request from '@/utils/request'

// 登录
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 恢复登录
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function updateLogin(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}
