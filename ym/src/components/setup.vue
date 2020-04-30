<template>
	<div class="setup">
		<div class="ym-set-title">
			<div class="left">
				<router-link to='/'>
				<img src="../../static/img/fan.png" />
				</router-link>
			</div>
			<div class="title">我的设置</div>
		</div>
		<div class="ym-set-content">
			<router-link to='/record'>
			<div class="info">
				<div class="set-left">所有姨妈记录</div>
				
				<div class="set-img"><img src="../../static/img/rig.png" alt=""></div>
				
			</div>
			</router-link>
			<div class="info">
				<div class="set-left">修改姨妈周期</div>
				<div class="set-right set-select" style="width: 3rem;height: 1rem;line-height: 1rem;">
					
					   <popup-picker :data="cycle" @on-change="onChange"   v-model="cycledata"></popup-picker>

					  
				</div>
				
			</div>
			
			<div class="info">
				<div class="set-left ">最近一次修改时间</div>
				<div class="set-right" style="width: 3.6rem;color: #b1b1b1;">
				<datetime @on-change="che" v-model="menses_last_date"  :end-date="enddate" :start-date="startdate"></datetime>
				</div>
			</div>
			<div class="info">
				<div class="set-left">修改姨妈天数</div>
				<div class="set-right set-select" style="width: 3rem;height: 1rem;line-height: 1rem;">
					
					   <popup-picker :data="aunt"   v-model="auntdata"  @on-change="onaunt"></popup-picker>
				</div>
			</div>
			
		</div>
		<div class="ym-set-btn" @click="setbtn">保存设置</div>
		
		
	</div>
</template>

<script>
	import { mapState,mapMutations  } from 'vuex'
	import { Datetime,PopupPicker  } from 'vux'
	export default {
		name:"setup",
		data() {
			return {
  // docType: ['1'],
				//周期
				startdate:"",//最小开始日期
				enddate:"",//最大
				cycle: [['20', '21', '22', '23', '24', '25', '26','27', '28', '29', '30', '31', '32', '33', '34', '35', '36','37', '38', '39', '40','41', '42', '43', '44', '45' ]],
				aunt:[[ '1', '2', '3', '4', '5', '6','7', '8']],
				cycledata:[11],
				auntdata:[],
				value1: ['iPhone'],
				 options: [{
				  value: '1',
				  label: '1'
				}, {
				  value: '2',
				  label: '2'
				}, {
				  value: '3',
				  label: '3'
				}, {
				  value: '4',
				  label: '4'
				}, {
				  value: '5',
				  label: '5'
				},
				 {
				  value: '6',
				  label: '6'
				},
				 {
				  value: '7',
				  label: '7'
				},
				 {
				  value: '8',
				  label: '8'
				}
				],
				value: '',
				value1:'',
				value2:'2',
				menses_last_time:'',
				menses_apart_days:'',
				menses_continued_days:'',
				menses_last_date:'',
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
					this.setinfo()
				}else{
					console.log("ee")
				}
			},
		},
		methods:{
			onaunt(e){
				let data = parseInt(e)
				this.menses_continued_days = data
			},
			 onChange (e) {
				let data = parseInt(e)
				this.menses_apart_days = data
			},
			continued_days(e){
				this.menses_continued_days = e
			},
			apart_days(e){
				
				this.menses_apart_days = e
			},
			che:function(e){
				this.menses_last_date = e
			},
			setbtn:function(){
				this.$api.code.setsave(this.userid,this.menses_last_date,this.menses_apart_days,this.menses_continued_days,'basic_info').then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						this.$api.code.setinfos(this.userid,'show').then(response => {
						    let ress = response.data
							if(ress.flag == "Success"){
								this.menses_last_time = ress.data.menses_last_time
								this.menses_apart_days = ress.data.menses_apart_days
								this.menses_continued_days = ress.data.menses_continued_days
								this.menses_last_date = ress.data.menses_last_date
								 this.$message({
									   showClose: true,
								  message: res.msg,
								    type: 'success'
								});
						
								  this.$router.push({ path: '/',
									  query: {
										set: 1
									  }
									})
							}else{
								console.log(ress.msg)
							}
						})
				
					}else{
						console.log(res.msg)
					}
				})
			},
			
			setinfo(e){
				
				this.$api.code.setinfos(this.userid,"show").then(response => {
				    let res = response.data
					if(res.flag == "Success"){
						this.menses_last_time = res.data.menses_last_time
						this.menses_apart_days = res.data.menses_apart_days  
						this.menses_continued_days = res.data.menses_continued_days
						this.menses_last_date = res.data.menses_last_date
						this.auntdata = res.data.menses_continued_days.split()
						this.cycledata = res.data.menses_apart_days.split()
						
					}else{
						console.log(res.msg)
					}
				})
			},
			//获取年月日
			datas(){
				let data = new Date()
				let yeardata = data.getFullYear()
				let monthdata = data.getMonth()+1
				if(monthdata < 10){
					 monthdata  =   "0"+ monthdata
				}else{
					 monthdata  = monthdata
				}
				let indata = data.getDate()-8
				let indatas = data.getDate()
				if(indata < 10){
					 indata  =   "0"+ indata
				}else{
					 indata  = indata
				}
				if(indatas < 10){
					 indatas  =   "0"+ indatas
				}else{
					 indatas  = indatas
				}
				
				this.enddate = yeardata+"-"+monthdata+"-"+indatas
				console.log(this.enddate)
			},
				//前七天
			getData7(){
				var Date1 = new Date()
				var Date7 = new Date(Date1.getTime() - 1080*60*60*1000);
				 var seperator1 = "-";
				 var year = Date7.getFullYear();
				var month = Date7.getMonth() + 1;
				var strDate = Date7.getDate();
				 if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
				this.startdate = year+"-"+month+"-"+strDate
//                 currentdate1 = year + seperator1 + month + seperator1 + strDate ;
				console.log(this.startdate)

			}
		},
		mounted() {
			this.setinfo()
			this.datas()
			this.getData7()
		},
		
		components:{
			Datetime,
			PopupPicker
		},
		
	}
