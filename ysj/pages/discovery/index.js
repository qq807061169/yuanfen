// pages/discovery/index.js
var app = getApp();
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    usermy: '',
    user:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = app.getCache('userinfo');
    //余额
    that.setData({
      usermy: user.amountbalance
    })
    core.loading();
    app.editTabBar();
    core.post("article/getarticle", {}, function(res){
      that.setData({
        list: res.data
      })
    },true);


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
    // core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
    //   console.log(res)
    //   app.setCache('userinfo', res.data, 7200)
    // })    
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
  
  /**
   * 跳转到web页面
   */


  scanQr: function () {
    app.scanQr()
  },

  gotoWeb: function(options){
    var url = options.target.dataset.value;
    var id = options.target.dataset.id;
    app.gotoWeb(url, id, '文章内容');
  },
})