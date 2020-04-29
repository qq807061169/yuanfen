// pages/components/my/index.js
var app = getApp(),
  core = app.requirejs("core");
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: [],
    usermy: '',
  },
  //创建时
  created: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
   pageLifetimes: {
    show() {
      // 页面被展示
      var that = this;
      var user = app.getCache('userinfo');
      core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
        // console.log(res)
        that.setData({
          usermy: res.data.amountbalance,
          user: res.data,
          show:!0
        })
        app.data.balance = res.data.amountbalance
      })
      // core.post("apiservice/getPointDetail", { openid: that.data.user.openid},function(res){
      //   console.log(res)
      // })
     
      // wx.request({
      //   url: "http://192.168.0.177/gudong/public/index.php/cms/apiservice/getPointDetail", 
      //   method:"post",
      //   data: {
      //     openid: "o6lCf4iEJOFGd3vDmnEyRwkxwgPM"
      //   },
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success(res) {
      //     console.log(res)
      //   }
      // })


    },
    hide() {
      // 页面被隐藏
   
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
