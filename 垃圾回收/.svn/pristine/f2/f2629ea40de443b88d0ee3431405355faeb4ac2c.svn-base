// pages/classification/newslist/index.js
var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classlist:[],
    newsclaasid:'',
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getCategoryList()
  },
  listClass(e) {
    wx.navigateTo({
      url: '/classification/newscontentM/index?id=' + e.currentTarget.dataset.id,
    })
  },
  list(e) {
    wx.navigateTo({
      url: '/classification/newscontent/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    // that.getlist()
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
    setTimeout(() => {
      let that = this;
      that.setData({
        page: that.data.page + 1,
      })
      r.get("&r=news.getNewsList", {
        page: that.data.page,
        category_id: that.data.newsclaasid
      }, function (res) {
        if (res.error == 0) {
          if (res.list != "") {
            let arrList = that.data.list.concat(res.list)
            that.setData({
              list: arrList
            })
          } else {
            that.setData({
              footfont: true
            })
          }
        } else {
          a.toast(res.msg, 'none')
        }
      }, true)
    }, 300)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCategoryList(){
    let that = this
    r.post("&r=news.getCategoryList",{},function(res){
      console.log(res.list[0].id)
      that.setData({
        classlist:res.list,
        newsclaasid: res.list[1].id
      })
      that.getlist()
    })
  },
  getlist(){

    let that = this
    console.log(that.data.newsclaasid)
    r.get("&r=news.getnewslist", { page: that.data.page, category_id: that.data.newsclaasid }, function (res) {
      if (res.error == 0) {
        that.setData({
          list: res.list,
          show: !0,
        })
      } else {
        // r.toast(res.)
      }
    },true)
  },
  showlist(e){
    let that = this
    that.setData({
      newsclaasid: e.currentTarget.dataset.ids,
      page:1
    })
    that.getlist()
  }
 
})