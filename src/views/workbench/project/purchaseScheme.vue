<template>
<!-- 采购方案 -->
    <div id="purchaseScheme">
		<el-breadcrumb>
				<el-breadcrumb-item :to="{ path:'/workbench/project/allProjectList'}">所有项目列表</el-breadcrumb-item>
				<el-breadcrumb-item>采购方案</el-breadcrumb-item>
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
							<el-col :span="5"><p>采购员</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "buyer">
								<el-input  v-model="formData.buyer" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>联系方式</p></el-col>
							<el-col :span="6">
								<el-form-item prop = "buyerPhone">
								<el-input  v-model="formData.buyerPhone" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5"><p>供应商</p></el-col>
								<el-col :span="8">
									<el-form-item prop = "tempSupplier">
									<el-select multiple v-model="tempSupplier" placeholder="请选择">
										<el-option
											v-for="item in options3"
											:key="item.id"
											:label="item.name"
											:value="item.id">
										</el-option>
									</el-select>
									</el-form-item>
							</el-col>
						</el-row>
						<el-row>
						  <el-col :span="5"><p>首次采购时间</p></el-col>
							<el-col :span="8">
								<el-date-picker
										v-model="formData.firstBuyerDate"
										type="date"
										placeholder="选择日期" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-col>
							<el-col :span="5"><p>拟完成时间</p></el-col>
							<el-col :span="6">
								<el-date-picker
										v-model="formData.estimateDate"
										type="date"
										placeholder="选择日期" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="5"><p>到货要求</p></el-col>
							<el-col :span="8">
								<el-form-item prop = "goodDemand">
								<el-input  v-model="formData.goodDemand" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5"><p>采购清单</p></el-col>
							<el-col :span="6">
								<el-upload
									class="upload-demo"
									action
									:http-request="uploadFileMethod1" :show-file-list="showFileFlag1"
									:before-upload="beforeUpload"
									list-type="text" :file-list="uploadFile.list1" :on-remove="handleRemoveList1"
								>
									<el-button size="medium" type="primary" style="width:200px;">采购清单上传</el-button>
									<el-progress v-if="flag1 == true" type="line" :percentage="uploadPercent1" style="margin-top:30px;"></el-progress>
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

			uploadFile:{//采购清单文件列表
        		list1:[],
				
			},

			options3:[],
			project:{
			},
			tempSupplier:'',
			formData:{
				id:'',
				buyer:"",//采购员
				buyerPhone:"",//联系方式
				suppliers:"",//供应商集合
				firstBuyerDate:"",//首次采购时间
				estimateDate:"",//拟完成时间
				goodDemand:"",//到货要求
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
			formData.append("type",3);//采购清单
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
		
		loadFileList3(){//加载采购清单文件
			api.project.loadFile(this.formData.id,3).then(response =>{
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


		getProjectById(){
			api.project.getProjectById(this.formData.id).then(response => {
				this.project = response.data
			});
		},
		submit(formData) {
			this.formData.suppliers = this.tempSupplier&&this.tempSupplier.toString()
			api.project.cgfa(this.formData).then(response => {
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
		api.project.getUserByRoleNamePost("gys").then(response => {
			this.options3 = response.data
		});
		this.formData.id = this.$route.query.id;
		this.getProjectById()
		this.loadFileList3()
	}
};
</script>

<style lang="scss" >
</style>


