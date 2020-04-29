// pages/member/invitation/index.js
var app = getApp(),
  core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo()
  },
  getInfo(){
    let that =this
    core.post("commissionapi/index",{},function(res){
      // console.log()
      if (res.flag == "Success"){
        that.setData({
          info:res.data
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
    var user = app.getCache('userinfo');
    var that = this
    return {
      title: that.data.info.path_desc,
      path: '/pages/ysjindex/index?mid=' + user.id,
      success: function (res) { }
    }
  }
})