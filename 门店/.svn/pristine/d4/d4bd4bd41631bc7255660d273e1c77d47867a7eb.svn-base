// components/showgps/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modals: {
      type: Boolean,
      value: '',
    },
    

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAuthLocation: function () {
      var that = this
      wx.openSetting({
        success(res) {
          console.log(res.authSetting["scope.userLocation"])
          // console.log(res.authSetting[scope.userLocation])
          if (res.authSetting["scope.userLocation"]){
            getApp().globalData.gps = false
         }else{
            getApp().globalData.gps = true
         }
          that.setData({
            show: false,
          })
        }
      })
    },
    onnull(){
      this.setData({
        show: false,
      })
    },
  },
  pageLifetimes: {
    show() {
      var that = this
      console.log(getApp().globalData.gps)
      if (getApp().globalData.gps ){
        that.setData({
          show:true,
        })
      }else{
        that.setData({
          show: false,
        })
      }
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
