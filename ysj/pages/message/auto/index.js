// pages/message/auto/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    show_content:true,
    modal_show:true,
    mid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that = this
   that.setData({
     mid: options.mid
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
   * 获取用户信息
   */
  resq(){
    let that = this
    that.setData({
      show_content:false
    })
  },
  show_auto(){
    core.alert("用户未授权,请点击登录授权");
    return
  },
  bindGetUserInfo: function (e) {
    let that = this
    if (e.detail.errMsg == 'getUserInfo:ok'){
      app.globalData.userinfo = e.detail.userInfo
      // 调用获取用户信息的接口
      wx.login({
        success: function (o) {
          if (!o.code) return void core.alert("获取用户登录态失败:" + o.errMsg);
          core.post("Apiservice/login", {
            code: o.code,
            userinfo: e.detail.userInfo,
            mid: that.data.mid,
            flag:'regist'
          }, function (o) {
            console.log(o)
            if(o.flag == 'Success'){
              app.setCache('userinfo',o.data, 7200);
              console.log(app.data.eqId)
              if (app.data.eqId){
                console.log("不为空")
                wx.redirectTo({
                  url: '/pages/ysjindex/index?apigetdevices=' + 1 + "&eqId=" + app.data.eqId,  //1是需要调用接口
                })
              }else{
                console.log("为空")
                wx.redirectTo({
                  url: '/pages/ysjindex/index',
                })
              }
             
            }
          })
        },
        fail: function () {
          e.alert("获取用户信息失败!");
        }
      })
      core.toast('授权成功');
    } else if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
      return ;
    }else {
      core.toast(e.detail.errMsg);
    }
  }
})