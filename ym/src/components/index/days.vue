<template>
	<div class="">
	<div class="ym-days">
		<Calendar
		  v-on:choseDay="clickDay"
		  v-on:changeMonth="changeDate"
		 :markDateMore="arr"
		 ref = "listref"
		></Calendar>
		<state></state>
	</div>
	<div class="ym-days-ai">
		<img src="../../../static/img/xin.png" alt="">
		<span class="font">爱爱记录</span>
		<div class="aiSwitch">
			<el-switch
			  v-model="aiSwitch"
			  active-color="#fec3dd"
			  inactive-color="#e5e5e5"
			  @change="aiSwitchout"
			  >
			</el-switch>
		</div>
	</div>
	</div>
</template>

<script>
	import Calendar from 'vue-calendar-component';
	import state from './state.vue'
	import { mapState,mapMutations  } from 'vuex'
	export default {
		name:"days",
		 props: {
		  list: Array,
		  listwei:Array,
		  safelist:Array,
		  sexday:Array,
		  aiqi:Array,
		  twosafelist:Array,
		},
		data() {
			return {
				  arr: [
					   
				  ],
				  aiSwitch:false,
				  security:this.safelist, //安全
				  dangerous:this.listwei,   //姨妈
				  ovulation:this.list,			//ovulation
				  tag:this.aiqi.__ob__.value || [],
				  remove:[],
				  data:'',
				  datanumber:[],
				  sex_time:"",
				  inmonth:"",
			};
		},
		
		  
		watch:{
			data:function(e){
				let data = e.split("/")[2]
				this.datanumber = data
				if(this.tag != undefined){
					for(let i = 0; i<this.tag.length;i++){
						if(this.datanumber == this.tag[i]){
							this.aiSwitch = true
							 break; 
						}else{
							this.aiSwitch = false
						}
					}
				}
			},
			list(n) {
			  this.ovulation = n
			  this.test()
			},
			listwei(n){
				this.dangerous = n
				this.test()
			},
			safelist(n){
				this.security = n
				this.test()
			},
			aiqi(n){
				this.tag = n 
				this.test()
			},
			$route(to, from) {
				if(to.query.set == 1){
					this.security=""
					this.dangerous=""
					this.ovulation=""
					this.tag=""
					this.test()
				}
			},

		},
		methods: {
			test(){
				function format(date, index) {
				  date = new Date(date);
				  return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
				}
				if(this.dangerous != undefined){
					for(var i = 0;i < this.security.length;i++){
						 this.arr.push({
							date: format(new Date(),this.security[i]),
							className: "mark1"
						});
					}
				}
				if(this.dangerous != undefined){
					for(var i = 0;i < this.dangerous.length;i++){
						 this.arr.push({
							date: format(new Date(),this.dangerous[i]),
							className: "mark2"
						});
					}
				}
				if(this.ovulation != undefined){
					for(var i = 0;i < this.ovulation.length;i++){
						 this.arr.push({
							date: format(new Date(),this.ovulation[i]),
							className: "mark3"
						});
					}
				}
				
				if(this.tag != undefined){
					for(var i = 0;i < this.tag.length;i++){
						 this.arr.push({
							date: format(new Date(),this.tag[i]),
							className: "mark4"
						});
					}
				}
			},
			month(e){
				function format(date, index) {
				  date = new Date(date);
				  return `${date.getFullYear()}-${this.inmonth}-${index}`;
				}
				for(var i = 0;i < this.security.length;i++){
					 this.arr.push({
						date: format(new Date(),this.security[i]),
						className: "mark1"
					});
				} 
				for(var i = 0;i < this.dangerous.length;i++){
					 this.arr.push({
						date: format(new Date(),this.dangerous[i]),
						className: "mark2"
					});
				}
				for(var i = 0;i < this.ovulation.length;i++){
					 this.arr.push({
						date: format(new Date(),this.ovulation[i]),
						className: "mark3"
					});
				}
				for(var i = 0;i < this.tag.length;i++){
					 this.arr.push({
						date: format(new Date(),this.tag[i]),
						className: "mark4"
					});
				}
			},
			 clickDay(data) {
			   //选中某天
			   //通过字符串截取 把/换成-
			   var result = data.split('/').join('-');
			   this.data = data
			   this.sex_time = result
			},
			changeDate(data) {
				//截取分割
			  var months = this.inmonth = data.split("/")[1]
			  let dates=new Date;
			  let year=dates.getFullYear()
			  var month=dates.getMonth()+1;
			  // var qs = require('qs');	
			  this.$api.code.calendar(this.userid).then(response => {
			      let res = response.data
			  	if(res.flag == "Success"){
					
			  		this.ovulation = res.data[year][months].ovulate_days || []
			  		// this.dangerous = res.data[year][months].next_menses_days || []
				
				if(res.data[year][months].next_menses_days == undefined || res.data[year][months].menses_days == undefined) {
					this.dangerous = []
				}
				if(res.data[year][months].next_menses_days != undefined){
					this.dangerous = res.data[year][months].next_menses_days
				}
				if(res.data[year][months].menses_days != undefined){
					this.dangerous = res.data[year][months].menses_days
				}
				if(res.data[year][months].next_menses_days != undefined && res.data[year][months].menses_days != undefined){
					this.dangerous = res.data[year][months].next_menses_days.concat(res.data[year][months].menses_days)
				}
				if(res.data[year][months].second_safe_days == undefined){
					this.security = []
				} 
				if(res.data[year][months].first_safe_days == undefined){
					this.security = []
				} 
				if(res.data[year][months].first_safe_days != undefined){
					this.security =res.data[year][months].first_safe_days
				}
				if(res.data[year][months].second_safe_days != undefined){
					this.security = res.data[year][months].second_safe_days
				}
				if(res.data[year][months].first_safe_days != undefined && res.data[year][months].second_safe_days != undefined){
					this.security = res.data[year][months].second_safe_days.concat(res.data[year][months].first_safe_days)
				} 


					function format(date, index) {
					  date = new Date(date);
					  return `${date.getFullYear()}-${months}-${index}`;
					}
					if(this.security != undefined){
						for(var i = 0;i < this.security.length;i++){
							 this.arr.push({
								date: format(new Date(),this.security[i]),
								className: "mark1"
							});
						}
					}
					if(this.dangerous != undefined){
						for(var i = 0;i < this.dangerous.length;i++){
							 this.arr.push({
								date: format(new Date(),this.dangerous[i]),
								className: "mark2"
							});
						}
					}
					
					if(this.ovulation != undefined){
						for(var i = 0;i < this.ovulation.length;i++){
							 this.arr.push({
								date: format(new Date(),this.ovulation[i]),
								className: "mark3"
							});
						}
					}
					if(months == month){
						for(var i = 0;i < this.tag.length;i++){
							 this.arr.push({
								date: format(new Date(),this.tag[i]),
								className: "mark4"
							});
						}
					}
					

			  	}else{
			  		console.log(res.msg)
			  	}
			  })
			},
			clickToday(data) {
			  console.log(data); // 跳到了本月
			},
			
			aiSwitchout(e){   // 开关进入
				if(e == true){
					this.$api.code.loveRecord(this.userid,this.sex_time,"do_sex").then(response => {
					    let res = response.data
						if(res.flag == "Success"){
							console.log(res)
						}else{
							console.log(res.msg)
						}
					})
					
					if(this.tag == undefined){
						this.tag = []
					}
					this.tag.push(this.datanumber)
					function format(date, index) {
					  date = new Date(date);
					  return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
					}
					for(var i = 0;i < this.tag.length;i++){
						 this.arr.push({
							date: format(new Date(),this.tag[i]),
							className: "mark4"
						});
					}
				}else{
					this.$api.code.loveRecord(this.userid,this.sex_time,"do_sex").then(response => {
					    let res = response.data
						if(res.flag == "Success"){
							console.log(res)
						}else{
							console.log(res.msg)
						}
					})
					let index = this.tag.indexOf(this.datanumber)
					console.log(index)
					this.tag.splice(index, 1);
					let indess = parseInt(this.datanumber)-1
					this.remove.splice(0,this.remove.length);
					this.remove.push(this.datanumber)
					function format(date, index) {
					  date = new Date(date);
					  return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
					}
					for(var i = 0;i < this.remove.length;i++){
						 this.arr.push({
							date: format(new Date(),this.remove[i]),
							className: "mark5"
						});
					}
				}
			},
			
			
		},
		components: {
			Calendar,
			state
		  },
		computed:{
			...mapState([
				'userid'
			]),
			
		},
		  mounted() {
			function format(date, index) {
			  date = new Date(date);
			  return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
			}
			for(var i = 0;i < this.security.length;i++){
				 this.arr.push({
					date: format(new Date(),this.security[i]),
					className: "mark1"
				});
			}
			for(var i = 0;i < this.dangerous.length;i++){
				 this.arr.push({
					date: format(new Date(),this.dangerous[i]),
					className: "mark2"
				});
			}
			for(var i = 0;i < this.ovulation.length;i++){
				 this.arr.push({
					date: format(new Date(),this.ovulation[i]),
					className: "mark3"
				});
			}
			
			for(var i = 0;i < this.tag.length;i++){
				 this.arr.push({
					date: format(new Date(),this.tag[i]),
					className: "mark4"
				});
			}
			 
		  },
		  created(){
			// console.log(document.getElementById('a').innerHTML)//1
			
		},
		  
	}
