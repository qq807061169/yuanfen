// components/index/index.js
var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgheights: [],
    current: 0,
    // imgwidth: 750,
    currentSwiper: 0,
    autoplay: true,
    imgUrls: [
    ],
    newslist:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    list(e){
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
  },
  pageLifetimes: {
    show() {
      let that = this
      r.get("&r=news.getnewslist", { page: 0},function(res){
        if (res.error == 0){
          that.setData({
            list:res.list,
            show:!0,
          })
        }else{
          // r.toast(res.)
        }
      }),
        that.swper()
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
