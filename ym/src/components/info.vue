<template>
  <div class="info" :style="{height:clientHeight+'px'}" style="background: #feaedd;">
	  <div class="ym-info-content">
		  <div class="ym-header">
			完善信息
		  </div>
		  <div class="ym-info-set">
			  <div class="ym-info-title">
				  <div class="line"></div>
				  <div class="font">请设置您的经期数据</div>
				  <div class="line"></div>
			  </div>
			  <div class="ym-info-data">
				  <div class="ym-info-line">
					  <div class="font">最近一次来大姨妈的时间</div>
					  <div class="ym-info-day">
						 <!-- <el-date-picker
						    v-model="value1"
						    type="date"
						    placeholder="选择日期"
						     value-format="yyyy-MM-dd"
						     @change="che">
						  </el-date-picker> -->
							
							<datetime @on-change="che" placeholder="选择日期" :end-date="enddate" :start-date="startdate"></datetime>
					  </div>
				  </div>
				  <div class="ym-info-line">
					  <div class="font">周期<span>两次月经开始日期间隔多久</span></div>
					  <div class="ym-info-day">
						 <!-- <el-select v-model="value" placeholder="请选择"  @change="apart_days">
							<el-option
							  v-for="item in option1"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select> -->
							
							<popup-picker :data="cycle" @on-change="apart_days" placeholder="选择天数"  v-model="cycledata"></popup-picker>
					  </div>
				  </div>
				  <div class="ym-info-line">
					  <div class="font">经期<span>您的月经大概持续几天</span></div>
					  <div class="ym-info-day">
						<!-- <el-select v-model="value2" placeholder="请选择"  @change="continued_days">
							<el-option
							  v-for="item in options"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						 </el-select> -->
						 
						  <popup-picker :data="aunt"  v-model="auntdata" placeholder="选择天数"  @on-change="continued_days"></popup-picker>
					  </div>
				  </div>
			  </div>
			  
			  <div class="ym-info-btn" @click="saveBtn">
			  		保存设置
			  </div>
		  </div>
		  
	  </div>
    
  </div>
  
</template>

