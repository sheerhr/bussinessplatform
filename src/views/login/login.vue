<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm  login-page">

            <div class="gongsi">卓源智能建筑综合服务应用平台</div>
            <!-- <h5 class='div1'>
                <router-link to="/">游客访问</router-link>
            </h5> -->
            <h3 class="title">用户登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    autocomplete="off" 
                    placeholder="用户名">
                    <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input show-password 
                    v-model="ruleForm2.password" 
                    autocomplete="off"  
                    placeholder="密码">
                    <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"></span></template>
                </el-input>
            </el-form-item>
             <!-- <el-form-item style="width:100%;margin-bottom: 10px;">
                <el-button type="text" style="width:45%;" @click="dialogFormVisible = true">注册</el-button>
                <el-button type="text" style="width:45%;" @click="dialogFormVisible2 = true">修改密码</el-button>
            </el-form-item> -->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit('ruleForm2')" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="注册" :visible.sync="dialogFormVisible" @close='cancel("form")'>
            <el-form :model="form" :rules="rules4" style='width: 75%;margin: 0 auto;'
                        ref="form" >
                <el-form-item prop="username" >
                    <el-input v-model="form.username" autocomplete="off" placeholder="用户">
                        <template slot="prepend">用户</template>
                    </el-input> 
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" autocomplete="new-password" placeholder="密码" show-password>
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repeatPassword" >
                    <el-input v-model="form.repeatPassword" autocomplete="new-password" placeholder="密码" show-password>
                        <template slot="prepend">重复密码</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button type="primary" @click="register('form')" :disabled="disabled">确 定</el-button>
            </div>
        </el-dialog>

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
import api from '@/api/index' // 导入api接口
export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
            dialogFormVisible: false,
            
            form: {
                username:'',
                password:'',
                repeatPassword:'',
            },
            rules4: {
                username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
                repeatPassword: [{required: true, message: '重复密码不能为空', trigger: 'blur'}],
            },
            formLabelWidth: '120px',
            disabled:false,
            dialogFormVisible2: false,
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
        }
    },
    methods: {
        showPassword() {
            // alert()
            if (this.pwdType === 'password') {
                this.pwdType = ''
                this.eyeType = 'fa fa-eye fa-lg'
            } else {
                this.pwdType = 'password'
                this.eyeType = 'fa fa-eye-slash fa-lg'
            }
        },
        handleSubmit(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    this.$message('验证不通过');
                    return false;
                }
            });
        },
        login(){
            sessionStorage.removeItem('defaultactive')
            this.$store.dispatch('LoginByUsername', {
                'username': this.ruleForm2.username, 'password': this.ruleForm2.password
            })
            .then(() => {
                this.logining = false
                // 重定向到首页
                this.$router.push({ path: this.redirect || '/index' })
            })
            .catch(err => {
                this.logining = false
                this.$alert('账号失效或密码错误', {
                    type: 'warning',
                    confirmButtonText: '确定'
                })
            })
        },
        cancel(formName){
            this.dialogFormVisible = false
            this.$refs[formName].resetFields();
        },
        register(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.register2()
                } else {
                    this.$message('验证不通过');
                    return false;
                }
            });
        },
        register2(){
            if(this.form.password!=this.form.repeatPassword){
                this.$message("两次密码不一致")
            }else{
                this.disabled = true
                api.login.registerApi(this.form.username, this.form.password).then(resp => {
                    if(resp){
                        this.dialogFormVisible = false
                        this.disabled = false
                        this.ruleForm2.username = this.form.username;
                        this.ruleForm2.password = this.form.password;
                        this.handleSubmit()
                    }else{
                        this.disabled = false
                        this.$message("账号已存在")
                    }
                })
                .catch(err => {
                })
            }
        },
        cancel2(formName){
            this.dialogFormVisible2 = false
            this.$refs[formName].resetFields();
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
        }
    }
};
</script>

<style lang='scss'>
.login-container {
    width: 100%;
    height: 100%;
    background: url('~@/assets/bg.png') center center no-repeat;
    background-size: 100% 100%;

    .login-page {
        position: absolute;
        left: 67%;
        top: 33%;
        margin-top: -180px;
        margin-left: -175px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        height: 635px;
        .div1{
            float:right;
            a{
                color:#66b1ff
            }
        }
        .gongsi{
            font-size: 40px;
            color: #1869b4;
            font-weight: 900;
            margin-top: 100px;
            text-align: center;
            margin-bottom: 60px;
        }
        .title{
            text-align: center;
        }
        .fa-user:before {
            color: #1869b4;
        }
        .fa-lock:before {
          color: #1869b4;
        }
    } 
}
</style>