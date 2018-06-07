import api from '@/api'

const ip = {
  state: {
    listLoading: false,
    listData: null,
    listTotal: null
  },

  getters: {
    listLoading: state => state.listLoading,
    listData: state => state.listData,
    listTotal: state => state.listTotal
  },

  mutations: {
    LIST_LOADING: (state, payload) => {
      state.listLoading = payload.loading
    },
    IP_LIST: (state, payload) => {
      state.listData = payload.list.data
      state.listTotal = +payload.list.total_count
    }
  },

  actions: {
    // 录入
    IP_ADD({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPAdd(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            commit('LIST_LOADING', { loading: false })
            console.log(error)
            reject(error)
          })
      })
    },
    // 编辑
    IP_UPDATE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPUpdate(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            commit('LIST_LOADING', { loading: false })
            console.log(error)
            reject(error)
          })
      })
    },
    // 删除IP
    IP_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPDelete(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('LIST_LOADING', { loading: false })
            reject(error)
          })
      })
    },
    // 删除IP对应改编权类别下所有项目
    IP_PROJECT_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPProjectDelete(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('LIST_LOADING', { loading: false })
            reject(error)
          })
      })
    },
    // 删除IP对应下单条改编权类别
    IP_RIGHT_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPRightDelete(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('LIST_LOADING', { loading: false })
            reject(error)
          })
      })
    },
    // IP对应下的所有改编权类别
    IP_RIGHT_ALL({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.IPRightAll(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 详情
    IP_FETCH_DETAIL({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPDetail(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('LIST_LOADING', { loading: false })
          })
      })
    },
    // 名称搜索
    IP_SEARCH_NAME({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.IPSearchByName(params)
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
    // 列表
    IP_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.IPList(params)
          .then(res => {
            console.log(res)
            commit('LIST_LOADING', { loading: false })
            commit('IP_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            commit('LIST_LOADING', { loading: false })
          })
      })
    },
    // 列表
    IP_EXPORT({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.Export(params)
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}

export default ip
