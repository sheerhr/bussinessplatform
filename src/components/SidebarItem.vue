<template >
  <!-- 如果当前 subroute 有子节点 -->
  <el-submenu  v-if="!subroute.hidden && subroute.children && subroute.children.length > 0"
    :index="genPath(fatherpath, subroute.path)" >
    <!-- 创建菜单分组 -->
    <template slot="title">
      <i :class="iconObject[genPath(fatherpath, subroute.path)]" style="color:white;"></i>
      <!-- <span slot="title">{{subroute.name.slice(0,subroute.name.length-1)}}</span> -->
      <span slot="title">{{subroute.name}}</span>
    </template>

    <!-- 递归调用自身，直到 subroute 不含子节点 -->
    <SidebarItem v-for="(submenu, subidx) in subroute.children"
      :subroute="submenu"
      :fatherpath="genPath(fatherpath, subroute.path)"
      :barIdx="subidx" 
      :key="barIdx + '-' + subidx" 
      />
  </el-submenu>

  <!-- 当前节点不含子节点且非隐藏 -->
  <el-menu-item style="font-weight: 400;color: rgb(255,255,255);"
    v-else-if="!subroute.hidden"
    :index="genPath(fatherpath, subroute.path)"
    >
    <i class="fa fa-bookmark-o fa-lg;el-menu-item.is-active"></i>
    <!-- {{subroute.name.slice(0,subroute.name.length-1)}} -->
    {{subroute.name}}
  </el-menu-item>
  
  <!-- <el-menu-item style="font-weight: 400"
    v-else
    :index="genPath(fatherpath, subroute.path)"
    >{{ subroute.name }}
  </el-menu-item> -->
</template>

<script>
export default {
  data(){
    return{
      iconObject:{
        '/workbench/raw':'icon-yuanliaoguanliyuanliaoguanli',
        '/workbench/management':'icon-yuanliaoguanliyangpinzhibei',
        '/workbench/warehouseMmanagement':'icon-yuanliaoguanliicon',
        '/workbench/stockControl':'icon-yuanliaoguanlikucun',
        '/workbench/dataCoding':'icon-yuanliaoguanlibianma'
      }
    }
  },
  name: 'SidebarItem',
  props: {
    subroute: {
      type: Object
    },
    barIdx: {
      type: [String, Number]
    },
    fatherpath: {
      type: String
    }
  },
  computed: {
    // 默认激活的路由, 用来激活菜单选中状态
    defaultActive: function(){
      return this.$route.path
    },
  },
  methods: {
    // 生成侧边栏路由，格式: /a/b/c
    genPath: function(){
      let arr = [ ...arguments ]
      let path = arr.map(v => {
          while (v[0] === '/'){
            v = v.substring(1)
          }
          while(v[-1] === '/'){
            v = v.substring(0, v.length)
          }
        return v 
      }).join('/')
      path = path[0] === '/' ? path : '/'+path
      return path
    },
    handleOpen: function(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function(key, keyPath) {
      console.log(key, keyPath)
    },
    //根据path=/productCodeList不加
  },
  mounted: function(){
    
  }
}
</script>

<style>
.el-submenu__title:hover {
    background-color: black ;
}
.el-submenu__title {
    background-color: #1c1f21!important;
    color: white;
}
.el-menu-item.is-active {
    color: #409EFF!important;
}
.el-menu-item.is-active {
   background-color: #000 !important;
}
.el-menu{
  border-right: 0;
}
.app-side-left {
    background-color: black;
}
</style>