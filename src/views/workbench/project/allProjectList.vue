<template>
<!-- 所有项目列表 -->
<div class='all_project_list'>
    <div class='title'>
        <el-button v-if="'admin|workbench|sjb'.indexOf(roleName)!=-1" type="primary" @click="$router.push('/workbench/project/createProject')">
                创建项目
        </el-button>
    </div>
        <el-card>
        <div class='content' >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="项目名称">
                    <el-input v-model="formInline.name" placeholder="项目名称"></el-input>
                </el-form-item>
				<el-form-item label="总包单位">
                    <el-select v-model="formInline.zbCompany" placeholder="请选择">
                        <el-option
                            v-for="item in zbCompanyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="省份">
					<v-distpicker 
						:province="formInline.province" 
						only-province
						@selected="onSelected">
					</v-distpicker>
                </el-form-item>
				<el-form-item label="项目阶段">
                        <el-select v-model="formInline.status" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>            
            <el-table :data="pageResult.rows" style="margin-bottom:20px;" stripe border>
                <el-table-column type="index" label="序号" width="50">    
                </el-table-column>
                <el-table-column prop="name" label="项目名称" width="">    
                    <template slot-scope="scope">
                        <el-link type="primary" @click="lookDetails(scope.row.id)">{{scope.row.name}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="总包单位" width="">    
                    <template slot-scope="scope">
                        {{scope.row.zb_company_name}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="省份" width="">    
                    <template slot-scope="scope">
                        {{scope.row.province}}
                    </template>
                </el-table-column>
                <el-table-column label="项目规模" width="">
                    <template slot-scope="scope">{{ scope.row.scale }}万</template>
                </el-table-column>
                <el-table-column label="当前进度">
                    <template slot-scope="scope">{{ getStatusNameByStatus(scope.row.status) }}</template>
                </el-table-column>
				<el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        v-if="judgeRoleByUserName(username)==0"
                        size="small"
                        @click="handleConsel(scope.$index, scope.row)">咨询</el-button>
                        <el-button
                        size="small"
                        v-if="judgeRoleByUserName(username)==1&&scope.row.status!=0&&judgeFLagByStatus(scope.row.status)"
                        @click="handleEdit(scope.$index, scope.row)">跟进</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="formInline.pageNumber"
                :page-size="formInline.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="pageResult.total">
            </el-pagination>
        </div>   
        </el-card>     
    </div>

</template>
<script>
import api from '@/api/index';
import {projectPhase,getStatusNameByStatus,judgeRoleByUserName,selectUpdateRouteByStatus,judgeFLagByStatus} from '@/utils/util';

export default {
    data() {
        return {
            roleName:'',
            zbCompanyList:[],
            username:sessionStorage.getItem("user"),
            show1:true,
            getStatusNameByStatus:getStatusNameByStatus,
            judgeRoleByUserName:judgeRoleByUserName,
            judgeFLagByStatus:judgeFLagByStatus,
            pageResult:{
            },
            formInline: {
				name: '',
				zbCompany:'',
				province:'',
                status:'',
                pageSize:10,
                pageNumber:1,
            },
			formData:{
				province:'',
			},
            options:projectPhase,
        }
    },
    methods: {
        //省选择事件
        onSelected(data) {
            this.formInline.province = data.province.value;
        },
        handleConsel(index,row){//咨询
           this.$router.push({path:"/workbench/project/counsel",query:{id:row.id,name:row.name}});
        },   
        handleEdit(index,row){//跟进
           let router = selectUpdateRouteByStatus(row.status);
           this.$router.push(router + "?id=" + row.id);
        },
        //分页条件查询
        search:function(formInline){
            api.counsel.pageSearch(formInline).then(response => {
                this.pageResult = response.data
            });
        },
        //当前页码改变
        handleCurrentChange: function(currentPage){
            this.formInline.pageNumber = currentPage
            this.search(this.formInline)
        },
        //查询
        onSubmit(){
            this.formInline.pageNumber = 1
            this.search(this.formInline)
        },
        //查询详情
        lookDetails(id){
            this.$router.push({path:"/workbench/project/detail",query:{id:id}});
        },
    },
    created() {
        //获取当前用户角色
		api.login.getUserRoleApi().then(response => {
            this.roleName = response
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
.all_project_list{
    margin: 0 auto;
    padding: 15px 25px;
    position: relative;
    .title{
        position: absolute;
        right: 85px;
        z-index: 1000;
        top: 68px;
    }
}
</style>
