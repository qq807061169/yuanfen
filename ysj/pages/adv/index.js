// pages/adv/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal: false,
    activity: false,
    getadv: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.advertising()
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
  // 广告弹出
  advertising: function () {
    let that = this;
    core.post("advapi/getadv", {}, function (res) {
      if (res.flag == "Success") {
        console.log(res.data)
        if (res.data.length > 0) {
          that.setData({
            getadv: res.data,
            activity: true,
          })
        }
      } else {
        core.toast(res.msg, 'none')
      }
    })
  },
  gb_btrn: function () {
    let that = this
    that.viewadv()
    that.setData({
      activity: false,
    })
  },
  viewadv: function (e) {
    let that = this;
    core.post("advapi/viewadv", {}, function (res) {
      if (res.flag != "Success") {
        core.toast(res.msg, 'none')
      }
    })
  },
})