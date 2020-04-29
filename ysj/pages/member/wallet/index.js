// pages/member/wallet/index.js
var app = getApp(),
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows:false,
    show: 'recharge',
    amount: null,
    usermy:'',
    inputValue:'',
    account:[],
    userid:'',
    user:[],
    curpage: 2,
    number:'',
    arrayinfo:'',
    disb: false,
    hiddenmodalput:true,
    filling:[],
    modal: false,
    reason:"",
    isDisabled:true,
    isFocus:false,
    discount:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    core.loading();
    var that = this;
    if (app.getCache('userinfo')) {
      that.setData({
        user: app.getCache('userinfo')
      })
    } else {
      app.getUserInfo(function () {
        that.setData({
          user: app.getCache('userinfo')
        })
      })
    }
    console.log(that.data.user)
    if(options.flag){
      that.setData({
        show: options.flag
      })
    }
    core.post("Apiservice/getBalance", { user_id: that.data.user.id}, function (res) {
      if (res.flag == "Success"){
        // console.log(res.data.length)
        // console.log(typeof (res.data))
        that.setData({
          accountList:res.data,
          account: res
        })
      }else{
        core.toast(res.msg, 'none')
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    core.hideLoading();
    this.setData({ 
      shows: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
      that.setData({
        user: res.data
      })
    }),
      that.getRechargeList() //充值列表
  },

  getRechargeList(){
    let that = this;
    core.post("rechargeapi/getRechargeList",{},function(res){
      if (res.flag == "Success"){
        that.setData({
          filling:res.data
        })
      }else{
        core.toast(res.msg, 'none')
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    setTimeout(() => {
      core.loading();
    var t = this;
    core.post("apiservice/getBalance", {
      user_id: t.data.user.id,
      status: t.data.currentTab,
      curpage: t.data.curpage
    }, function (res) {
      if (res.flag == "Success") {
        var number = res.data.length + t.data.account.data.length;
        var arrayinfo = that.data.accountList.concat(res.data);
        t.setData({
          numberlength: number,
          accountList: arrayinfo,
          // flag: res.flag,
          curpage: t.data.curpage + 1,
        })
        if (res.msg == arrayinfo.length) {
          core.toast("没有数据了", 'none')
        }
      } else {
        core.toast(res.msg, 'none')
      }

    })
      core.hideLoading()
    }, 400)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },


// 点击加载更多
clickLoad:function(){
  
},
// 点击充值
  select: function (options){
    var that = this
    that.setData({
      inputValue: options.target.dataset.moeny,
      quality_default: options.target.dataset.id,
      paymoney: options.target.dataset.paymoney,
      discount: options.target.dataset.discount,
    })
  },
 

  /**
   * 充值
   */
  recharge: function(){
    this.setData({
      show: 'recharge',
    })
  },
  /**
   * 余额明细
   */
  getDetail: function(){
    this.setData({
      show: 'detail',
    })
  },

  /**
   * 获取充值的金额
   */
  getNum1: function(options){
    var that = this;
    that.setData({
      amount: options.detail.value
    })
  },
  getNum2: function(options){
    var that = this;
    that.setData({
      amount: options.detail.value
    })
  },
  topUp:function(){
    var t = this
    if (t.data.inputValue==""){
      core.alert("请选择充值金额！")
      return false
    }
    t.setData({
      disb: true
    })
    core.post("payapi/recharge",{
      user_id: t.data.user.id,
      amount: t.data.paymoney,
      id: t.data.quality_default,
    },function(res){
      if (res.flag == "Error"){
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
        t.setData({
          inputValue: '',
          disb: false
        })
      }else{
        wx.requestPayment({
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          'success': function (reste) {
            console.log(reste)
            core.post("apiservice/getUserinfo", { user_id: t.data.user.id }, function (res) {
              // app.setCache('userinfo', res.data, 7200)
              t.setData({
                user: res.data
              })
            })
            app.getCache('userinfo')
            t.setData({
              inputValue: '',
              user: app.getCache('userinfo'),
              disb: false
            })
            core.toast('充值成功')
          },
          'fail': function (reste) {
            console.log(reste);
            if (reste.errMsg == 'requestPayment:fail cancel') {
              t.setData({
                inputValue: '',
                disb: false,
                quality_default:''
              })
              wx.showToast({
                icon: 'none',
                title: "支付失败",
              })
            }
          }
        })
      }
    },true)
  },
  //退款
  refund() {
    this.setData({
      modal: true
    });
  },
  cancel: function () {
    this.setData({
      modal: false
    });
  },
  out1: function (options) {
    var that = this;
    that.setData({
      reason: options.detail.value
    })
  },
  out2: function (options) {
    var that = this;
    that.setData({
      reason: options.detail.value
    })
  },
  qur: function () {
    let that = this
    if (that.data.reason == ""){
      wx.showToast({
        icon: 'none',
        title: "请填写退款理由！",
      })
      return 
    }
    core.post("apiservice/refund", { id: this.data.user.id, ask_reason: this.data.reason},(res)=>{
      if (res.flag == "Error"){
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }else{
        core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
          that.setData({
            user: res.data
          })
        })
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    })
    this.setData({
      modal: false
    });
  },
  reasonBtn(e){
    let that = this;
    let isD = null
    if (e.currentTarget.dataset.isd == 0){
      isD = true
    }else{
      isD = false
    }
    that.setData({
      reason: e.currentTarget.dataset.desc,
      isDisabled: isD,
    })
  }
})