<script>
	import { mapState,mapMutations  } from 'vuex'
	import { Datetime,PopupPicker  } from 'vux'
  export default {
	name:"info",
    data() {
      return {
				startdate:"",
				enddate:"",
		  user_id:"",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
				
				cycle: [['20', '21', '22', '23', '24', '25', '26','27', '28', '29', '30', '31', '32', '33', '34', '35', '36','37', '38', '39', '40','41', '42', '43', '44', '45' ]],
				aunt:[[ '1', '2', '3', '4', '5', '6','7', '8']],
				auntdata:[],
				cycledata:[],
		
        value: '',
        value1: '',
        menses_last_time:'',
				menses_apart_days:'',
				menses_continued_days:'',
				clientHeight:""
      };
    },
	computed:{
		...mapState([
			'userid'
		]),
	},
	watch:{
		value1:function(){
			console.log(this.value1)
		}
	},
	created() {
		this.user_id=this.$route.query.userid
		console.log(this.user_id)
		this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;																						//console.log(self.clientHeight);
		window.onresize = function temp() {
		    this.clientHeight = `${document.documentElement.clientHeight}`;
		},
		this.datas()
	},
	methods:{
		che:function(e){
			this.menses_last_time = e
		},
		apart_days(e){
			let data = parseInt(e)
			this.menses_apart_days = data
		},
		continued_days(e){
			let data = parseInt(e)
			this.menses_continued_days = data
		},
	
		saveBtn:function(){
			if(this.menses_last_time == "" ){
				this.$message({
					  showClose: true,
					  message: "请选择日期",
					  type: 'error'
					});
					return 
			}
			if(this.menses_apart_days == "" ){
				this.$message({
					  showClose: true,
					  message: "请填写间隔时间！",
					  type: 'error'
					});
					return 
			}
			if(this.menses_continued_days == "" ){
				this.$message({
					  showClose: true,
					  message: "请填写持续天数！",
					  type: 'error'
					});
					return 
			}
			console.log("hah")
			this.$api.code.info(this.userid,this.menses_last_time,this.menses_apart_days,this.menses_continued_days,"basic_info").then(response => {
			    let res = response.data
				if(res.flag == "Success"){
					 sessionStorage.setItem("is_set",1)
					this.$message({
					  showClose: true,
					  message: '保存成功！',
					  type: 'success'
					});
					this.$router.push({ path: '/', query: {	set: 1	}	})
				}else{
					this.$message({
						  showClose: true,
						  message: res.msg,
						  type: 'error'
						});
				}
			})
			// this.$router.push({ path:"/",query: {userid: this.user_id}})
		},
		
		//前45天
			getqi(){
				console.log("77")
				let Date1 = new Date()
				let Date7 = new Date(Date1.getTime() - 1080*60*60*1000);
				 let seperator1 = "-";
				 let year = Date7.getFullYear();
				let month = Date7.getMonth() + 1;
				let strDate = Date7.getDate(); 
				 if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
				this.startdate = year+"-"+month+"-"+strDate
				console.log(this.startdate)
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
						
		
	},
		mounted(){
		this.datas()
		this.getqi()
	},
	components:{
		Datetime,
		PopupPicker
	}
  };
</script>
<style scoped>
	 /deep/ html{
		background: #feaedd !important;
	}
	.info .vux-popup-picker-select{
		text-align: center !important; 
	}
.info /deep/.weui-cell_access .weui-cell__ft{
			text-align: center !important;
		}
.info /deep/ .weui-cell__ft{
	text-align: center !important;
}
.info /deep/ .vux-popup-picker-select{
	text-align: center !important;
}
	
.info /deep/ .weui-cell_access .weui-cell__ft:after{
			border-style:none !important;
			width: 0 !important;
			height: 0 !important;
		}
/* .ym-info-data[data-v-4650b484] */
.vux-popup-picker-select{
	text-align: center !important;
}
	.info .weui-cell{
		height: 100% !important;
		padding: 0;
	}
	.info .vux-cell-box{
		height: 100%;
	}
	.info .vux-datetime{
		color: #999;
	}
	.ym-header{
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		background: #feaedd;
		color: #fff;
		font-size: .34rem;
		text-align: center;
		position: relative;
		z-index: 1;
	}
	.ym-info-set{
		width: 90%;
		height: 7rem;
		margin: 1rem auto;
		background: #ff94d3;
		border-radius: 8px;
	}
	.ym-info-title{
		display: flex;
		height: 1rem;
		align-items: center;
		color: #FFFFFF;
		font-size: .31rem;
		justify-content: space-around;
	}
	.ym-info-title .line{
		width: 1.3rem;
		height: 1px;
		background: #FFFFFF;
	}
	.ym-info-data{
		height: 6.8rem;
		background: #FFFFFF;
		border-radius: 8px;
	}
	.ym-info-line{
		padding: .3rem 0;
		overflow: hidden;
	}
	.ym-info-line .font{
		color: #515151;
		font-size: .33rem;
		margin: 0 .3rem .3rem;
		
	}
	.ym-info-line .ym-info-day{
		width: 90%;
		margin: 0 .3rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		border-radius: 6px;
		background: #eeeeee;
	}
		.ym-info-line .ym-info-day ::-moz-placeholder{
			color: #999;
		} 
	.ym-info-set .el-input--prefix .el-input__inner {
		border: none;
		background: transparent;
		text-align: center;
	}
	.ym-info-set .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100% !important;
	}
	.ym-info-set .el-select{
		width: 100%;
	}
	.ym-info-set .el-input--suffix .el-input__inner{
		background: transparent;
		text-align: center;
	}
	.ym-info-btn{
			width: 90%;
		margin:1rem auto;
		border-radius: 8px;
		line-height: .8rem;
		line-height: .8rem;
		color: #feaedd;
		text-align: center;
		background-color: #fff;
	}
</style>