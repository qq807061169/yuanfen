// pages/discovery/index.js
var app = getApp(),
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: [],
    usermy: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    core.loading();
   
    // if(app.getCache('userinfo')){
    //   that.setData({
    //     user: app.getCache('userinfo')
    //   })
    // }else{
    //   app.getUserInfo(function(){
    //     that.setData({
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
    core.hideLoading();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  
    var that = this;
    var user = app.getCache('userinfo');
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id}, function (res) {
      that.setData({
        usermy: res.data.amountbalance,
        user: res.data
      })
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

  scanQr: function () {
    app.scanQr()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})