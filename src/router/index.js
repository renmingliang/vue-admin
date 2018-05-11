import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/index'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: 'login', component: _import('login'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard')
    }]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/manage',
    name: 'manage',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: 'IP管理', icon: 'table' },
    children: [
      {
        path: 'search',
        name: 'search',
        component: _import('manage/search'),
        meta: { title: '信息查询', code: 'search' }
      },
      {
        path: 'ip',
        name: 'ip',
        component: _import('manage/ip'),
        meta: { title: 'IP信息录入', code: 'ip' }
      },
      {
        path: 'project',
        name: 'project',
        component: _import('manage/project'),
        meta: { title: '项目信息录入', code: 'project' }
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        path: 'adaptation',
        name: 'adaptation',
        component: _import('setting/adaptation'),
        meta: { title: '改编权设置', code: 'adaptation' }
      },
      {
        path: 'permission',
        name: 'permission',
        component: _import('setting/permission'),
        meta: { title: '权限设置', code: 'permission' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    children: [{
      path: 'index',
      name: 'log',
      component: _import('log'),
      meta: { title: '操作日志', icon: 'tree', code: 'log' }
    }]
  }
]
