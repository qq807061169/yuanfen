// pages/index/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreement: 0,
    show: 0,
    usermy: app.data.balance,
    fulldata: app.data.globalnum,
    user:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 扫码后得到设备的id
    var th = this
    const scene = decodeURIComponent(options.id);
    //用户信息
    var user = app.getCache('userinfo');
    th.setData({
      user: user
    })
    // if (app.getCache('userinfo')) {
    //   th.setData({
    //     user: app.getCache('userinfo')
    //   })
    // } else {
    //   app.getUserInfo(function () {
    //     th.setData({
    //       user: app.getCache('userinfo')
    //     })
    //   })
    // }     
    app.editTabBar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      show: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
      that.setData({
        usermy: res.data.amountbalance
      })
      // app.data.balance = res.data.amountbalance
      app.data.balance = res.data.amountbalance
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

//扫一扫


  scanQr: function () {
    app.scanQr()
  },

  /**
   * 用户协议
   */
  agreement: function(){
    var that = this;
    console.log(that.data.fulldata)
    if (that.data.fulldata == 1){
      var num = 0;
    } else if (that.data.fulldata == 0){
      var num = 1;
    }
    that.setData({
      fulldata: num
    })
    app.data.globalnum = that.data.fulldata;
  },
  /**
   * 跳转到web页面
   */
  gotoWeb: function (options) {
    var url = options.target.dataset.value ? options.target.dataset.value:'';
    var id = options.target.dataset.id ? options.target.dataset.id:'';
    app.gotoWeb(url, id, '用户协议');
  },
})