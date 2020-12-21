import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import Container from '@/container/Container'
import Page404 from '@/views/404'
import home  from '@/views/index/home'
/** router modules */
import workbenchRouter from './modules/workbench'
import backstageRouter from './modules/backstage'
import platformCharacteristic from '@/views/index/platformCharacteristic'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    hidden: true,
    component: Login
  },
  {
    path: '/404',
    hidden: true,
    component: Page404
  },
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    component: Login
  },
  {
    path: '/index',
    redirect: '/index/home',
    component: Container,
    name: '首页',
    hidden: false,
    meta: { title: '首页', icon: '', noCache: true },
    children: [
      {
        path: 'home',
        name: '首页',
        hidden: false,
        component: home,
        meta: { title: '首页', icon: '', noCache: true }
      },
      {
        path: 'platformCharacteristic',
        name: '平台特点',
        hidden: false,
        component: platformCharacteristic,
        meta: { title: '平台特点', icon: '', noCache: true }
      },
      
    ]
  },
]

export default new Router({
  mode: 'history',
  base: '/businessplatform/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** 其他的异步路由表 */
  workbenchRouter,
  backstageRouter,
  { path: '*', redirect: '/404', hidden: true }
]

