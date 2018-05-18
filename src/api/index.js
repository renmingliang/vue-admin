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
  /* // 用户权限菜单
  getInfo: () => {
    return request.post('/user/permission')
  }, */
  // 所有菜单
  getInfo: () => {
    return request.post('/menu/all')
  },
  // 添加用户权限
  UserAdd: (data) => {
    return request.post('/user/add', data)
  },
  // 修改用户权限
  UserUpdate: (data) => {
    return request.post('/user/update-permission', data)
  },
  // 删除用户权限
  UserDelete: (data) => {
    return request.post('/user/del', data)
  },
  // sso所有用户
  UserSso: () => {
    return request.get('/sso/all-users')
  },
  // IP录入
  IPEdit: (data) => {
    return request.post('/ip/form-save', data)
  },
  // IP删除
  IPDelete: (data) => {
    return request.post('/ip/del', data)
  },
  // 对应IP改编权类别的项目删除
  IPProjectDelete: (data) => {
    return request.post('/ip/right-del-project', data)
  },
  // 对应IP改编权类别删除
  IPRightDelete: (data) => {
    return request.post('/ip/right-del', data)
  },
  // 对应IP下的所有改编权类别
  IPRightAll: (data) => {
    return request.get('/adaptation-right/ip', { params: data })
  },
  // IP详情
  IPDetail: (data) => {
    return request.get('/ip/detail', { params: data })
  },
  // IP列表
  IPList: (data) => {
    return request.get('/ip/lists', { params: data })
  },
  // IP名称搜索
  IPSearchByName: (data) => {
    return request.get('/ip/search-by-name', { params: data })
  },
  // Project删除
  ProjectDelete: (data) => {
    return request.post('/project/del', data)
  },
  // Project录入
  ProjectEdit: (data) => {
    return request.post('/project/form-save', data)
  },
  // Project详情
  ProjectDetail: (data) => {
    return request.get('/ip/right-projects', { params: data })
  },
  // 新增与编辑改编权类别
  AdaptationEdit: (data) => {
    return request.post('/adaptation-right/sub-save', data)
  },
  // 删除子改编权类别
  AdaptationDelete: (data) => {
    return request.post('/adaptation-right/sub-del', data)
  },
  // 子改编权类别列表
  AdaptationList: (data) => {
    return request.get('/adaptation-right/sub-all', { params: data })
  },
  // TOP改编权类别列表
  AdaptationTop: () => {
    return request.get('/adaptation-right/top-all')
  },
  // 公司主体列表
  CompanyList: () => {
    return request.get('/company/all')
  },
  // 权限配置
  PermissionConfig: () => {
    return request.get('/ipr-permission/config')
  },
  // 权限列表
  PermissionList: () => {
    return request.get('/ipr-permission/list')
  },
  // 权限详情
  PermissionDetail: (data) => {
    return request.get('/ipr-permission/detail', { params: data })
  },
  // 权限详情+用户
  PermissionDetailUser: (data) => {
    return request.get('/ipr-permission/detail-and-users', { params: data })
  },
  // 权限添加与编辑
  PermissionEdit: (data) => {
    return request.post('/ipr-permission/save', data)
  },
  // 权限删除
  PermissionDelete: (data) => {
    return request.post('/ipr-permission/del', data)
  },
  // 导出
  Export: (data) => {
    return request.get('/ip/lists', { params: data })
  },
  // 操作日志列表
  LogList: (data) => {
    return request.get('/operation-log/list', { params: data })
  }
}
