// pages/equipment/info/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    that.setData({
      id: options.id,
    })
    that.getInfo(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getInfo(id) {
    let that = this
    core.post("leaseapi/getBindDeviceInfo", {
      deviceid: id
    }, function(res) {
      // console.log(res)
      if (res.flag == "Success") {
        that.setData({
          name: res.data.name,
          date: res.data.endtime,
          number: res.data.number,
          tds: res.data.tds,
          orderid: res.data.orderid,
        })
      } else {
        core.toast(res.msg, 'none');
      }
    })
  },
  click_renewal() {
    let that = this;
    wx.navigateTo({
      url: '/pages/hire/index?id=' + that.data.id + '&orderid=' + that.data.orderid
    })
  },
  clickPay() {
    let that = this;
    wx.navigateTo({
      url: '/pages/equipment/paylist/index?orderid=' + that.data.orderid
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})