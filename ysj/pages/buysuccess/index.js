// pages/buysuccess/index.js
var app = getApp();
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_nb:'',
    water_font:'',
    water_state:'',
    quantityml:'',
    element:'',
    myTime: null,
    out_time:'',
    paytep:'',
    water_coin:'',
    dispatchprice:'0',
    page:'',
    statusval:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var th = this
    core.loading();
    console.log(options)
    if (options.pages == 1){
      th.setData({
        water_font:"购买水量"
      })
    } else if (options.pages == 2){
      th.setData({
        water_font: "出水量"
      })
    }
    th.setData({
      order_nb: options.order_no,
      out_time: options.out_time,
      paytep: options.paytep,
      page: options.pages,
    })
    core.post("apiservice/getOrdering", { orderno: th.data.order_nb }, function (res) {
      if (res.flag == "Success"){
        th.setData({
          quantityml: res.data.realnumber,
          element: res.data.payprice,
          water_state: res.data.status
        })
      }else{
        core.toast(res.msg, 'none');
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    core.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   var that = this;
    that.data.myTime = setInterval(function () {
      core.post("apiservice/getOrdering", { orderno: that.data.order_nb }, function (res) {
        if (res.flag == "Success") {
          if (res.data.status=="出水中"){
            that.setData({
              quantityml: res.data.realnumber,
              element: res.data.price,
              water_state: '设备响应',
              statusval: res.data.statusval,
            })
          }else{
            that.setData({
              quantityml: res.data.realnumber,
              element: res.data.price,
              water_state: res.data.status,
              water_coin: res.data.point,
              dispatchprice: res.data.payprice,
              statusval: res.data.statusval,
            })
          }
          console.log(that.data.tang)
        }else{
          core.toast(res.msg, 'none');
        }
        if (res.data.status == "出水超时" || res.data.status == "出水完成" || res.data.status == "已完成" ){
          wx.setNavigationBarTitle({
            title: '支付成功'
          })
          clearInterval(that.data.myTime)
        }
       
      });
     }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.myTime )
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.myTime )
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 去充值
   */
  recharge: function(){
    wx.navigateTo({
      url: '/pages/member/wallet/index?flag=recharge',
    })
  },

  /**
   * 完成
   */
  success: function(){
    wx.reLaunch({
      url: '/pages/ysjindex/index',
    })
  },
})