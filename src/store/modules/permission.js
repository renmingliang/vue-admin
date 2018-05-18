import api from '@/api'

const permission = {
  state: {
    configData: [],
    permissionData: []
  },

  getters: {
    configData: state => state.configData,
    permissionData: state => state.permissionData,
    permissionName: state => {
      return state.permissionData.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    }
  },

  mutations: {
    PERMISSION_LIST: (state, payload) => {
      state.permissionData = payload.list
    },
    SET_CONFIG: (state, payload) => {
      state.configData = payload.list
    }
  },

  actions: {
    // 录入
    PERMISSION_EDIT({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PermissionEdit(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    // 删除
    PERMISSION_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PermissionDelete(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    // 详情
    PERMISSION_FETCH_DETAIL({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PermissionDetailUser(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 列表
    PERMISSION_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PermissionList()
          .then(res => {
            console.log(res)
            commit('PERMISSION_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 权限配置
    PERMISSION_CONFIG({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.PermissionConfig()
          .then(res => {
            console.log(res)
            commit('SET_CONFIG', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 添加对应权限员工
    PERMISSION_USER_ADD({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UserAdd(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    // 更新员工权限
    PERMISSION_USER_UPDATE({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UserUpdate(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    // 删除对应权限员工
    PERMISSION_USER_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UserDelete(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
}

export default permission
