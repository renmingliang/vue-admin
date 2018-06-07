import api from '@/api'

const permission = {
  state: {
    permissionLoading: false,
    configData: [],
    permissionData: [],
    permissionFilter: null
  },

  getters: {
    permissionLoading: state => state.permissionLoading,
    configData: state => state.configData,
    configOptions: state => {
      let temp = []
      if (state.configData.permission) {
        state.configData.permission.forEach(item => {
          item.children.forEach(child => {
            temp.push({
              id: child.id,
              pid: child.pid,
              permission_id: child.permission_id.split(',')
            })
          })
        })
      }
      return temp
    },
    permissionData: state => state.permissionData,
    permissionFilter: state => state.permissionFilter,
    permissionName: state => {
      return state.permissionData.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    permissionUser: state => {
      let temp = []
      state.permissionData.forEach(item => {
        if (item.users.length) {
          item.users.map(user => {
            temp.push(
              {
                label: item.id,
                value: user
              }
            )
          })
        }
      })
      return temp
    }
  },

  mutations: {
    PERMISSION_LOADING: (state, payload) => {
      state.permissionLoading = payload.loading
    },
    PERMISSION_LIST: (state, payload) => {
      state.permissionData = payload.list
    },
    PERMISSION_FILTER: (state, payload) => {
      const name = payload.filterQuery.name === '0' ? '' : payload.filterQuery.name
      const username = payload.filterQuery.username
      state.permissionFilter = state.permissionData.filter(item => {
        if (name && username) {
          return (item.id === name && item.users.includes(username))
        } else if (name || username) {
          return (item.id === name || item.users.includes(username))
        }
        return true
      })
    },
    SET_CONFIG: (state, payload) => {
      state.configData = payload.list
    }
  },

  actions: {
    // 录入
    PERMISSION_ADD({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('PERMISSION_LOADING', { loading: true })
        api.PermissionAdd(params)
          .then(res => {
            console.log(res)
            commit('PERMISSION_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('PERMISSION_LOADING', { loading: false })
            reject(error)
          })
      })
    },
    // 编辑
    PERMISSION_UPDATE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('PERMISSION_LOADING', { loading: true })
        api.PermissionUpdate(params)
          .then(res => {
            console.log(res)
            commit('PERMISSION_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('PERMISSION_LOADING', { loading: false })
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
        commit('PERMISSION_LOADING', { loading: true })
        api.UserUpdate(params)
          .then(res => {
            console.log(res)
            commit('PERMISSION_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('PERMISSION_LOADING', { loading: false })
            reject(error)
          })
      })
    },
    // 删除对应权限员工
    PERMISSION_USER_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('PERMISSION_LOADING', { loading: true })
        api.UserDelete(params)
          .then(res => {
            console.log(res)
            commit('PERMISSION_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('PERMISSION_LOADING', { loading: false })
            reject(error)
          })
      })
    }
  }
}

export default permission
