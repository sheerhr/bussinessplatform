
import {asyncRouterMap} from '@/router'
import store from '@/store'
//一级菜单、二级菜单配置
const routeToMenu = [
  {
    path: '/index',
    first:'/index',
    second:'/index/home',
  },
  {
    path: '/index/home',
    first:'/index',
    second:'/index/home',
  },
  {
    path: '/index/platformCharacteristic',
    first:'/index',
    second:'/index/platformCharacteristic',
  },
  //工作台
  {
    path: '/workbench',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-所有项目列表 
  {
    path: '/workbench/project/allProjectList',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-进行中项目列表 
  {
    path: '/workbench/project/underwayProjectList',
    first:'/workbench',
    second:'/workbench/project/underwayProjectList',
  },
  //工作台-项目-已完成项目列表 
  {
    path: '/workbench/project/completedProjectList',
    first:'/workbench',
    second:'/workbench/project/completedProjectList',
  },
  //工作台-项目-新增项目 
  {
    path: '/workbench/project/createProject',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-设计方案提交 
  {
    path: '/workbench/project/designScheme',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-设计成果提交 
  {
    path: '/workbench/project/designResult',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-采购方案提交
  {
    path: '/workbench/project/purchaseScheme',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-施工方案提交 
  {
    path: '/workbench/project/constructionScheme',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-采购记录提交
  {
    path: '/workbench/project/purchaseRecord',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-施工记录提交
  {
    path: '/workbench/project/constructionRecord',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-项目-详情表单 
  {
    path: '/workbench/project/detail',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
  //工作台-咨询-设计咨询列表 
  {
    path: '/workbench/counsel/designCounsel',
    first:'/workbench',
    second:'/workbench/counsel/designCounsel',
  },
  //工作台-咨询-采购咨询列表 
  {
    path: '/workbench/counsel/purchaseCounsel',
    first:'/workbench',
    second:'/workbench/counsel/purchaseCounsel',
  },
  //工作台-咨询-施工咨询列表 
  {
    path: '/workbench/counsel/constructionCounsel',
    first:'/workbench',
    second:'/workbench/counsel/constructionCounsel',
  },
  //后台管理
  {
    path: '/backstageManagement',
    first:'/backstageManagement',
    second:'/backstageManagement/underAnalysis',
  },
  //后台管理-在建分析
  {
    path: '/backstageManagement/underAnalysis',
    first:'/backstageManagement',
    second:'/backstageManagement/underAnalysis',
  },
  //后台管理-总包分析
  {
    path: '/backstageManagement/totalPackageAnalysis',
    first:'/backstageManagement',
    second:'/backstageManagement/totalPackageAnalysis',
  },
  //后台管理-供应商分析
  {
    path: '/backstageManagement/supplierAnalysis',
    first:'/backstageManagement',
    second:'/backstageManagement/supplierAnalysis',
  },
  //后台管理-劳务分析
  {
    path: '/backstageManagement/laborAnalysis',
    first:'/backstageManagement',
    second:'/backstageManagement/laborAnalysis',
  },
  //工作台-项目-新增咨询 
  {
    path: '/workbench/project/counsel',
    first:'/workbench',
    second:'/workbench/project/allProjectList',
  },
]

const methodRouteMenu = {
  getRoutes:function(firstUrl,router){
    
    if(firstUrl =='/index'){
      return router.options.routes[3].children
    }
    for (let index = 0; index < asyncRouterMap.length; index++) {
      const element = asyncRouterMap[index];
      if(element.path ==  firstUrl){
        return element.children  
      }
    }
  },
  getRouteMenu:function(path){
    for (let index = 0; index < routeToMenu.length; index++) {
      const element = routeToMenu[index];
      if(path == element.path){
        return element
      }
    }
    return ;
  },
  getSecond:function(element){
    let _second 
    if(!element.second){
      let temp1 = store.getters.permission_routers ? store.getters.permission_routers : constantRouterMap
      for (let index = 0; index <temp1.length; index++) {
        const _element = temp1[index];
        if(_element.path ==  element.first){
          _second = _element.children[0].redirect || _element.redirect ||_element.path
        }
      }
    }else{
      _second = element.second
    }
    return _second
  }
}

export  {methodRouteMenu}
export default routeToMenu
