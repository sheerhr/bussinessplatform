<template>
    <div id="productCodeList" >
        <div class="fu">
           <!-- <div class="home_title">平台特点</div> -->
           <el-row :gutter="12">
                <el-col :span="6">
                     <el-card>
                         <div>
                            <img class="cardimg" src="../../assets/img/hello.png" alt="">
                            <span class="home_subtitle">欢迎您</span>
                         </div>
                        <div class="neiro">{{username}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                   <el-card>
                         <div>
                            <img class="cardimg" src="../../assets/img/zaijian.png" alt="">
                            <span class="home_subtitle">在建项目</span>
                         </div>
                        <div class="neiro fsi40">{{project.goingCount}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                   <el-card>
                         <div>
                            <img class="cardimg" src="../../assets/img/jungong.png" alt="">
                            <span class="home_subtitle">竣工项目</span>
                         </div>
                        <div class="neiro fsi40">{{project.completeCount}}</div>
                    </el-card>
                </el-col>
                 <el-col :span="6">
                  <el-card>
                         <div>
                            <img class="cardimg" src="../../assets/img/zixuntixing.png" alt="">
                            <span class="home_subtitle">版本</span>
                         </div>
                         <div style="text-align: center; line-height: 40px;"> <span class="neiro">2.0</span></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="12">
                 <el-col :span="8">
                     <el-card>
                        <div class="Projecthader" >
                            <span>项目进展</span>
                        </div>
                        <ul class="textitem" style='cursor:pointer'>
                            <li  :key="project.id" v-for="project in projectList" @click="goProjectDetail(project)">
                                {{ project.name }}
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="8">
                     <el-card >
                        <div class="Projecthader" >
                            <router-link to="/workbench/counsel/designCounsel">咨询进度</router-link>
                        </div>
                        <ul class="textitem1" style='cursor:pointer'>
                            <li :key="counsel.id" v-for="counsel in counselList" @click="goCounselDetail(counsel)">
                                {{ counsel.title }}
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="8">
                     <el-card>
                        <div class="Projecthader" >
                            <a target="_blank" href='http://www.chorain.com/our_news'>通知公告</a>
                        </div>
                        <ul class="textitem2">
                            <li>1. 卓源科技通告</li>
                            <li>2. 大矾山项目结束通告</li>
                            <li>3. 南京科技馆项目通通知</li>
                            <li>4. 上海云台项目开会通告</li>
                            <li>5. 滁州文体项目开工通知</li>
                        </ul>
                    </el-card>
                </el-col>
            </el-row>
             <el-row :gutter="12">
                 <el-col :span="8">
                     <el-card>
                        <div class="Projecthader" >
                            <span>项目年度分布图</span>
                        </div>
                        <div id="barEcharts" class="whmauto"></div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                     <el-card>
                        <div class="Projecthader" >
                            <span>项目地域分布图</span>
                        </div>
                       <div class="teact">
                            <div id="pieEcharts" class="whmauto"></div>
                       </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                     <el-card>
                        <div class="Projecthader" >
                            <span>项目合同额度分布图</span>
                        </div>
                       <div id="barEcharts2" class="wh54"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import api from "@/api/index";
export default {
    data() {
        return {
            username:sessionStorage.getItem("user"),
            project:{},
            projectList:[],
            counselList:[],
        }
    },
    methods: {
        projectCount(){//当前在建项目和竣工项目
            api.project.goingAndCompleteProject().then(response => {
                if(response.state == 200){
                    this.project = response.data;
                }
            }).catch(e => {
                console.log(e);
            });
        },
        recentlyProject(){//最新项目进展
            api.project.listRecentlyProject().then(response => {
                if(response.state == 200){
                    this.projectList = response.data.rows;
                }
            }).catch(e => {
                console.log(e);
            });
        },
        pageHome(){//最新咨询进度
            api.counsel.pageHome().then(response => {
                if(response.state == 200){
                    this.counselList = response.data.rows;
                }
            }).catch(e => {
                console.log(e);
            });
        },
        countProjectByYear(){//项目年度
            api.project.countProjectByYear().then(response => {
                if(response.state == 200){
                    this.barEcharts(response.data.xaxis,response.data.yaxis);
                }
            }).catch(e => {
                console.log(e);
            });
        },
        countProjectByProvince(){//项目省份
            api.project.countProjectByProvince().then(response => {
                console.log(response);
                if(response.state == 200){
                    this.pieECharts(response.data.legend,response.data.series);
                }
            }).catch(e => {
                console.log(e);
            });
        },
        countProjectByScale(){//项目规模
            api.project.countProjectByScale().then(response => {
                console.log(response);
                if(response.state == 200){
                   this.barEcharts2(response.data.yaxis,response.data.xaxis);
                }
            }).catch(e => {
                console.log(e);
            });
        },
        barEcharts(xAxisData,seriesData){
            // 基于准备好的dom，初始化echarts实例
            let barEcharts = this.$echarts.init(document.getElementById('barEcharts'));
            // 绘制图表
            barEcharts.setOption({
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesData,
                    type: 'bar'
                }]
            });
        },
        pieECharts(legendData,seriesData){
            // 基于准备好的dom，初始化echarts实例
            let pieECharts = this.$echarts.init(document.getElementById('pieEcharts'))
            // 绘制图表
            pieECharts.setOption({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: legendData
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: seriesData
                    }
                ]
            });
        },
        barEcharts2(yAxisData,seriesData) {
            // 基于准备好的dom，初始化echarts实例
            let barEcharts2 = this.$echarts.init(document.getElementById('barEcharts2'));
            // 绘制图表
            barEcharts2.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 1]
                },
                yAxis: {
                    type: 'category',
                    data: yAxisData
                },
                series: [
                    {
                        name: '项目数',
                        type: 'bar',
                        data: seriesData
                    }
                ]
            });
        },
        //项目进展
        goProjectDetail(project){
            this.$router.push("/workbench/project/detail?id="+project.id)
        },
        //咨询进展
        goCounselDetail(counsel){
            if(counsel.type==1){
                this.$router.push("/workbench/counsel/designCounsel")
            }else if(counsel.type==2){
                this.$router.push("/workbench/counsel/purchaseCounsel")
            }else if(counsel.type==3){
                this.$router.push("/workbench/counsel/constructionCounsel")
            }
        }
    },
    mounted(){
        this.countProjectByYear();//项目年度分布Echarts
        this.countProjectByProvince();//项目省份Echarts
        this.countProjectByScale();//项目规模Echarts
   },
   created(){
        this.projectCount();//当前在建项目和竣工项目
        this.recentlyProject();//最近项目
        this.pageHome();//最近咨询
   }
}
</script>
 

