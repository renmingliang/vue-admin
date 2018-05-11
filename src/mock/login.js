import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: [
      {
        code: 'manage',
        type: 'menu',
        title: 'IP管理',
        children: [
          {
            code: 'search',
            type: 'menu',
            title: '信息查询',
            children: [
              {
                code: 'edit-project',
                type: 'button',
                title: '编辑'
              },
              {
                code: 'delete-project',
                type: 'button',
                title: '删除'
              }
            ]
          },
          {
            code: 'ip',
            type: 'menu',
            title: 'IP信息录入'
          },
          {
            code: 'project',
            type: 'menu',
            title: '项目信息录入'
          }
        ]
      },
      {
        code: 'setting',
        type: 'menu',
        title: '系统设置',
        children: [
          {
            code: 'adaptation',
            type: 'menu',
            title: '改编权设置'
          },
          {
            code: 'permission',
            type: 'menu',
            title: '权限设置'
          }
        ]
      },
      {
        code: 'log',
        type: 'menu',
        title: '操作日志'
      }
    ],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  test: {
    roles: ['test'],
    token: 'admin',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal test'
  }
}

export default {
  loginByUsername: config => {
    const { username } = param2Obj(config.body)
    if (userMap[username]) {
      return {
        code: 10000,
        msg: '登录成功',
        data: userMap[username].token
      }
    } else {
      return {
        code: 10001,
        msg: '该用户不存在',
        data: {}
      }
    }
  },
  getUserInfo: config => {
    const search = config.url.split('?')[1]
    const token = param2Obj(search)['access-token']
    if (token) {
      return {
        code: 10000,
        msg: '拉取用户信息成功',
        data: userMap[token]
      }
    } else {
      return {
        code: 10001,
        msg: '该用户没有权限',
        data: []
      }
    }
  },
  logout: () => {
    return {
      code: 10000,
      msg: '登出成功',
      data: []
    }
  }
}
