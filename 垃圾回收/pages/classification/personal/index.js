// pages/classification/personal/index.js
var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    dataarr: [],
    datainfo: [],
    modal: false,
    task: [],
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
    let that = this
    that.setData({
      user: e.getCache("userinfo")
    })
    that.sign()
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
  disnav() {
    wx.navigateTo({
      url: '/classification/details/index?jf=' + this.data.datainfo.my_credit,
    })
  },
  newsnav() {
    r.post("&r=news.gonews", {}, function (res) {
      console.log(res)
    })
    wx.navigateTo({
      url: '/classification/newslist/index',
    })
  },
  sign() {
    let that = this
    r.post("&r=sign", {}, function (res) {
      if (res.status == 1) {
        that.setData({
          dataarr: res.result.date_arr,
          datainfo: res.result,
          task: res.result.task
        })
      } else {
        console.log(res)
      }
    })
  },
  //打卡
  btndak() {
    let that = this
    r.post("&r=sign.dosign", {}, function (res) {
      if (res.status == 1 || res.status == 2) {
        that.setData({
          qd_info: res.result.message,
          modal: true,
        })
      }
    })
  },
  modal_out() {
    let that = this
    that.sign()
    that.setData({
      modal: false
    })
  },
  getUserInfos:function(){
    wx.navigateTo({
      url: '/pages/message/auth/index',
    })
  }
})