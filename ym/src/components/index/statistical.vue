<template>
	<div class="container">
	
		<div class="ym-state-color">
			<div class="ym-state-select" ref='menuWrapper'>
				<swiper :options="swiperOption" style="height: 100%;">
				  <swiper-slide  v-if="status==1">
					  <div class="ym-select-info">
						  <img src="../../../static/img/color-red.png" width="60%"  alt="">
						   <div class="font">第<span class="font-acv">{{now_day}}</span>天</div>
						   <div class="ym-color">当前姨妈期</div>
					  </div>
					 <div class="tisp-font-pink">距离{{period}}还有 {{next_days}} 天</div>
				  </swiper-slide>
				  <swiper-slide v-if="status==3">
					<div class="ym-select-info">
						<img src="../../../static/img/color-yellow.png" width="60%" alt="">
						<div class="font">第<span class="font-acv">{{now_day}}</span>天</div>
						<div class="ym-color">当前安全期</div>
					</div>
					<div class="tisp-font-yellow">距离{{period}}还有 {{next_days}} 天</div>
				  </swiper-slide>
				  <swiper-slide v-if="status==2">
				  <div class="ym-select-info">
					  <img src="../../../static/img/color-zi.png" width="60%" alt="">
					  <div class="font">第<span class="font-acv">{{now_day}}</span>天</div>
					  <div class="ym-color">当前排卵期</div>
				  </div>
				  <div class="tisp-font-zi">距离{{period}}还有 {{next_days}} 天</div>
				  </swiper-slide>
				<!-- <div class="swiper-scrollbar"></div> -->
				  <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
				</swiper>
				<!-- ul ref="personTab">
					
					<li><img src="../../../static/img/color-yellow.png" width="60%" alt=""></li>
					
				</ul> -->
			</div>
			<state></state>
		</div>
		<div class="ym-state-info">
			姨妈走啦
		</div>
	</div>
</template>

<script>
	import state from './state.vue'
	// import store from "./store/index.js"
	import { mapState,mapMutations  } from 'vuex'
	import Bscroll from 'better-scroll'
	export default {
		name:'statistical',
		data() {
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
				  clickable: false,
				  type: "bullets",
				  },
				  initialSlide:0,
				    zoom: {
				 maxRatio: 5, //最大倍数
				 minRatio: 2, //最小倍数
				 toggle: false, //不允许双击缩放，只允许手机端触摸缩放。
				 containerClass: 'my-zoom-container', //zoom container 类名
			   },
				},
				user_id:"",
				status:'',
				now_day:'',
				next_status:'',
				next_days:''
			};
		},
		computed:{
			...mapState([
				'userid'
			]),
			period:function(){
				switch (this.next_status){
					case 1 :
						this.next_status  = '姨妈期'
						break;
					case 2 :
						this.next_status  = '排卵期'
						break;
					case 3 :
						this.next_status  = '安全期'
						break;
				}
				return this.next_status
			}
			
		},
		watch:{
			
			userid:function(e){
				if(e != ""){
					this.index()
				}else{
					console.log("ee")
				}
			},
			$route(to, from) {
				if(to.query.set == 1){
					this.index()
				}
			},
		},
		created() {
			console.log(this.userid)
			// this.index()
		},
		mounted() {
			this.index()
		},
		methods:{
			index:function(){
				this.$api.code.indexs(this.userid).then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						this.status = res.data.status
						this.now_day = res.data.now_day
						this.next_status = res.data.next_status
						this.next_days = res.data.next_days
					}else{
						console.log(res.msg)
					}
				})
			}
			
		},
		components: {
			state
		}
	}
</script>

<style scoped>
.warp{
}
.container{
	/* position: relative; */
}
.ym-state-select > ul {}
.ym-state-select > ul li{
	
}
.ym-state-select .swiper-slide{
	
}
.ym-state-color{
	padding: 0 .1rem .3rem;
	background: #fff;
	border-radius: 8px;
	margin: .4rem 0;
	height: 6.3rem;
	overflow: hidden;
	
}
/* .ym-state-select{
	width: 80% !important;
	margin: 0 auto;
} */
.ym-state-select .font{
	position: absolute;
	left: 50%;
	top: 37%;
	transform: translate(-50%, -50%);
	font-size: .3rem;
	color:#ffffff;
}
.ym-state-select .ym-color{
	position: absolute;
	left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
	font-size: .33rem;
	color:#ffffff;
}
.tisp-font-yellow{
	color: #feb236;
	margin: 0 auto;
	text-align: center;
	font-size: .3rem;
	margin: .4rem 0;
}
.tisp-font-zi{
	color: #db97ed;
	margin: 0 auto;
	text-align: center;
	font-size: .3rem;
	margin: .4rem 0;
}
.ym-state-select .tisp-font-pink{
	color: #ff8594;
	margin: 0 auto;
	text-align: center;
	font-size: .3rem;
	margin: .4rem 0;
}
.ym-state-select .font-acv{
	font-size: .7rem;
	display: inline-block;
	margin: 0 .1rem;
}
.ym-select-info{
	margin: .4rem 0 .1rem 0;
}
.ym-select-info img{
	display: block;
	margin: 0 auto;
}
/* .ym-state-select .swiper-container{
	overflow: visible !important;
} */
.ym-state-info{
	width: 100%;
	height: .8rem;
	line-height: .8rem;
	margin: 0 auto;
	background: #feaedd;
	border-radius: 6px;
	text-align: center;
	color: #fff;
}
.state{
	position: absolute;
	height: 20%;
	width: 100%;
	background: #000000;
	bottom: 0;
}

  .tisp{
	  width: 80%;
	  margin: 0 auto;
	  display: flex;
	  margin: 1rem auto;
	  text-align: center;
  }
  .font-tisp{
	  width: 50%;
	  text-align: center;
	  color: #a4e797;
	  font-size: .4rem;
  }
  .tisp-day{
	  width:50%;
	  text-align: center;
  }
	
	
</style>
