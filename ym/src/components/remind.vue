<template>
	<div class="remind">
		<div class="ym-set-title">
			<div class="left">
				<router-link to='/'>
				<img src="../../static/img/fan.png" />
				</router-link>
			</div>
			<div class="title">我的提醒</div>
		</div>
		<div class="ym-remind-content">
			<div class="ym-remind-info">
				<div class="remind-top">
					<img src="../../static/img/state.png" alt="">
					<div class="remind-info-font">
						<div class="remind-info-tips">经期开始提醒</div>
						<div class="remind-day-tips" v-show="periods_open == false">{{next_start_days}}天后提醒</div>
						<div class="remind-day-tips" v-show="periods_open == true">未开启</div>
					</div>
					<div class="remind-switch">
						<el-switch
						@change="periods"
						  v-model="period"
						  active-color="#fec3dd"
						  inactive-color="#e5e5e5">
						</el-switch>
					</div>
				</div>
				<div class="remind-bottom">
					{{next_start_date}}
				</div>
			</div>
			
			<div class="ym-remind-info">
				<div class="remind-top">
					<img src="../../static/img/demg.png" alt="">
					<div class="remind-info-font">
						<div class="remind-info-tips">经期结束提醒</div>
						<div class="remind-day-tips" v-show="Period_open == false">{{next_end_days}}天后提醒</div>
						<div class="remind-day-tips" v-show="Period_open == true">未开启</div>
					</div>
					<div class="remind-switch">
						<el-switch
						@change="PeriodEnds"
						  v-model="PeriodEnd"
						  active-color="#fec3dd"
						  inactive-color="#e5e5e5">
						</el-switch>
					</div>
				</div>
				<div class="remind-bottom">
					{{next_end_date}}
				</div>
			</div>
			
			<div class="ym-remind-info">
				<div class="remind-top">
					<img src="../../static/img/water.png" alt="">
					<div class="remind-info-font">
						<div class="remind-info-tips">每天八杯水提醒</div>
						<div class="remind-day-tips">{{water_open}}</div>
					</div>
					<div class="remind-switch">
						<el-switch
						@change="waters"
						  v-model="water"
						  active-color="#fec3dd"
						  inactive-color="#e5e5e5">
						</el-switch>
					</div>
				</div>
				<div class="remind-bottom">
					记得每天都要水水嫩嫩哦~
				</div>
			</div>
			
			<div class="ym-remind-info">
				<div class="remind-top">
					<img src="../../static/img/wei.png" alt="">
					<div class="remind-info-font">
						<div class="remind-info-tips">换卫生巾提醒</div>
						<div class="remind-day-tips">{{padss_open}}</div>
					</div>
					<div class="remind-switch">
						<el-switch
						@change="padss"
						  v-model="pads"
						  active-color="#fec3dd"
						  inactive-color="#e5e5e5">
						</el-switch>
					</div>
				</div>
				<div class="remind-bottom">
					温馨营造姨妈舒适“温床”~
				</div>
			</div>
			
			<div class="ym-remind-info">
				<div class="remind-top">
					<img src="../../static/img/hua.png" alt="">
					<div class="remind-info-font">
						<div class="remind-info-tips">排卵日提醒</div>
						<div class="remind-day-tips">{{ovulations_open}}</div>
					</div>
					<div class="remind-switch">
						<el-switch
						@change="ovulations"
						  v-model="ovulation"
						  active-color="#fec3dd"
						  inactive-color="#e5e5e5">
						</el-switch>
					</div>
				</div>
				<div class="remind-bottom">
					以“测”万全，当幸福妈妈~
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState,mapMutations  } from 'vuex'
	export default {
		name:"remind",
		data() {
			return {
				remindSwitch:true,
				period:false,//经期
				PeriodEnd:false,
				water:false,
				pads:false,//换卫生巾
				ovulation:false,//排卵日提醒
				remind_type:"",
				water_open:"",
				padss_open:"",
				ovulations_open:"",
				next_start_days:"",
				next_start_date:"",
				next_end_days:"",
				next_end_date:"",
				periods_open:"",
				Period_open:""
			};
		},
		computed:{
			...mapState([
				'userid'
			]),
		},
// 		 userid:function(e){
// 			if(e != ""){
// 				this.calendar()
// 			}else{
// 				console.log("ee")
// 			}
// 		},
		watch:{
			userid:function(e){
				if(e != ""){
					this.infotips()
				}else{
					console.log("ee")
				}
			},
		},
		methods:{
			periods(e){
				if(e){
					this.periods_open = false
				}else{
					this.periods_open = true
				}
				this.remind_type = 1
				this.remind()
			},
			PeriodEnds(e){
				if(e){
					this.Period_open = false
				}else{
					this.Period_open = true
				}
				this.remind_type = 2
				this.remind()
			},
			waters(e){
				if(e){
					this.water_open = "已开启"
				}else{
					this.water_open = "未开启"
				}
				this.remind_type = 3
				this.remind()
			},
			padss(e){
				if(e){
					this.padss_open = "已开启"
				}else{
					this.padss_open = "未开启"
				}
				this.remind_type = 4
				this.remind()
			},
			ovulations(e){
				if(e){
					this.ovulations_open = "已开启"
				}else{
					this.ovulations_open = "未开启"
				}
				this.remind_type = 5
				this.remind()
			},
			remind(){
				this.$api.code.remind(this.userid,this.remind_type,"remind").then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						console.log(res)
					}else{
						console.log(res.msg)
					}
				})
			},
			infotips(){			
				this.$api.code.remind(this.userid,this.remind_type,"show").then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						console.log(res)
						this.next_start_days = res.data.next_start_days
						this.next_start_date = res.data.next_start_date
						this.next_end_days = res.data.next_end_days
						this.next_end_date = res.data.next_end_date
						if(res.data.start_remind == 0){
							this.period = false
							this.periods_open = true
						}else{
							this.period = true
							this.periods_open = false
						}
						if(res.data.ovulate_remind == 0){
							this.ovulation = false
							this.ovulations_open= "未开启"
						}else{
							this.ovulation = true
							this.ovulations_open= "已开启"
						}
						if(res.data.drink_remind == 0){
							this.water = false
							this.water_open = "未开启"
						}else{
							this.water = true
							this.water_open = "已开启"

						}
						if(res.data.end_remind == 0){
							this.PeriodEnd = false
							this.Period_open = true
						}else{
							this.PeriodEnd = true
							this.Period_open = false
						}
						
						if(res.data.replace_remind ==0 ){
							this.pads = false
							this.padss_open = "未开启"
						}else{
							this.pads = true
							this.padss_open = "已开启"
						}
					}else{
						console.log(res.msg)
					}
				})
			}
			
		},
		created() {
			console.log("提醒")
		},
		mounted(){
			this.infotips()
		},
	}
