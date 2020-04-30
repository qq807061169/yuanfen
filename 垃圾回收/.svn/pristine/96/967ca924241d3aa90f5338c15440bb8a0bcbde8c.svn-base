// pages/classification/newslist/index.js
var e = getApp(),
  r = e.requirejs("core");
  // t = e.requirejs("wxParse/wxParse");
// import { wxParse } from '../../utils/wxParse/wxParse.js'
var w = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    rs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id: options.id
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
      r.get("&r=news.getnewsone&id=2", { id: that.data.id},function(res){
        if (res.error == 0) {
          console.log(res)
          that.setData({
            rs:res.item,
            show:!0,
            nodes: res.item.content
          })
          w.wxParse('article', 'html', res.item.content, that, 0);
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