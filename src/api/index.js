import request from '@/utils/request'

export default {
  // 登录
  login: (data) => {
    return request.post('/site/get-token', data)
  },
  // 登出
  logout: () => {
    return request.post('/site/logout')
  },
  // 拉取用户信息
  getInfo: () => {
    return request.post('/user/info')
  }
}