</script>

<style  scoped>
	html{
		background: #f9f9f9 !important;
	}
.ym-set-title{
	height: 1rem;
	line-height: 1rem;
	position: relative;
	background: #feaedd;
	align-items: center;
}
.ym-set-title .left{
	display: inline-block;
	margin-left: .3rem;
}
.ym-set-title .left img{
	width: 65%;
}
.ym-set-title .title{
	font-size: .33rem;
	color: #FFFFFF;
	position: absolute;
	left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
	
}
.ym-remind-content{
	width: 100%;
}

.ym-remind-info{
	width: 100%;
	background: #FFFFFF;
	height: 1.8rem;
	margin-top: .3rem;
}
.ym-remind-info .remind-top{
	padding: 0 .1rem;
	display: flex;
	height: 1.2rem;
	align-items: center;
	border-bottom: 1px solid #f6f6f6;
}
.ym-remind-info .remind-top img{
	display: inline-block;
	width: .7rem;
	margin: 0 .3rem;
}
.ym-remind-info .remind-top .remind-info-font {
	flex: 1;
}
.ym-remind-info .remind-top .remind-info-font .remind-info-tips{
	font-size: .32rem;
	color: #515151;
	margin-bottom: .1rem;
}
.ym-remind-info .remind-top .remind-info-font .remind-day-tips{
	color: #b4b4b4;
	font-size: .27rem;
}
.remind-switch{
	margin-right: .3rem;
}
.remind-bottom{
	height: 0.58rem;
	line-height: 0.58rem;
	font-size: .26rem;
	color: #b4b4b4;
	margin-left: 1.4rem;
}
</style>
