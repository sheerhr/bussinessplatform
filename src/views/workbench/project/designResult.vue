<template>
<!-- 设计成果 -->
    <div id="designResult">
		<el-breadcrumb>
				<el-breadcrumb-item :to="{ path:'/workbench/project/allProjectList'}">所有项目列表</el-breadcrumb-item>
				<el-breadcrumb-item>设计成果</el-breadcrumb-item>
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
								<el-input disabled v-model="project.designer" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5"><p>联系方式</p></el-col>
						<el-col :span="6">
							<el-form-item prop = "designerPhone">
								<el-input disabled v-model="project.designerPhone" ></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="5"><p>实际交付时间</p></el-col>
						<el-col :span="8">
							<el-date-picker
								v-model="formData.realPayDate"
								type="date"
								placeholder="选择日期" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-col>
						<el-col :span="5"><p>实际提交方式</p></el-col>
						<el-col :span="6">
							<el-form-item prop = "realPayMode">
								<el-input  v-model="formData.realPayMode" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="5"><p>成果范围</p></el-col>
						<el-col :span="19">
							<el-form-item prop = "resultRange">
								<el-input 
									type="textarea"
									:rows="5"
									placeholder="请输入内容"
									 v-model="formData.resultRange">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row >
						<el-col :span="5"><p>设计图纸上传</p></el-col>
						<el-col :span="8">
							<el-upload
								class="upload-demo"
								action
								:http-request="uploadFileMethod1" :show-file-list="showFileFlag1"
								:before-upload="beforeUpload"
								list-type="text" :file-list="uploadFile.list1" :on-remove="handleRemoveList1"
							>
								<el-button size="medium" type="primary" style="width:200px;">设计图纸上传</el-button>
								<el-progress v-if="flag1 == true" type="line" :percentage="uploadPercent1" style="margin-top:30px;"></el-progress>
							</el-upload>
						</el-col>	
						<el-col :span="5"><p>设计清单上传</p></el-col>
						<el-col :span="6">
							<el-upload
								class="upload-demo"
								action
								:http-request="uploadFileMethod2" :show-file-list="showFileFlag2"
								:before-upload="beforeUpload"
								list-type="text" :file-list="uploadFile.list2" :on-remove="handleRemoveList2"
							>
								<el-button size="medium" type="primary" style="width:200px;">设计清单上传</el-button>
								<el-progress v-if="flag2 == true" type="line" :percentage="uploadPercent2" style="margin-top:30px;"></el-progress>
							</el-upload>
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
			showFileFlag1:true,
			uploadPercent1:0,
			flag1:false,

			showFileFlag2:true,
			uploadPercent2:0,
			flag2:false,

			uploadFile:{//文件列表
        		list1:[],
        		list2:[],
				
			},


			project:{
			},
			formData:{
				id:'',
				realPayDate:"",//实际交付时间
				realPayMode:"",//实际提交方式
				resultRange:"",//成果范围
			}
		};
	},
	methods: {
		beforeUpload(file){
			let fileSize = file.size/1024/1024 <100;
			if(!fileSize){
				this.$message("上传文件不得大于100M")
				return false
			}  
		},
		deleteFile(fileId){
			api.project.deleteFile(fileId).then(response => {
				console.log(response);
			}).catch(error => {
				console.log(error);
			});
		},

		uploadFileMethod1(param) {
			if(this.flag1){
				this.$message("请等待当前文件上传完毕")
				return
			}
			this.showFileFlag1 = false
			this.flag1 = true;
			this.uploadPercent1 = 1;
			let timer = setInterval(()=>{
				// alert()
				if(this.uploadPercent1<95){
				this.uploadPercent1 += Math.ceil(Math.random()*5);
				}
			}, 700);

			let fileObject = param.file;
			let formData = new FormData();
			formData.append("file", fileObject);
			formData.append("foreignId", this.formData.id);
			formData.append("type",1);//设计图纸
			api.project.uploadFile(formData).then(response => {
				
				clearInterval(timer)
				this.uploadPercent1 = 100;
				setTimeout(()=>{
					this.flag1 = false;
					this.uploadPercent1 = 0;
					this.showFileFlag1 = true
				},700)

				let obj = new Object();
				obj.id = response.id;
				obj.name = response.showName;
				obj.url = response.url;
				this.uploadFile.list1.push(obj);
				}).catch(error => {
				console.log(error);
				});
		},
		handleRemoveList1(file,fileList){
			let index = -1;
			for(let i in this.uploadFile.list1){
				if(file.id==this.uploadFile.list1[i].id){
					index = i;
					break;
				}
			}
			if(index!=-1){
				this.uploadFile.list1.splice(index,1);
			}
			this.deleteFile(file.id);
		},
		
		loadFileList1(){//加载
			api.project.loadFile(this.formData.id,1).then(response =>{
			response&&response.data.forEach(element => {
				let obj = new Object();
				obj.id = element.id;
				obj.name = element.showName;
				obj.url = element.url;
				this.uploadFile.list1.push(obj);
			});
			}).catch(error =>{
				console.log(error);
			});
		},

// -------------------------------------------------------------
		uploadFileMethod2(param) {
			if(this.flag2){
				this.$message("请等待当前文件上传完毕")
				return
			}
			this.showFileFlag2 = false
			this.flag2 = true;
			this.uploadPercent2 = 1;
			let timer = setInterval(()=>{
				// alert()
				if(this.uploadPercent2<95){
				this.uploadPercent2 += Math.ceil(Math.random()*5);
				}
			}, 700);

			let fileObject = param.file;
			let formData = new FormData();
			formData.append("file", fileObject);
			formData.append("foreignId", this.formData.id);
			formData.append("type",2);//设计清单
			api.project.uploadFile(formData).then(response => {
				
				clearInterval(timer)
				this.uploadPercent2 = 100;
				setTimeout(()=>{
					this.flag2 = false;
					this.uploadPercent2 = 0;
					this.showFileFlag2 = true
				},700)

				let obj = new Object();
				obj.id = response.id;
				obj.name = response.showName;
				obj.url = response.url;
				this.uploadFile.list2.push(obj);
				}).catch(error => {
				console.log(error);
				});
		},
		handleRemoveList2(file,fileList){
			let index = -1;
			for(let i in this.uploadFile.list2){
				if(file.id==this.uploadFile.list2[i].id){
					index = i;
					break;
				}
			}
			if(index!=-1){
				this.uploadFile.list2.splice(index,1);
			}
			this.deleteFile(file.id);
		},
		
		loadFileList2(){//加载
			api.project.loadFile(this.formData.id,2).then(response =>{
			response&&response.data.forEach(element => {
				let obj = new Object();
				obj.id = element.id;
				obj.name = element.showName;
				obj.url = element.url;
				this.uploadFile.list2.push(obj);
				console.log(this.uploadFile.list2);
			});
			}).catch(error =>{
				console.log(error);
			});
		},
		getProjectById(){
			api.project.getProjectById(this.formData.id).then(response => {
				this.project = response.data
			});
		},
		submit(formData) {
			api.project.sjcg(this.formData).then(response => {
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
		this.getProjectById();
		this.loadFileList1();
		this.loadFileList2();
	}
};
</script>

<style lang="scss" >

</style>


