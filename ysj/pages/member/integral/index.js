// pages/member/coin/index.js
var app = getApp(),
  core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    pointarr:[],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    core.loading();
    var that = this;
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

    core.post("apiservice/getCreditsDetail", { openid: that.data.user.openid, keyword: options.keyword}, function (res) {
      console.log(res)
      if (res.flag = "Success") {
        that.setData({
          pointarr: res.data
        })
      } else {
        core.toast(res.msg, 'none')
      }
    }, true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    core.hideLoading();
    this.setData({
      show:true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
      that.setData({
        user: res.data
      })
    })
      

    //    wx.request({
    //   url: "http://192.168.0.177/gudong/public/index.php/cms/apiservice/getPointDetail",
    //   method: "post",
    //   data: {
    //     openid: "o6lCf4inCW7IUqaNcibUQcWp5Y5M"
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       pointarr: res.data
    //     })
    //   }
    // })
  
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