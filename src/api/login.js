import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/seller/user/info',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/seller/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/seller/user/logout',
    method: 'get'
  })
}

