<template>
  <router-view></router-view>
</template>
<script>
import {ctool} from '@/utils/util';
import store from '@/store/index' // 导入vuex文件
export default {
  name: 'App', 
  created() {
      if(ctool.getObj('store')){
        // console.info(ctool.getObj('store'))
        this.$store.replaceState(Object.assign({}, store.state,ctool.getObj('store')));
        ctool.setObj('store',null);
        // console.info(store.state)
      }

      window.addEventListener("beforeunload",()=>{
        ctool.setObj('store',store.state);
        // console.info(ctool.getObj('store'))
      }) 
  },
  mounted(){
    
  },
  methods: {
    
  },
}
</script>
