<template>
<!--新增咨询 -->
    <div id="createCounsel">
		<el-breadcrumb>
            <el-breadcrumb-item :to="{ path:'/workbench/project/allProjectList'}">所有项目列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增咨询</el-breadcrumb-item>
        </el-breadcrumb>
		<el-card>
			<el-form :model="formData"  :rules="rules" ref="formData">
				<div class="wordborder">
					<div class='content'>
						<el-row disabled>
							<el-col :span="5"><p>项目名称</p></el-col>
							<el-col :span="8" >
								<el-form-item prop="projectName">
									<el-input  v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>咨询单位</p></el-col>
							<el-col :span="6">
								<el-form-item prop="counselUser">
									<el-input  v-model="formData.counselUser" placeholder="请输入咨询单位"></el-input>
								</el-form-item>   
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>咨询标题</p></el-col>
							<el-col :span="8" >
								<el-form-item prop="title">
									<el-input  v-model="formData.title" placeholder="请输入咨询标题"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5" v-if="getCounselTypeListByRoleName(roleName)"><p>咨询类型</p></el-col>
							<el-col :span="6" v-if="getCounselTypeListByRoleName(roleName)">
								<el-form-item prop="industry" >
									<el-select v-model="tempCounselType" placeholder="请选择">
										<el-option
											v-for="item in counselTypeList"
											:key="item.value"
											:label="item.label"
											:value="item">
										</el-option>
									</el-select>
								</el-form-item>    
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>咨询内容</p></el-col>
							<el-col :span="19" >
								<el-form-item prop="description">
									<el-input 
										type="textarea"
										:rows="5"
										placeholder="请输入内容"
										v-model="formData.description">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class='tac'>
            		<el-button  type="primary" @click="submit('formData')" round>提交</el-button>
        		</div>
			</el-form>
        </el-card>
    </div>
</template>
<script>
import {counselTypeListAll,judgeRoleByUserName} from '@/utils/util'
import api from "@/api/index";
export default {
  data() {
		return {
			roleName:sessionStorage.getItem("roleName"),
			counselTypeList:null,
			tempCounselType:null,
			formData:{
				projectId:'',
				projectName:'',
				counselUser:sessionStorage.getItem("user"),
				title:'',
				description:'',
				type:'',
				typeName:'',
			},
			rules: {

			}
		};
	},
	methods: {
		getCounselTypeListByRoleName(roleName){
			if(roleName != "zb"){
				return false;
			}
			this.counselTypeList = counselTypeListAll[roleName];
			return true;
		},
		submit(formData) {
			this.formData.type = this.tempCounselType&&this.tempCounselType.value
			this.formData.typeName = this.tempCounselType&&this.tempCounselType.label
			this.$refs[formData].validate(valid => {
				if (valid) {
					api.counsel.createCounsel(this.formData).then(response => {
						console.log(response)
						this.$message("新增成功");
						this.$router.go(-1)
					});

				} else {
					this.$message("请检查输入是否正确");
					return false;
				}
			});
		}
	},
	created() {
		this.getCounselTypeListByRoleName(sessionStorage.getItem("roleName"));
		this.formData.projectId = this.$route.query.id;
		this.formData.projectName = this.$route.query.name;
	}
};
</script>

<style lang="scss">
#createProject{
	.tac{
		text-align: center;
	}
}
</style>


