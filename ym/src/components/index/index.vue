<template>
	<div class="wrap" ref="homePage">
		<div class="ym-header">
		{{ymtitle}}
		</div>
		<div class="ym-content" :style="{height:clientHeight-50+'px'}">
			<div class="ym-top-color"></div>
			<div class="ym-swiper" >
				<swiper :options="swiperOption" style="height: 100%;">
				 <swiper-slide >
				  <combined></combined>
				</swiper-slide>
				  <swiper-slide  >
				    <statistical></statistical>
				  </swiper-slide>
				  <swiper-slide >
				    <days :list="daylist" :listwei="weilist" :safelist="safelist" :aiqi="sex_days" ></days>
				  </swiper-slide>
				  
				<div class="swiper-scrollbar"></div> 
				  <div class="swiper-pagination"  slot="pagination"></div>
				</swiper>
			</div>
		</div>
		<div class="ym-foot">
			<router-link to='/remind'>
			<div class="foot-left">我的提醒</div>
			 </router-link>
			 <router-link to='/setup'>
			<div class="foot-right">我的设置</div>
			 </router-link>
		</div>
		
	</div>
	
</template>

<script>
	import statistical from './statistical.vue'
	import days from './days.vue'
	import combined from './combined.vue'
	import { mapState,mapMutations  } from 'vuex'
	
// import api from '../../axios/api.js'
	
	export default {
		name:"index",
		data() {
			const that = this
			return {

				
				swiperOption: {
				  pagination: ".swiper-pagination",
				  speed: 300,
				  loop: false,
				  autoplay:3000,
				  disableOnInteraction: false,
				  stopOnLastSlide: false,
				  pagination: {
				  el: ".swiper-pagination",
				  clickable: true,
				  type: "bullets",
				  },
				  on:{
					  transitionEnd:function(){
						that.bannnerindex = this.activeIndex
					  }
				  },
				  initialSlide:1,
				},
				id:1,
				ymtitle:"姨妈管家",
				clientHeight:'',
				bannnerindex:'',
				user_id:"",
				daylist:[],
				weilist:[],
				safelist:[],
				sex_days:[],
			};
		},
		computed:{
			...mapState([
				'userid'
			]),
			
		},
		created() {
			
		},
		mounted() {
			this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;																						//console.log(self.clientHeight);
			window.onresize = function temp() {
			    this.clientHeight = `${document.documentElement.clientHeight}`;
			};
			this.calendars()
		},
		watch: {
		  // 如果 `clientHeight` 发生改变，这个函数就会运行
		  clientHeight: function (e) {
			this.changeFixed(this.clientHeight)
		  },
			
			$route(to, from) {
				if(to.query.set == 1){
					this.calendars()
				}
			},
		//实时监听数据的变化
		 bannnerindex:function(e){
			 if(e == 0 ){
				 this.ymtitle = '统计'
			 }else if(e == 1){
				  this.ymtitle = '姨妈管家'
			 }else if(e == 2){
				  this.ymtitle = '日历'
			 }
		 },
		 
		 userid:function(e){
		 	if(e != ""){
		 		this.calendars()
		 	}else{
		 		console.log("ee")
		 	}
		 }
		},
		
		methods:{
			changeFixed(clientHeight){
				this.$refs.homePage.style.height = clientHeight+'px';
			},
			calendars:function(){
				let date=new Date;
				let year=date.getFullYear()
				var month=date.getMonth()+1;
				var qs = require('qs');	
				 this.$api.code.calendar(this.userid).then(response => {
				    let res = response.data
					if(res.flag == "Success"){ 
						this.daylist = res.data[year][month].ovulate_days 
						// this.weilist = res.data[year][month].menses_days
						if(res.data[year][month].first_safe_days == undefined){
							this.safelist = []
						}
						if(res.data[year][month].second_safe_days == undefined){
							this.safelist = []
						}
						if(res.data[year][month].first_safe_days != undefined){
							this.safelist = res.data[year][month].first_safe_days
						}
						if(res.data[year][month].second_safe_days != undefined){
							this.safelist = res.data[year][month].second_safe_days
						}
						if(res.data[year][month].first_safe_days != undefined && res.data[year][month].second_safe_days != undefined){
							this.safelist= res.data[year][month].first_safe_days.concat(res.data[year][month].second_safe_days)
						}
						
						
						
						if(res.data[year][month].next_menses_days == undefined || res.data[year][month].menses_days == undefined) {
							this.weilist = []
						}
						if(res.data[year][month].next_menses_days != undefined){
							this.weilist = res.data[year][month].next_menses_days
						}
						if(res.data[year][month].menses_days != undefined){
							this.weilist = res.data[year][month].menses_days
						}
						if(res.data[year][month].next_menses_days != undefined && res.data[year][month].menses_days != undefined){
							this.weilist = res.data[year][month].next_menses_days.concat(res.data[year][month].menses_days)
						}
						// this.safelist= res.data[year][month].first_safe_days.concat(res.data[year][month].second_safe_days) || res.data[year][month].first_safe_days,
						this.sex_days = res.data[year][month].sex_days
						// this.second_safe = res.data[year][month].second_safe_days
					}else{
						console.log(res.msg)
					}
				})
			}
		},
		components: {
			statistical,
			days,
			combined,
		}
		
	}
</script>

<style scoped>
.wrap{
	/* overflow: hidden; */
	position: relative;
}
.ym-top-color{
	height: 6.5rem;
	width: 100%;
	background: #feaedd;
	position: absolute;
	top: 0;
	z-index: 0;
}
.ym-header{
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	background: #feaedd;
	color: #fff;
	font-size: .34rem;
	text-align: center;
	position: relative;
	z-index: 1;
}
.ym-content{
	background: #f9f9f9;
	width: 100%;
	overflow: hidden;
}
.ym-swiper{
	/* height: 50rem; */
	position: relative;
	height: 90%;
	background: #fff;
	border-radius: 10px;
	width: 90%;
	margin:  0.3rem auto;
	background: transparent;
}
.ym-foot{
	position: absolute;
	bottom: .3rem;
	z-index: 99999999999999999999999;
	font-size: .3rem;
	color: #949494;
	display: flex;
	width: 100%;
}
.ym-foot a{
	color: #949494;
	flex: 1;
}
.foot-right{
	text-align: right;
	margin-right: .3rem;
}
.foot-left{
	margin-left: .3rem;
}
</style>
