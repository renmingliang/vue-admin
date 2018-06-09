import api from '@/api'
import { localData } from '@/utils'

const KEY_NAME = 'companyName'

const common = {
  state: {
    userList: null,
    companyName: localData.get(KEY_NAME)
  },

  getters: {
    userList: state => state.userList,
    companyName: state => state.companyName
  },

  mutations: {
    COMPANY_LIST: (state, payload) => {
      state.companyName = payload.list.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      localData.set(KEY_NAME, state.companyName)
    },
    USER_SSO_LIST: (state, payload) => {
      state.userList = payload.list.map(item => {
        return {
          value: item.result.name,
          nickname: item.result.nickname
        }
      })
    }
  },

  actions: {
    // sso用户
    USER_FETCH_SSO({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.UserSso()
          .then(res => {
            // console.log(res)
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
            // console.log(res)
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
            // console.log(res)
            commit('COMPANY_LIST', { list: res.data })
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
