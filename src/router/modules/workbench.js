import Container from '@/container/Container'
/**
 * 工作台相关路由
 */
const workbenchRouter = {
  path: '/workbench',
  component: Container,
  name: '工作台',
  meta: {title: '工作台',roles: ['workbench']},
  redirect: '/workbench/project/allProjectList',
  children: [
    // 工作台-项目
    {
      path: 'project',
      name: '项目',
      hidden: false,
      redirect: '/workbench/project/allProjectList',
      component: () => import('@/views/workbench/project'),
      meta: {title: '项目',icon: 'fa fa-cog fa-lg',roles: ['workbench']},
      children: [
        {
          path: 'allProjectList',
          name: '所有项目',
          component: () => import('@/views/workbench/project/allProjectList'),
          meta: { title: '所有项目列表', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'underwayProjectList',
          name: '进行中项目',
          component: () => import('@/views/workbench/project/underwayProjectList'),
          meta: { title: '进行中项目', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'completedProjectList',
          name: '已完成项目',
          component: () => import('@/views/workbench/project/completedProjectList'),
          meta: { title: '已完成项目列表', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'test',
          name: 'test',
          hidden:true,
          component: () => import('@/views/workbench/project/test'),
          meta: { title: 'test', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'createProject',
          name: '新增项目',
          hidden: true,
          component: () => import('@/views/workbench/project/createProject'),
          meta: { title: '新增项目', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'designScheme',
          name: '设计方案',
          hidden: true,
          component: () => import('@/views/workbench/project/designScheme'),
          meta: { title: '设计方案', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'designResult',
          name: '设计成果',
          hidden: true,
          component: () => import('@/views/workbench/project/designResult'),
          meta: { title: '设计成果', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'purchaseScheme',
          name: '采购方案',
          hidden: true,
          component: () => import('@/views/workbench/project/purchaseScheme'),
          meta: { title: '采购方案', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'constructionScheme',
          name: '施工方案',
          hidden: true,
          component: () => import('@/views/workbench/project/constructionScheme'),
          meta: { title: '施工方案', icon: 'form', roles: ['workbench']} 
        },
        {
          path: 'purchaseRecord',
          name: '采购记录',
          hidden: true,
          component: () => import('@/views/workbench/project/purchaseRecord'),
          meta: { title: '采购记录', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'constructionRecord',
          name: '施工记录',
          hidden: true,
          component: () => import('@/views/workbench/project/constructionRecord'),
          meta: { title: '施工记录', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'counsel',
          name: '咨询',
          hidden: true,
          component: () => import('@/views/workbench/project/counsel'),
          meta: { title: '咨询', icon: 'form', roles: ['workbench']}
        },
        {
          path: 'detail',
          name: '详情',
          hidden: true,
          component: () => import('@/views/workbench/project/detail'),
          meta: { title: '详情', icon: 'form', roles: ['workbench']}
        },
      ]
    },
    // 工作台-咨询
    {
      path: 'counsel',
      name: '咨询',
      hidden: false,
      redirect: '/workbench/counsel/designCounsel',
      component: () => import('@/views/workbench/counsel'),
      meta: {title: '咨询',icon: 'fa fa-cog fa-lg',roles: ['workbench']},
      children: [
        {
          path: 'designCounsel',
          name: '设计咨询',
          component: () => import('@/views/workbench/counsel/designCounsel'),
          meta: { title: '设计咨询列表', icon: 'form', roles: ['workbench/counsel/designCounsel']}
        },
        {
          path: 'purchaseCounsel',
          name: '采购咨询',
          component: () => import('@/views/workbench/counsel/purchaseCounsel'),
          meta: { title: '设计咨询列表', icon: 'form', roles: ['workbench/counsel/purchaseCounsel']}
        },
        {
          path: 'constructionCounsel',
          name: '施工咨询',
          component: () => import('@/views/workbench/counsel/constructionCounsel'),
          meta: { title: '设计咨询列表', icon: 'form', roles: ['workbench/counsel/constructionCounsel']}
        },
      ]
    }
  ]
}


export default workbenchRouter
