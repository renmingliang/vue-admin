import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import ip from './modules/ip'
import project from './modules/project'
import log from './modules/log'
import adaptation from './modules/adaptation'
import menu from './modules/menu'
import permission from './modules/permission'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    ip,
    adaptation,
    project,
    log,
    menu,
    common,
    permission
  },
  getters
})

export default store
