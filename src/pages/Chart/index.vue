<template>
	<div class="Chart">
		<div class="Chart_tab">
			<span :class="list1"  @click="Chart_tabs(0)">
				<img src="../../../static/assets/nav-home33.png"/>
	      		<img src="../../../static/assets/nav-home33-s.png"/>
				涨势图
			</span>
			<span :class="list2"  @click="Chart_tabs(1)">
				<img src="../../../static/assets/Charts-lx.png" />
				<img src="../../../static/assets/Charts-lx-s.png" />
				利息图</span>
			<span :class="list3"  @click="Chart_tabs(2)">
				<img src="../../../static/assets/Charts-jy.png" />
				<img src="../../../static/assets/Charts-jy-s.png" />
			成交量</span>
		</div>
		<div class="chart">
			<ec-canvas v-if="list1.length>0?true:false" class="echarts" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
			<ec-canvas v-if="list2.length>0?true:false" class="echarts" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
			<ec-canvas v-if="list3.length>0?true:false" class="echarts" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
		</div>
	</div>
</template>

<script>
	import {price,interest,volume} from '../../api/Chart.js'
	/*图表数据*/
	var  myChart;
	const polar={
		title: {
        	text: '区块猫涨跌走势图',
        	textStyle:{
        		color:'#937726'
        	},
        	left:'30%'
    	},
    	grid:{
    		containLabel:true,
    		left:'5%',
    		right:'5%',
    		top:'20%',
    		bottom :'5%'
    	},
		tooltip: {
        	trigger: 'axis',
        	triggerOn:"click"
   		},	
		xAxis: {
	        type: 'category',
	        data: ["04-03","04-04","04-05","04-06","04-07","04-08","04-09","04-10","04-11","04-12","04-13","04-14","04-15","04-16","04-17","04-18","04-19","04-20","04-21","04-22","04-23","04-24","04-25","04-26","04-27","04-28","04-29","04-30","05-01","05-02"]
	    },
	    yAxis: {
	        type: 'value',
	        axisLine:{
	        	show:false
	        }
	    },
	    dataZoom:[{
	    	type:'inside',
	    	start:0,
	    	end:40,
	    	orient:"horizontal"
	    }],
	    series: [
	    {
	    	name:"资产/h",
	        data: [0,0,0,0,0,0,0,0,0,0,0,0,9000,0,0,0,0,0,0,0,0,0,0,0,0,10,4000,500,121,123],
	        type: 'line',
	        itemStyle:{
	        	color:"#76589b"
	        },
	        lineStyle:{
	        	color:"#76589b"
	        },
	    }
	    ]
	}
	export default {
	  data(){
	  	return{
			list1:"list",
			list2:"",
			list3:"",
			ec:{
				options:polar
			}
	  	}
	  },
	  methods: {
	  	Chart_tabs(index){
	  		switch(index){
	  			case 0 :
	  			this.list1="list";
	  			this.list2="";
	  			this.list3="";
	  			this.zhangdie();
	  			break;
	  			case 1 : 
	  			this.list1="";
	  			this.list2="list";
	  			this.list3="";
	  			this.lixi();
	  			break;
	  			case 2 : 
	  			this.list1="";
	  			this.list2="";
	  			this.list3="list";
	  			this.chengjiao();
	  			break;
	  		}	  		
	  	},
	  	/*涨跌图*/
	  	zhangdie(loaded){
	  		polar.title.text="区块猫涨跌走势图"
	  		price({}).then(res=>{
	  			if(res){
		  			if(loaded){loaded('done');}
		  			polar.xAxis.data=res.time;
					polar.series[0].data=res.data;
				}
	  		}).catch(e=>{
	  			wx.showToast({title:e,duration: 2000});
	  		})
	  		
	  		
	  	},
	  	/*利息*/
	  	lixi(){
	  		polar.title.text="区块猫利息走势图"
	  		interest({}).then(res=>{
				if(res){
					polar.xAxis.data=res.time;
					polar.series[0].data=res.data;
				}
	  		}).catch(e=>{
	  			wx.showToast({title:e,duration: 2000});
	  		})
	  	},
	  	/*成交量*/
	  	chengjiao(){
	  		polar.title.text="区块猫成交量走势图"
	  		volume({}).then(res=>{
				if(res){
					polar.xAxis.data=res.time;
					polar.series[0].data=res.data;
				}
	  		}).catch(e=>{
	  			wx.showToast({title:e,duration: 2000});
	  		})
	  	}
	  },
		mounted(){	
			const $$this=this;			
			$$this.zhangdie();	
			wx.showTabBar();
		}
	};
</script>

<style>
	.Chart .Chart_tab{height:50px; line-height:50px;color:#aa8a2f;padding:0 16px;}
	.Chart .Chart_tab span{margin-right:20px; font-size:14px;}
	.Chart .Chart_tab span img{vertical-align:middle;width:12px; height:12px;}
	.Chart .Chart_tab span:nth-child(2) img{width:10px; height:12px; margin-right:2.4px;}
	.Chart .Chart_tab span img:nth-child(2){display: none;}
	.Chart .Chart_tab span.list{color:#ff9000;}
	.Chart .Chart_tab span.list img:nth-child(2){display: inline-block;}
	.Chart .Chart_tab span.list img:nth-child(1){display: none;}
	.Chart .chart{height:240px;padding:16px;width:340px;}
	.Chart .echarts{background-color:#FFFFFF;width:100%;height:100%;}
</style>