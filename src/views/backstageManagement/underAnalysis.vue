<template>
<!-- 在建分析 -->
    <div id="underAnalysis">
        <div class="home_title">数据中心</div>
		<el-card class="ovhi">
			<div class="sjzxgk">数据中心概况</div>
			<ul class="listicon">
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/ip.png" alt="" srcset="">
						<span >公网IP</span>
					</div>
					<div class="listiconnnr">1</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/fanghuoqiang.png" alt="" srcset="">
						<span >安全系统</span>
					</div>
					<div class="listiconnnr">4</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/fuzaijunheng.png" alt="" srcset="">
						<span >负载均衡</span>
					</div>
					<div class="listiconnnr">1</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/hxjiaohuanji.png" alt="" srcset="">
						<span >核心交换机</span>
					</div>
					<div class="listiconnnr">1</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/fuwuqi.png" alt="" srcset="">
						<span >服务器</span>
					</div>
					<div class="listiconnnr">6</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/hjjiaohuanji.png" alt="" srcset="">
						<span >汇聚交换机</span>
					</div>
					<div class="listiconnnr">12</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/jrjiaohuanji.png" alt="" srcset="">
						<span >接入交换机</span>
					</div>
					<div class="listiconnnr">42</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/ups.png" alt="" srcset="">
						<span >ups</span>
					</div>
					<div class="listiconnnr">1</div>
				</li>
				<li>
					<div>
						<img class="listiconimg" src="../../assets/img/zhuji.png" alt="" srcset="">
						<span >主机</span>
					</div>
					<div class="listiconnnr">116</div>
				</li>
			</ul>
		</el-card>
		 <el-row :gutter="24">
                <el-col :span="11">
                     <el-card>
                        <div class="por">
							<img class="hhhh" src="../../assets/img/zhuihuipingtai.png" alt="" srcset="">
						</div>
                    </el-card>
                </el-col>
                <el-col :span="11">
                   <el-card>
                       	<div class="Projecthader" >
                            <span>合肥数据中心</span>
                        </div>
                       <div class="wh450">
						   <div class="fl">
							   <div class="miaoshu ys1">负载均衡</div>
							   <img class="wh11" src="../../assets/img/fuzai_data.png" alt="">
							   <p>CPU:21.5%</p>
							   <p>内存：31.1%</p>
						   </div>
						  <div class="fr">
							   <div class="miaoshu2 ys2">cpu</div>
							   <img class="wh11"  src="../../assets/img/cpu_data.png" alt="">
							   <p>利用率：32.7%</p>
							   <p>线程：5560</p>
						   </div>
					   </div>
                      
                      
                       <div class="wh450">
						   <div class="fl">
							   <div class="miaoshu ys3">内存</div>
							   <img class="wh11"  src="../../assets/img/neicun_data.png" alt="">
							   <p>已分配：65536</p>
							   <p>已使用：22356</p>
						   </div>
						  <div class="fr">
							   <div class="miaoshu2 ys4">储存</div>
							   <img class="wh11"  src="../../assets/img/cunzhu_data.png" alt="">
							   <p>已格式化：16384</p>
							   <p>已分配：5342</p>
							   <p>已使用：5342</p>
						   </div>
					   </div>
                    </el-card>
                </el-col>
                
            </el-row>
    </div>
</template>

<script>

export default {
  data() {
		return {
			
		};
	},
	methods: {
	
	},
	created() {
		
	}
};
</script>

<style lang="scss" >
#underAnalysis{
	.home_title{
        font-weight: 900;
        font-size: 20px;
        color: rgb(54, 96, 146);
        padding-left: 5px;
        border-left: 4px solid #fb973f;
    }
	.ovhi{
		overflow: hidden;
	}
	.sjzxgk{
		font-weight: 700;
		font-size: 24px;
		margin-left: 20px;
		float: left;
	}
	.listicon li{
		list-style: none;
		padding-right: 20px;
		border-right: 2px solid #ccc;
		padding-left: 20px;
		padding-top: 4px;
	}
	.listicon{
		// margin-top: 0;
		overflow: hidden;
		.listiconimg{
			vertical-align: middle;
			width: 30px;
			height: 30px;
		}
		.listiconnnr{
			text-align: center;
			margin: 0 auto;
			font-size: 20px;
    		padding-left: 28px;
		}
	}
	.listicon  li{
		float: left;
	}
	.hhhh{
		width: 68%;
	}
	.por{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center; /*垂直居中*/
		justify-content: center; /*水平居中*/	
	}
	.Projecthader{
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 24px;
    }
	.wh450{
		width: 450px;
		text-align: center;
		margin: 0 auto;
		overflow: hidden;
		.fl{
			float: left;
			.miaoshu{
				margin-top: 20px;
				margin-bottom: 10px;
				font-size: 18px;
				font-weight: 700;
			}
			.ys1{
				color: #4dbdc4;
			}
			.ys3{
				color: #bb8eef;
			}
			.wh11{
				width: 134px;
				height: 134px;
			}
		}
		.fl p{
			margin: 0;
		}
		.fl p:nth-of-type(1){
				margin-top: 10px;
		}
		.fr{
			float: right;
			.miaoshu2{
				margin-top: 20px;
				margin-bottom: 10px;
				font-size: 18px;
				font-weight: 700;
			}
			.wh11{
				width: 133px;
				height: 133px;
			}
			.ys2{
				color: #ff9a50;
			}
			.ys4{
				color: #89d270;
			}
		}
		.fr p{
			margin: 0;
		}
		.fr p:nth-of-type(1){
				margin-top: 10px;
		}
	}
	

}
</style>


