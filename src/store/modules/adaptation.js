import api from '@/api'

const adaptation = {
  state: {
    adapataionData: []
  },

  getters: {
    adapataionData: state => state.adapataionData,
    adaptationName: state => {
      return state.adapataionData.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    }
  },

  mutations: {
    ADAPATATION_LIST: (state, payload) => {
      state.adapataionData = payload.list
    }
  },

  actions: {
    // 新增与编辑
    ADAPATATION_EDIT({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationEdit(params)
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
    ADAPATATION_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationDelete(params)
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
    // 子级所有
    ADAPATATION_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationList(params)
          .then(res => {
            console.log(res)
            commit('ADAPATATION_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // TOP改编权
    ADAPATATION_FETCH_TOP({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationTop()
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

export default adaptation