</script>

<style type="text/less"  lang="less" >
	html{
		background: #f9f9f9 ;
	}
.setup .vux-datetime{
	color: #b1b1b1 !important;
}
.setup .weui-cell {
	padding: 0 !important;
	box-sizing: border-box;
	height: 100%;
}
.vux-tap-active{
	padding: 0 !important;
}
.setup .vux-cell-box{
	height: 100%;
}
.setup .vux-datetime{
	width: 100%;
	height: 100%;
	display: block;
	height: .3rem;
	color: #feaedd;
}
.setup .vux-cell-primary{
	text-align: right !important;
}
.setup .vux-datetime[data-v-5796ffc6]{
	text-align: right !important;
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
.setup .set-select .el-input--mini .el-input__inner{
	color: #b1b1b1;
}
.setup  .el-input--prefix .el-input__inner{
	color: #b1b1b1;
	border: none;
	text-align: right;
	padding-right: 6px !important;
}
.setup  .el-icon-date:before{
	content: "" !important;
}
.ym-set-content{
	width: 100%;
	margin: .4rem auto 0 auto;
	border-radius: 6px;
	background: #FFFFFF;
}
.ym-set-content .info{
	display: flex;
	height: .9rem;
	align-items: center;
	border-bottom: 1px solid #dcdcdc;
}
.ym-set-content .info .set-left{
	font-size: .29rem;
	color: #777;
	flex: 1;
	margin-left: .3rem;
}
.ym-set-content .info .set-right{
	font-size: .3rem;
	color: #d0d0d0;
	margin-right:.4rem ;
}
.ym-set-content .info .set-img img{
	width: .2rem;
	margin-right: .36rem;
}
.set-select{
	width: 1.3rem;
	border: none;
}
.set-select .el-input--mini .el-input__inner{
	border: none;
}
.set-select .el-input--mini .el-input__inner{
	font-size: .33rem;
}
.el-icon-arrow-up:before{
	font-size: .4rem !important;
}
.ym-set-btn{
	width: 90%;
	margin:1rem auto;
	border-radius: 8px;
	line-height: .8rem;
	line-height: .8rem;
	color: #FFFFFF;
	text-align: center;
	background-color: #feaedd;
}
</style>
