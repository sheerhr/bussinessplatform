<template>
  <div class="app">
    <el-container >
        <el-header class="app-header" style='background:#1c1f21'>
          <div class="app-side-logo" style='line-height:55px;background:#1c1f21;'>
            <img src="@/assets/logo2.png" style='vertical-align: middle;'
                width="225"
                height="25" />
          </div>
          <div style="width: 60px; cursor: pointer;"
               >
          </div>
          <!-- 我是样例菜单 -->
          <el-menu  :default-active=defaultactive
                    router
                    class="el-menu-demo tab-page"
                    mode="horizontal"
                    @select="handleSelect"
                    active-text-color="#409EFF">
            <el-menu-item index="/index">服务平台</el-menu-item>
            <el-menu-item v-show='submenu.name' v-for ='(submenu, subidx) in addRouters' :index="submenu.path" :key="subidx" >{{submenu.name}}</el-menu-item>
            <el-menu-item  style='padding:0'><a target="_blank" href='http://www.chorainzk.com:2020/bp/login' style='display: block; width: 120px; font-size: 16px; text-decoration:none;'><span style="margin-left: 20px;">后台管理</span></a></el-menu-item>
            <el-menu-item style='padding:0'></el-menu-item>
              
          </el-menu>

          <div class="app-header-userinfo" style='cursor: pointer;'>
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username?username:'游客，请登录' }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided
                  @click.native="dialogFormVisible2 = true">修改密码
                </el-dropdown-item>
                <el-dropdown-item divided
                  @click.native="logout">{{username?'退出登录':'请您登录'}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
    <el-container style='height:80%'>
        <el-aside class="app-side app-side-left" 
          :class="'app-side-expanded'">
          <Sidebar :collapse="isCollapse" :routes="routes" :parent = "defaultactive" :temp= "mytimestamp"/>
        </el-aside>
        <el-main class="app-body">
          <template>
            <router-view :key="$route.fullPath"></router-view>
          </template>
        </el-main>
      </el-container>
        <el-footer style='background:#1c1f21;'><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 20px; color: rgb(255,255,255);  line-height: 60px;">卓源智能建筑综合服务应用平台</span></strong></el-footer>
    </el-container>
    <!-- ---------------------------------- -->
     <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" @close='cancel("form2")'>
            <el-form :model="form2"
                        :rules="rules3"
                        ref="form2"  style='width: 75%;margin: 0 auto;'
                    >
                <el-form-item prop="username" >
                    <el-input v-model="form2.username" autocomplete="off" placeholder="用户">
                        <template slot="prepend">用户</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="oldPassword">
                    <el-input v-model="form2.oldPassword" autocomplete="new-password" placeholder="密码" show-password>
                        <template slot="prepend">原始密码</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form2.password" autocomplete="new-password" placeholder="密码" show-password>
                        <template slot="prepend">新密码</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel2('form2')">取 消</el-button>
                <el-button type="primary" @click="updatePassword('form2')" :disabled="disabled2">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import {asyncRouterMap} from '../router'
import permission from '../store/modules/permissions'
import store from '../store'
import routeToMenu from '@/utils/routeToMenu'
import {methodRouteMenu} from '@/utils/routeToMenu'
import api from '@/api/index' // 导入api接口
export default {
  name: 'Container',
  components: {
    Sidebar
  },
  data() {
    return {
        ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
            form2: {
                username:'',
                oldPassword:'',
                password:'',
            },
             rules3: {
                username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
                oldPassword: [{required: true, message: '原始密码不能为空', trigger: 'blur'}],
                password: [{required: true, message: '新密码不能为空', trigger: 'blur'}],
            },
            disabled2:false,
        dialogFormVisible2: false,
        username: '',
        isCollapse: false,
        routes:this.$router.options.routes[2].children,
        defaultactive:'/',
        addRouters:store.getters.addRouters,
        mytimestamp:new Date(),
    }
  },
  computed:{
	    key(){
	        return this.$route.name + new Date().getTime();
	    }
	},
  methods: {
    logout: function () {
      this.$confirm('请您确认?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('roleName');
          this.$store.dispatch('FedLogOut')
            .then(() => {
              this.$router.push('/login');
              location.reload()
            })
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.mytimestamp = new Date();

      let element = methodRouteMenu.getRouteMenu(key)
      let _second = methodRouteMenu.getSecond(element)
      this.routes = methodRouteMenu.getRoutes(key,this.$router)
      
      sessionStorage.setItem('defaultactive',key)
      sessionStorage.setItem('defaultactive2',_second)
      this.defaultactive = key
    },
    cancel2(formName){
        this.dialogFormVisible2 = false
        this.$refs[formName].resetFields();
    },
     updatePassword2(){
        this.disabled2 = true
        api.login.updatePasswordApi(this.form2.username,
                    this.form2.password, this.form2.oldPassword).then(resp => {
            if(resp==1){
                this.$message("密码修改成功")
                this.dialogFormVisible2 = false
                this.disabled2 = false
                this.ruleForm2.username = this.form2.username;
                this.ruleForm2.password = this.form2.password;
                this.handleSubmit()
            }else if(resp==-1){
                this.disabled2 = false
                this.$message("账号不存在")
            }else{
                this.disabled2 = false
                this.$message("密码错误")
            }
        })
        .catch(err => {
        })
    },
    updatePassword(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.updatePassword2()
                } else {
                    this.$message('验证不通过');
                    return false;
                }
            });
        },
  },
  mounted: function () {
    this.mytimestamp = new Date();
    this.username = sessionStorage.getItem("user")
    let element = methodRouteMenu.getRouteMenu(this.$route.path)
    let _second = methodRouteMenu.getSecond(element)
    this.routes = methodRouteMenu.getRoutes(element.first,this.$router)

    sessionStorage.setItem('defaultactive',element.first)
    sessionStorage.setItem('defaultactive2',_second)
    this.defaultactive = element.first

  },
  watch: {
    $route(to,from){
      let toPath = to.path
      
      let element = methodRouteMenu.getRouteMenu(toPath)
      let _second = methodRouteMenu.getSecond(element)
      this.routes = methodRouteMenu.getRoutes(element.first,this.$router)

      sessionStorage.setItem('defaultactive',element.first)
      sessionStorage.setItem('defaultactive2',_second)
      this.defaultactive = element.first

      this.mytimestamp = sessionStorage.getItem('defaultactive');
    }
      
  },
}
</script>

