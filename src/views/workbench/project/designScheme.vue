<template>
<!-- 设计方案 -->
    <div id="designScheme">
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path:'/workbench/project/allProjectList'}">所有项目列表</el-breadcrumb-item>
			<el-breadcrumb-item>设计方案</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-form :model="formData" ref="formData">
				<div class="wordborder" >
					<div class='content'>
						<el-row>
							<el-col :span="5"><p>项目名称</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "">
								<el-input disabled v-model="project.name" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>总包单位</p></el-col>
							<el-col :span="6">
								<el-form-item prop = "">
								<el-input disabled v-model="project.zbCompanyName" ></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>主设计师</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "designer">
								<el-input  v-model="formData.designer" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>联系方式</p></el-col>
							<el-col :span="6">
								<el-form-item prop = "designerPhone">
								<el-input  v-model="formData.designerPhone" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
						 <el-col :span="5"><p>设计周期</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "designerCycle">
								<el-input  v-model="formData.designerCycle" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>拟交付时间</p></el-col>
							<el-col :span="6">
								<el-date-picker
										v-model="formData.estimatePayDate"
										type="date"
										placeholder="选择日期" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>成果提交介质</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "resultPayMedium">
								<el-input  v-model="formData.resultPayMedium" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>成果提交方式</p></el-col>
							<el-col :span="6">
								<el-form-item prop = "resultPayMode">
								<el-input  v-model="formData.resultPayMode" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>设计范围</p></el-col>
							<el-col :span="19">
								<el-form-item prop = "designScale">
								<el-input 
									type="textarea"
									:rows="5"
									placeholder="请输入内容"
									 v-model="formData.designScale">
								</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>其他要求</p></el-col>
							<el-col :span="19">
								<el-form-item prop = "otherDemand">
									<el-input 
										type="textarea"
										:rows="5"
										placeholder="请输入内容"
										v-model="formData.otherDemand">
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
import api from "@/api/index";
export default {
  data() {
		return {
			project:{
			},
			formData:{
				id:'',
				designer:"",//主设计师
				designerPhone:"",//主设计师联系方式
				designerCycle:"",//设计周期
				estimatePayDate:"",//拟交付时间
				resultPayMedium:"",//成果提交介质
				resultPayMode:"",//成果提交方式
				designScale:"",//设计范围
				otherDemand:"",//其他要求	
			}
		};
	},
	methods: {
		getProjectById(){
			api.project.getProjectById(this.formData.id).then(response => {
				this.project = response.data
			});
		},
		submit(formData) {
			api.project.sjfa(this.formData).then(response => {
				if (response.state==200) {
					this.$message.success("提交成功");
					this.$router.go(-1);					
				} else {
					this.$message.error("提交失败");
				}
			});
			
		},
	},
	created() {
		this.formData.id = this.$route.query.id;
		this.getProjectById()
	}
};
</script>

<style lang="scss" >
#designScheme{
	.tac{
		text-align: center;
	}
}
</style>


