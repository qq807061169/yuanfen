// pages/topup_list/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    shows: false, //加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    setTimeout(() => {
      var that = this;
      that.setData({
        page:that.data.page+1,
      })
      core.post("activityapi/getActivityLog", {
        curpage: that.data.page,
      }, function (res) {
        if (res.flag == "Success") {
          if(res.data != ""){
            let arrList = that.data.list.concat(res.data)
            that.setData({
              list: arrList
            })
          }else{
            core.toast('没有数据了', 'none')
          }
        } else {
          core.toast(res.msg, 'none')
        }
      })

      

    }, 300)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getList(){
    let that = this
    core.post("activityapi/getActivityLog",{
      curpage:that.data.page,
    },function(res){
      if (res.flag == "Success"){
        that.setData({
          list:res.data,
          shows:true,
        })
      }else{
        core.toast(res.msg, 'none')
      }
    })
  },
  btn_content(e){
    let str = JSON.stringify(e.currentTarget.dataset.content);
    wx.navigateTo({
      url: '/pages/topup_content/index?content='+str,
    })
  },
  btn_navDet(e){
    console.log(e)
    let keyword = e.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '/pages/member/coin/index?keyword=' + keyword,
    })
  }

})