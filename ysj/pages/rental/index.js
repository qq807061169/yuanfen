// pages/intake/index.js
var app = getApp();
    core = app.requirejs("core");
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tds: 0,
    intds:0,
    quality:'22',
    windowHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    core.loading();
   var that = this;
   that.setData({
     tds: options.tds,
     intds: options.intds,
     quality: options.quality,
   })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight


        })
      }
    })
 
    
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
    wx.setNavigationBarTitle({
      title: '咕咚共享饮水'
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



 


 

})