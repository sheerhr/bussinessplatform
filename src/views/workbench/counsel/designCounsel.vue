<template>
<!-- 设计咨询列表 -->
<div class='design_counsel_list'>
		<div class="bgc">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" >
				<el-form-item class="heiseziti" label="标题">
					<el-input v-model="formInline.title" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item class="heiseziti" label="项目名称">
					<el-input v-model="formInline.projectName" placeholder="项目名称"></el-input>
				</el-form-item>
			
				<el-form-item class="heiseziti" label="咨询单位" >
					<el-input v-model="formInline.counselUser" placeholder="咨询单位"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>  
		</div>
		<div class="zxw">       
		<el-card :body-style="{ padding: '0px' }" v-for="(item,index) in pageResult.rows" :key="index">
			<div style="padding: 14px;">
				<!-- 咨询标题 -->
				<div class="zimiaoshu">
					<div  class="miaoshuneirong2">{{item.title}}</div>
					<div class="mt10">{{item.description}}</div>
				</div>
				<div class="mt20">
					<div class="fl">项目名称:{{item.project_name}}</div>
					<div class="fr">咨询单位:{{item.counsel_user}}</div>
					<div class="tec">咨询类型:{{item.type_name}}</div>
				</div> 
				<div type="textarea" class="huifu" v-if="item.is_replied==1" >咨询解答:{{ item.reply }}</div>
				<div class="huifu" v-if="item.evaluation!=null">服务评价:{{ item.evaluation }}</div>
				<div class="pjhf">
					<el-button class="pjhfhuigu" v-if=" judgeRoleByUserName(username) == 1 && item.is_replied == 0" type="text" @click="openReplyDialog(item.id)">
					回复
				</el-button>
				<el-button class="pjhfhuigu" v-if="judgeRoleByUserName(username) == 0 && !item.evaluation" type="text" @click="openEvaluationDialog(item.id)">
					评价
				</el-button>
				</div>
			</div>
		</el-card>
		<el-pagination
			@current-change="handleCurrentChange"
			:current-page="formInline.pageNumber"
			:page-size="formInline.pageSize"
			layout="total, prev, pager, next, jumper"
			:total="pageResult.total">
		</el-pagination>
		<el-dialog title="评价" :visible.sync="dialogFormVisible">
			<el-form :model="formEvaluation">
				<el-form-item label="评价内容" :label-width="formLabelWidth">
					<el-input
						type="textarea"
						:rows="2"
						placeholder="请输入评价内容"
						v-model="formEvaluation.evaluation">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateCounsel()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="回复" :visible.sync="dialogFormVisible2">
		<el-form :model="formReply">
			<el-form-item label="回复内容" :label-width="formLabelWidth">
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入回复内容"
					v-model="formReply.reply">
				</el-input>
			</el-form-item>
		</el-form>
			<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible2 = false">取 消</el-button>
			<el-button type="primary" @click="updateCounselReply()">确 定</el-button>
		</div>
		</el-dialog>
	</div>        
</div>

</template>
<script>
import api from '@/api/index';
import {projectPhase,getStatusNameByStatus,judgeRoleByUserName,selectUpdateRouteByStatus} from '@/utils/util';

export default {
    data() {
        return {
			dialogFormVisible:false,
			dialogFormVisible2:false,
			// 评价表单数据  
			formEvaluation: {
				updateType:2,//评价
				evaluation:"",//评价内容
				id:"",//id
			},
			// 回复表单数据
			formReply: {
				updateType:1,//回复
				reply:"",//回复内容
				replyUser:sessionStorage.getItem("user"),//回复人
				id:"",//id
			},
			formLabelWidth: '120px',
            zbCompanyList:[],
            username:sessionStorage.getItem("user"),
            show1:true,
            getStatusNameByStatus:getStatusNameByStatus,
            judgeRoleByUserName:judgeRoleByUserName,
            pageResult:{

            },
            formInline: {
                pageSize:10,
                pageNumber:1,
                title:'',
                projectName:'',
                counselUser:'',
                type:1,
            }
        }
    },
    methods: {
        handleConsel(index,row){//咨询
           this.$router.push({path:"/workbench/project/counsel",query:{id:row.id,name:row.name,}});
        },   
        handleEdit(index,row){//跟进
           let router = selectUpdateRouteByStatus(row.status);
           this.$router.push(router + "?id=" + row.id);
		},
		//条件分页查询
        search:function(formInline){
            api.counsel.pageCounselSearch(formInline).then(response => {
            console.info(response)
            this.pageResult = response.data
        });
		},
		//页码改变
        handleCurrentChange: function(currentPage){
            this.formInline.pageNumber = currentPage
            this.search(this.formInline)
		},
		//查询
        onSubmit(){
            this.formInline.pageNumber = 1
            this.search(this.formInline)
		},
		//评价
		updateCounsel() {
			this.dialogFormVisible = false;
			api.counsel.updateCounsel(this.formEvaluation).then((response) => {
				console.info(response);
				this.search(this.formInline);
			});
		},
		//回复
		updateCounselReply() {
			this.dialogFormVisible2 = false;
			api.counsel.updateCounsel(this.formReply).then((response) => {
				console.info(response);
				this.search(this.formInline);
			});
		},
		openReplyDialog(id){
			this.dialogFormVisible2 = true;
			this.formReply.id = id;
		},
		openEvaluationDialog(id){
			this.dialogFormVisible = true;
			this.formEvaluation.id = id;
		}
    },
    created() {
        //获取当前用户角色
		api.login.getUserRoleApi().then(response => {
            sessionStorage.setItem("roleName",response)
        });
		//查询总包单位赋值下拉框
		api.project.getUserByRoleNamePost("zb").then(response => {
            this.zbCompanyList = response.data
        });
        this.search(this.formInline)
    },
}
</script>
 

<style lang='scss'>
.design_counsel_list{
    margin: 0 auto;
    padding: 15px 25px;
    position: relative;
    .title{
        position: absolute;
        right: 85px;
        z-index: 1000;
        top: 68px;
		background-color: #fff;
    }
	.bgc{
		height: 200px;
		margin: 0 auto;
		width: 90%;
    	background: url('~@/assets/img/ditu.png') center center no-repeat;
	}
	.heiseziti .el-form-item__label{
			color: #000!important;
			font-size: 18px;
			font-weight: 700;
	}
	.demo-form-inline{
		text-align: center;
		padding-top: 80px;
		.el-input__inner{
			opacity:0.8;
		}
	}
	.zxw{
		width: 70%;
    	margin: 0 auto;
	}

	.zimiaoshu{
		border-bottom: 1px solid #ccc;
		margin-bottom: 50px;
		color: #7b7978;
		.miaoshuneirong2{
			margin-left: 48px;
			margin-top: 0;
			font-size: 20px;
			padding-bottom: 10px;
			color: #000;
			font-weight: 700;
		}
	}
	.biaoti{
		margin-left: 10px;
		font-size: 24px;
		margin-bottom: 50px;
		font-weight: 700;
	}
	.tec,.fl,.fr{
		color: #bdb9b9;
	}
	.tec{
		text-align: center;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.huifu{
		width: 90%;
		background-color: #f2f2f2;
		border-radius: 20px;
		text-indent:2em;
		line-height: 60px;
		margin-bottom: 10px;
		margin-top:10px;
		margin-left: 10px;	
		padding: 24px;
	}
	.mt10{
		margin-top: 10px;
		 text-indent:2em;
	}
	.mt20{
		margin-top: 20px;
	}
	.pjhf{
		float: right;
		margin-right: 100px;
		.pjhfhuigu{
			font-size: 24px;
		}
	}
}
</style>