<style lang='scss'>
#productCodeList{
    .teact{
        width: 100%;
        text-align: center;
    }
    // .home_title{
    //     font-weight: 900;
    //     font-size: 20px;
    //     color: rgb(54, 96, 146);
    //     padding-left: 5px;
    //     border-left: 4px solid #fb973f;
    // }
    .cardimg{
        width: 50px;
        vertical-align:text-top;
    }
    .home_subtitle{
        color: #c6c6c6;
        font-size: 20px;
        margin-left: 10px;
    }
    .neiro{
        font-size: 18px;
        text-align: center;
        font-weight: bolder;
        height: 40px;
    }
    .fsi40{
        font-size: 40px;
    }
    .neiro1{
        position: relative;
        display: inline-block;
        font-size: 18px;
        text-align: center;
        margin: 0 auto;
        line-height: 40px;
        height: 40px;

    }
    .jiaobiao{
        position: absolute;
        width: 20px;
        height: 20px;
        right: -15px;
        top: -2px;
        background-color: crimson;
        border-radius: 50%;
        line-height: 20px;
    }
    .Projecthader{
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 24px;
    }
    .textitem,.textitem1,.textitem2{
        margin: 0;
        padding-left: 10px;
    }
    .textitem li:nth-of-type(n),.textitem1 li:nth-of-type(n),.textitem2 li:nth-of-type(n){
        font-size: 16px;
        padding-bottom: 30px;
        height: 16px;
        line-height: 40px;
        text-indent:1em;
        list-style-type:none;
        border-bottom: 1px solid #ccc;
    }
    .textitem li:nth-of-type(n)::before,.textitem1 li:nth-of-type(n)::before,.textitem2 li:nth-of-type(n)::before{
        content: "●";
        font-size: 30px;
        padding-right: 14px;
    }
    .textitem li:nth-of-type(n)::before{
        color: #4ccaf3;
    }
    .textitem1 li:nth-of-type(n)::before{
        color: #ffa800;
    }
    .textitem2 li:nth-of-type(n)::before{
        color: #bd9deb;
    }
    .textitem2 li:nth-of-type(2n){
        background-color: #f0f1f0; 
    }
    .textitem2 li:nth-of-type(n){
        border-bottom:none;
    }
    .whmauto{
        width: 500px; 
        height: 400px;
        margin: 0 auto;
    }
    .wh54{
        width: 500px; 
        height: 400px;
    }
    .textitem1 li{
        overflow: hidden;
    }
    .textitem li{
        overflow: hidden;
    }
}

</style>
