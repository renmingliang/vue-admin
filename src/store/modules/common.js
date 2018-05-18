import api from '@/api'

const common = {
  state: {
    userList: null
  },

  getters: {
    userList: state => state.userList
  },

  mutations: {
    USER_SSO_LIST: (state, payload) => {
      state.userList = payload.list
    }
  },

  actions: {
    // sso用户
    USER_FETCH_SSO({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UserSso()
          .then(res => {
            console.log(res)
            commit('USER_SSO_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 导出
    EXPORT_ACTION({ commit }, params) {
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
    },
    // 公司主体
    COMPANY_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.CompanyList()
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

export default common