</script>

<style>
.ym-days{
	padding: 0 .1rem .3rem;
	background: #f5f5f5;
	border: 1px solid #fff;
	border-radius: 8px;
	margin: .4rem 0;
	height: 7.3rem;
}
.wh_content_item .wh_isToday[data-v-2ebcbc83]{
	border-radius:6px !important;
}
.wh_content_item[data-v-2ebcbc83], wh_content_item_tag[data-v-2ebcbc83]{
	color: #72696a !important;
}
.wh_top_changge li{
	color: #ef7f7d !important;
}
.wh_jiantou2[data-v-2ebcbc83]{
	border-top: 2px solid #ef7f7d !important;
    border-right: 2px solid #ef7f7d !important;
}
.wh_jiantou1[data-v-2ebcbc83]{
	border-top: 2px solid #ef7f7d !important;
	border-left: 2px solid #ef7f7d !important;
}
.wh_content[data-v-2ebcbc83]{
	border-bottom: 1px solid #f2f2f2;
}
.wh_top_changge li[data-v-2ebcbc83]{
	height: 38px !important;
}
.wh_item_date[data-v-2ebcbc83], .wh_top_tag[data-v-2ebcbc83]{
	width: 40px !important;
	height: 40px !important;
	background: #fff;
	border-radius: 6px;
	color: #888;
}
.wh_content_item[data-v-2ebcbc83]{
	margin-top: 3px;
	/* height: 36px !important; */
}
.wh_content_all{
	background: transparent !important;
}
/* .mark1{border: 1px solid red !important;width: .7rem !important;height: .7rem !important;border-radius: 50%;position: absolute;bottom: 0;} */
.mark1{ color: #f9ad63 !important;}
.mark2{background: #fd74ba !important; color: #FFF !important}  /*姨妈期*/
.mark3{ color:#d184f1  !important;}
.mark4{ background: #e2c4fb !important; border-radius:6px ;color: #fff !important;}
.mark5{width: 28px !important;height: 28px !important;  background: #FFFFFF !important;}
.wh_content_item .wh_chose_day{
	background: #ef7f7d !important;
	color: #fff !important;
	border-radius:6px !important;
	/* border: none !important; */
}
.wh_content_item .wh_isToday{
	background: #ef7f7d !important;
	color: #fff !important;
}
.ym-days-ai{
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	margin: 0 auto;
	background: #FFFFFF;
	border-radius: 6px;
	color: #fff;
	display: flex;
	align-items: center;
}
.ym-days-ai img{
	margin-left: .3rem;
	margin-right: .3rem;
	width: 7%;
	display: inline-block;
}
.ym-days-ai .font{
	color: #333;
	flex: 1;
}
.ym-days-ai .aiSwitch{
	margin-right: .3rem;
}
/* .wh_content:nth-child(1){
	margin-bottom: .1rem;
} */
</style>
