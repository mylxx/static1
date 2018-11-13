import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },
  // 商家管理
  {
    path: '/seller',
    component: Layout,
    redirect: '/seller/list',
    noDropdown: true,
    name: 'Seller',
    meta: {
      title: '商家管理',
      icon: 'example'
    },
    children: [{
      path: 'storeAudit',
      component: () => import('@/views/seller/storeAudit'),
      name: '店铺审核',
      meta: { title: '店铺审核', icon: 'edit' }
    },
    {
      path: 'list',
      component: () => import('@/views/seller/list'),
      name: '商家列表',
      meta: {
        title: '商家列表',
        icon: 'list'
      }

    }]

  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/page',
    alwaysShow: true,
    meta: {
      title: 'test1',
      icon: 'lock',
      roles: ['editor', 'admin']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/test1/page'),
        name: 'test1',
        meta: {
          title: 'test1',
          roles: ['editor', 'admin']
        }
      }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
