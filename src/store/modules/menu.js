import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.roles判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    return roles.some(role => route.meta.code === role)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 递归过滤权限，返回控制用户角色权限数组
 * @param roles
 */
let reslut = []
function handleRoles(roles) {
  roles.forEach(item => {
    if (item.code) {
      if (item.children && item.children.length) {
        handleRoles(item.children)
      }
      reslut.push(item.code)
    }
  })
  return reslut
}

const menu = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    control: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        const tempRoles = handleRoles(roles)
        accessedRouters = filterAsyncRouter(asyncRouterMap, tempRoles)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default menu
