import api from '@/api'
import { storage } from '@/utils'

const KEY_NAME = 'adaptationName'
const KEY_TOP = 'adaptationTop'

const adaptation = {
  state: {
    adaptationData: [],
    adaptationTop: storage.get(KEY_TOP),
    adaptationName: storage.get(KEY_NAME)
  },

  getters: {
    adaptationData: state => state.adaptationData,
    adaptationTop: state => state.adaptationTop,
    adaptationName: state => state.adaptationName
  },

  mutations: {
    ADAPTATION_LIST: (state, payload) => {
      state.adaptationData = payload.list
    },
    ADAPTATION_TOP: (state, payload) => {
      state.adaptationTop = payload.list.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      storage.set(KEY_TOP, state.adaptationTop)
    },
    ADAPTATION_NAME: (state, payload) => {
      state.adaptationName = payload.list.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      storage.set(KEY_NAME, state.adaptationName)
    }
  },

  actions: {
    // 新增与编辑
    ADAPTATION_EDIT({ commit }, params) {
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
    ADAPTATION_DELETE({ commit }, params) {
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
    ADAPTATION_FETCH_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationList(params)
          .then(res => {
            console.log(res)
            // 若未传参，初始获取所有类别
            if (!params) {
              commit('ADAPTATION_NAME', { list: res.data })
            }
            commit('ADAPTATION_LIST', { list: res.data })
            resolve(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // TOP改编权
    ADAPTATION_FETCH_TOP({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.AdaptationTop()
          .then(res => {
            console.log(res)
            commit('ADAPTATION_TOP', { list: res.data })
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
