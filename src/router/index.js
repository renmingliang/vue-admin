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
    code: 'code-name'            the name compare with backend request router-data,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: 'login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
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
    meta: { title: 'IP管理', icon: 'table' }, // code: 'manage' },
    children: [
      {
        path: 'search',
        name: 'search',
        component: _import('search/search'),
        meta: {
          title: '信息查询',
          // code: 'search',
          permission: [
            { title: '删除ip', route: 'ip/del' },
            { title: '删除该ip下项目', route: 'ip/right-del-project' }
          ]
        }
      },
      {
        path: 'create-ip',
        name: 'create-ip',
        component: _import('IP/create-ip'),
        meta: {
          title: 'IP信息录入',
          code: 'create-ip',
          permission: [
            { title: '录入', route: 'ip/form-add' }
          ]
        }
      },
      {
        path: 'edit-ip/:id',
        name: 'edit-ip',
        hidden: true,
        component: _import('IP/edit-ip'),
        meta: {
          title: '编辑IP信息',
          code: 'edit-ip',
          permission: [
            { title: '编辑ip', route: 'ip/form-update' },
            { title: 'IP改编权类别删除', route: 'ip/right-del' }
          ]
        }
      },
      {
        path: 'look-ip/:id',
        name: 'look-ip',
        hidden: true,
        component: _import('IP/look-ip'),
        meta: {
          title: '查看IP信息'
        }
      },
      {
        path: 'create-project',
        name: 'create-project',
        component: _import('project/create-project'),
        meta: {
          title: '项目信息录入',
          code: 'create-project',
          permission: [
            { title: '录入', route: 'project/form-add' }
          ]
        }
      },
      {
        path: 'edit-project/:id',
        name: 'edit-project',
        hidden: true,
        component: _import('project/edit-project'),
        meta: {
          title: '编辑项目信息',
          code: 'edit-project',
          permission: [
            { title: '编辑ip', route: 'project/form-update' },
            { title: 'IP改编权类别删除', route: 'project/del' }
          ]
        }
      },
      {
        path: 'look-project/:id',
        name: 'look-project',
        hidden: true,
        component: _import('project/look-project'),
        meta: {
          title: '查看项目信息'
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: '系统设置',
      icon: 'example',
      code: 'setting'
    },
    children: [
      {
        path: 'adaptation',
        name: 'adaptation',
        component: _import('adaptation/adaptation'),
        meta: {
          title: '改编权设置',
          code: 'adaptation',
          permission: [
            { title: '新增类别', route: 'adaptation-right/sub-add' },
            { title: '编辑类别', route: 'adaptation-right/sub-update' },
            { title: '删除类别', route: 'adaptation-right/sub-del' }
          ]
        }
      },
      {
        path: 'permission',
        name: 'permission',
        component: _import('permission/permission'),
        meta: {
          title: '权限设置',
          code: 'permission',
          permission: [
            { title: '添加用户', route: 'user/add' },
            { title: '删除用户', route: 'user/del' },
            { title: '修改用户', route: 'user/update-permission' },
            { title: '删除权限', route: 'ipr-permission/del' },
            { title: '新增权限', route: 'ipr-permission/form-add' },
            { title: '编辑权限', route: 'ipr-permission/form-update' }
          ]
        }
      },
      {
        path: 'create-permission',
        name: 'create-permission',
        hidden: true,
        component: _import('permission/create-permission'),
        meta: {
          title: '新增权限'
        }
      },
      {
        path: 'edit-permission/:id',
        name: 'edit-permission',
        hidden: true,
        component: _import('permission/edit-permission'),
        meta: {
          title: '修改权限'
        }
      },
      {
        path: 'look-permission/:id',
        name: 'look-permission',
        hidden: true,
        component: _import('permission/look-permission'),
        meta: {
          title: '查看权限'
        }
      },
      {
        path: 'edit-user/:id',
        name: 'edit-user',
        hidden: true,
        component: _import('permission/edit-user'),
        meta: {
          title: '编辑权限人员'
        }
      }
    ]
  },
  {
    path: '/action',
    name: 'action',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '操作日志',
      icon: 'tree',
      code: 'action'
    },
    children: [{
      path: 'log',
      name: 'log',
      component: _import('log/log'),
      meta: {
        title: '操作日志',
        icon: 'tree',
        code: 'log',
        permission: [
          { title: '查询', route: 'operation-log/list' }
        ]
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
