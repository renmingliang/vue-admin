import request from '@/utils/request'

export default {
  // 登录
  login: (data) => {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  // 拉取用户信息
  getInfo: (data) => {
    const { token } = data
    return request({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  },
  // 登出
  logout: () => {
    return request({
      url: '/user/logout',
      method: 'post'
    })
  }
}