<style lang=''>
  html {
    height: 100%;
  }
  body {
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .el-menu--horizontal>.el-menu-item{
    color: #fff!important;
  }
  .el-footer {
    text-align: center;
    line-height: 60px;
  }
  .el-menu-vertical-demo .el-menu-item{
    height: 50px;
    font-size:14px;
    display: block;
    text-align: center;
    font-family:Microsoft YaHei;
    background-color:#1c1f21;
    color: black;
  }
  .el-menu-item{
    font-size:16px;
    font-weight: 600;
  }
  .el-menu-item:hover{
    background-color: black!important;
  }
  .el-submenu__title{
    background-color:#1c1f21;
    color: #fff !important;
  }
  .el-menu-item.is-active{
    color:rgb(255, 208, 75);
  }
   .el-aside{
    background-color:#1c1f21;
    height: 100%;
    max-height: 100%;
  } 
  .app-header{
    border-bottom: 0!important;
  }
  .el-menu.el-menu--horizontal{
    border: 0;
  }
  .el-menu-demo{
    background:#1c1f21;
    font-size: 20px;
  }
  .app-side-left {
    background-color: #262626!important;
}
  .el-menu{
    background-color: rgb(28, 31, 33)!important;
    border-right:0!important; 
  }
  .app-side{
    max-height: 100%!important;
  }
  .app{
    border: none!important;
  }
</style>