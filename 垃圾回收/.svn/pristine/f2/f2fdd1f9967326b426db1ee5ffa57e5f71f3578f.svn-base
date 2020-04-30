// pages/classification/details/index.js
var e = getApp(), a = (e.requirejs("icons"), e.requirejs("core"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    user:[],
    jf:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      jf: options.jf
    })
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
    let that = this
    that.getrecords()
    that.setData({
      user: e.getCache("userinfo")
    })
  },

  getrecords(){
    let that = this
    a.post("&r=sign.getrecords",{},function(res){
      if (res.status == 1){
        that.setData({
          list: res.result.list,
          show:!0
        })
      }else{
        a.toast(res,"none")
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

  }
})