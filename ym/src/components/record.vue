<template>
	<div class="record">
		<div class="ym-set-title">
			<div class="left"  @click="$router.go(-1)">
				
				<img src="../../static/img/fan.png" />
			
			</div>
			<div class="title">我的设置</div>
		</div>
		<div class="ym-record-content">
			<div class="ym-record-info">
				<div class="ym-recored-title">
					<div class="ym-title-day">经期开始日期</div>
					<div class="ym-title-number">经期天数</div>
					<div class="ym-title-info">周期天数</div>
				</div>
				<div class="ym-recored-list">
					<div class="ym-recored-for">
						<div class="list" v-for="item in list" :key="item.start_time">
							<div class="day">{{item.start_date}}</div>
							<div class="number">{{item.menses_continued_days}}</div>
							<div class="info">{{item.menses_apart_days}}</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState,mapMutations  } from 'vuex'
	export default {
		name:"record",
		data() {
			return {
				list:[]
			};
		},
		computed:{
			...mapState([
				'userid'
			]),
			
		},
		mounted() {
			this.$api.code.record(this.userid,"record").then(response => {
			    let res = response.data
				if(res.flag == "Success"){
					this.list = res.data
				}else{
					console.log(res.msg)
				}
			})
		}
	}
</script>

<style scoped>
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
.ym-record-content{
	width: 100%;
}
.ym-recored-for{
	border: 1px solid #f2f2f2;
	border-radius: 8px;
	margin-top: .2rem;
}

.ym-recored-for .list div{
	width: 33.3%;
	text-align: center;
}
.ym-record-content{
	width: 96%;
	margin: 0 auto;
}
.ym-recored-title{
	display: flex;
	/* justify-content: space-around; */
	align-items: center;
	background: #EEEEEE;
	height: .8rem;
	/* border-top-left-radius: 8px;
	border-top-right-radius: 8px; */
	border-radius: 8px;
	margin-top: .2rem;
	color: #515151;
}
.ym-recored-title div{
	width: 33.33%;
	text-align: center;
}
.ym-recored-list{
	background: #FFFFFF;
	border-radius: 8px;
	/* padding:0 .1rem */
}
.ym-recored-list .list{
	/* padding: 0 .1rem; */
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: .66rem;
	color: #515151;
	border-bottom: 1px solid #f2f2f2;
	margin-top: .1rem;
}
</style>
