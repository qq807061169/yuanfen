// pages/equipment/list/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    keyword:'',
    page:1
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
    this.getList()
  },
  getList(){
    // leaseapi / getBindDevices
    let that = this
    core.post("leaseapi/getBindDevices",{
      keyword: that.data.keyword,
      curpage:that.data.page
    },function(res){
      if (res.flag == "Success"){
        that.setData({
          list:res.data
        })
      }else{
        core.toast(res.msg, 'none');
      }
      that.setData({
        show: true
      })
    })
  },
  clickItem(e){
    let that = this;
    console.log(e)
    wx.navigateTo({
      url: '/pages/equipment/info/index?id=' + e.currentTarget.dataset.id + '&number=' + e.currentTarget.dataset.number + '&date=' + e.currentTarget.dataset.date + '&name=' + e.currentTarget.dataset.name,
    })
  },
  btnbindDevice(){
    wx.scanCode({
      success(res) {
        console.log(res)
        if (res.path.indexOf('pages/ysjindex/index?id=') >= 0) {
          var id = res.path.split("=")[1]
          core.post("leaseapi/bindDevice",{
            devicesid:id
          },function(res){
            if (res.flag == "Success") {
              wx.showToast({
                title: '绑定成功！',
                icon: 'success',
                duration: 3000
              })
              that.getList()
            }else{
              core.toast(res.msg, 'none');
            }
          })
        }else{
          core.toast("请扫正确的设备二维码", 'none');
        }
      },
      fail(res){
        core.toast("扫码失败", 'none');
      }
    })
  },
  searchKey(e){
    let that = this
    that.setData({
      keyword: e.detail.value
    })
    that.getList()
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
    setTimeout(() => {
      let that = this;
      that.setData({
        page: that.data.page + 1,
      })
      core.post("leaseapi/getBindDevices", {
        keyword: that.data.keyword,
        curpage: that.data.page
      }, function (res) {
        if (res.flag == "Success") {
          if (res.data != "") {
            let arrList = that.data.list.concat(res.data)
            that.setData({
              list: arrList
            })
          } else {
            core.toast("没有更多了！", 'none')
            // that.setData({
            //   footfont: true
            // })
          }
        } else {
          core.toast(res.msg, 'none')
        }
      }, true)
    }, 300)
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})