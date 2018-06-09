import api from '@/api'

const log = {
  state: {
    logData: null,
    logTotal: null
  },

  getters: {
    logData: state => state.logData,
    logTotal: state => state.logTotal
  },

  mutations: {
    LOG_LIST: (state, payload) => {
      state.logData = payload.list.data
      state.logTotal = +payload.list.total_count
    }
  },

  actions: {
    // 列表
    LOG_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.LogList(params)
          .then(res => {
            // console.log(res)
            commit('LOG_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}

export default log
