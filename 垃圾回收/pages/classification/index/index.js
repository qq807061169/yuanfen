// pages/classification/index/index.js
var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgheights: [],
    current: 0,
    // imgwidth: 750,
    currentSwiper: 0,
    autoplay: true,
    imgUrls: [
    ],
    newslist: [],
    page:1,
  },

  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      src = [],
      //宽高比
      ratio = imgwidth / imgheight;
    src.push(e.target.dataset['src'])
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  list(e) {
    wx.navigateTo({
      url: '/classification/newscontent/index?id=' + e.currentTarget.dataset.id,
    })
  },
  listClass(e) {
    console.log(e)
    wx.navigateTo({
      url: '/classification/newscontentM/index?id=' + e.currentTarget.dataset.id,
    })
  },
  swper() {
    let that = this
    r.post("&r=shop.banner.getbannerlist", {}, function (res) {
      console.log(res)
      that.setData({
        tel: res.customer,
        imgUrls: res.list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    
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
      page: 1
    })
    r.get("&r=news.getNewsList", { page: that.data.page }, function (res) {
      if (res.error == 0) {
        console.log(res)
        that.setData({
          list: res.list,
          show: !0,
        })
      } else {
        // r.toast(res.)
      }
    }),
      that.swper()
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

  }
})