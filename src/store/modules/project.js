import api from '@/api'

const project = {
  state: {
    projectLoading: false
  },

  getters: {
    projectLoading: state => state.projectLoading
  },

  mutations: {
    LIST_LOADING: (state, payload) => {
      state.projectLoading = payload.loading
    }
  },

  actions: {
    // 录入与编辑
    PROJECT_EDIT({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.ProjectEdit(params)
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
    // 单条删除项目
    PROJECT_DELETE({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.ProjectDelete(params)
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
    // 详情
    PROJECT_FETCH_DETAIL({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('LIST_LOADING', { loading: true })
        api.ProjectDetail(params)
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
    }
  }
}

export default project
