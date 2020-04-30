<template>
	<div class="">
		<div class="ym-combined-content">
			<div class="ym-day-com">平均</div>
			<div class="ym-combined-info">
				<div class="ym-combined-zong" :style="{height:average_apart+'px'}"></div>
				<div class="ym-zong-number"  :style="{bottom:average_apart+20+'px'}">{{average_apart}}</div>
				<div class="ym-combined-ym" :style="{height:average_continued+'px'}"></div>
				<div class="ym-ym-number" :style="{bottom:average_continued+20+'px'}">{{average_continued}}</div>
				
			</div>
			
			<div class="ym-combined-steat">
				<div class="ym-steat-zong">
					<div class="steat-raduis-yellow"></div>
					<div class="steat-font">总周期</div>
				</div>
				<div class="ym-steat-ym">
					<div class="steat-raduis-red"></div>
					<div class="steat-font">姨妈期</div>
				</div>
			</div>
		</div>
		<div class="ym-table-info">
			<div class="table-flex">
				<div class="ym-table-top">
					平均总周数
				</div>
				<div class="ym-table-days">
					<div class="ym-table-zong"><span>{{average_apart}}</span>天</div>
				</div>
			</div>
				
			<div class="table-flex">
				<div class="ym-table-top">
					平均姨妈期
				</div>
				<div class="ym-table-days">
					<div class="ym-table-zong"><span>{{average_continued}}</span>天</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState,mapMutations  } from 'vuex'
	export default {
		name:"combined",
		data() {
			return {
				average_apart:'',
				average_continued:"",
				// userid:this.userid,
				userinfo:''
			};
		},
		computed:{
			...mapState([
				'userid'
			]),
		},
		watch:{
			userid:function(e){
				if(e != ""){
					this.statistics()
				}else{
					console.log("ee")
				}
			}
		},
		methods:{
			statistics:function(){
				this.$api.code.statistical(this.userid,"statistics").then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						this.average_apart = res.data.average_apart
						this.average_continued = res.data.average_continued
					}else{
						console.log(res.msg)
					}
				})
			}
		},
		mounted() {
			this.statistics()
			console.log(this.$store.state.userid)
			//加载进入axios
		}
	}
</script>

<style scoped>
	.ym-combined-content{
		padding: 0 .1rem .3rem;
		background: #fff;
		border-radius: 8px;
		margin: .4rem 0;
		height: 6rem;
		overflow: hidden;
		
	}
	.ym-day-com{
		color: #fea54d;
		text-align: center;
		font-size: .33rem;
		margin: .3rem 0 0 0;
	}
	.ym-combined-info{
		position: relative;
		width: 85%;
		margin: 0 auto;
		height: 4.5rem;
		border-bottom: 1px solid #fccf56;
	}
	.ym-combined-zong{
		position: absolute;
		/* top: 4.3rem; */
		bottom: .35rem;
		left: 36%;
		width: .48rem;
		/* height: 70px; */
		border-radius: 6px;
		background: #fccf56;
	}
	.ym-zong-number{
		position: absolute;
		left: 36%;
		/* bottom: 90px; */
		width: .48rem;
		text-align: center;
	}
	.ym-combined-ym{
		position: absolute;
		/* top: 4.3rem; */
		bottom: .35rem;
		right: 36%;
		width: .48rem;
		/* height: 30px; */
		border-radius: 6px;
		background: #fe4d61;
	}
	.ym-ym-number{
		position: absolute;
		right: 36%;
		/* bottom: 50px; */
		width: .48rem;
		text-align: center;
	}
	.ym-combined-steat{
		width: 60%;
		margin: .3rem auto 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.ym-steat-zong{
		display: flex;
	}
	.ym-steat-zong .steat-raduis-yellow{
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
		background: #fea54d;
		margin-right: .1rem;
	}
	.ym-steat-ym{
		display: flex;
	}
	.ym-steat-ym .steat-raduis-red{
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
		background: #fe4d61;
		margin-right: .1rem;
	}
	.steat-font{
		color: #949494;
		font-size: .3rem;
	}
	.ym-table-info{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.table-flex{
		width: 45%;
		height: 2.3rem;
		border: 1px solid #f6f6f6;
		border-radius: 6px;
	}
	.table-flex .ym-table-top{
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		color: #949494;
		background: #eeeeee;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
	}
	.ym-table-days{
		height: 1.4rem;
		width: 100%;
		background: #FFFFFF;
		border-bottom-left-radius:10px;
		border-bottom-right-radius:10px;
		text-align: center;
		overflow: hidden;
	}
	.ym-table-zong{
		color: #656565;
		margin-top: 0.2rem;
	}
	.ym-table-zong > span {
		display: inline-block;
		font-size: .8rem;
		margin-right: .1rem;
	}
</style>
