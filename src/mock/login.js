import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: [
      {
        code: 'manage',
        name: 'IP管理',
        children: [
          {
            code: 'search',
            name: '信息查询'
          },
          {
            code: 'create-ip',
            name: 'IP信息录入'
          },
          {
            code: 'edit-ip',
            name: '编辑IP信息'
          },
          {
            code: 'create-project',
            name: '项目信息录入'
          },
          {
            code: 'edit-project',
            name: '编辑项目信息'
          }
        ]
      },
      {
        code: 'setting',
        name: '系统设置',
        children: [
          {
            code: 'adaptation',
            name: '改编权设置'
          },
          {
            code: 'permission',
            name: '权限设置'
          }
        ]
      },
      {
        code: 'action',
        name: '操作日志',
        children: [
          {
            code: 'log',
            name: '操作日志'
          }
        ]
      }
    ],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin'
  },
  test: {
    roles: [
      {
        code: 'manage',
        name: 'IP管理',
        children: [
          {
            code: 'search',
            name: '信息查询'
          },
          {
            code: 'create-ip',
            name: 'IP信息录入'
          },
          {
            code: 'edit-ip',
            name: '编辑IP信息'
          },
          {
            code: 'create-project',
            name: '项目信息录入'
          },
          {
            code: 'edit-project',
            name: '编辑项目信息'
          }
        ]
      },
      {
        code: 'setting',
        name: '系统设置',
        children: [
          {
            code: 'adaptation',
            name: '改编权设置'
          }
        ]
      }
    ],
    token: 'test',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal test'
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
    const token = 'admin'
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
  getUserPermission: config => {
    const token = 'admin'
    if (token) {
      return {
        code: 10000,
        msg: '拉取用户权限操作',
        data: userMap[token].roles
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
