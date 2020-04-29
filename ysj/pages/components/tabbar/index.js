// pages/components/tabbar/index.js
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
    currentTab: 1,
    tabBar: {
      color: "#747474",
      selectedColor: "#528921",
      backgroundColor: "#fff",
      list: [
        {
          selectedIconPath: "/static/images/icon-green/img_discovery.png",
          iconPath: "/static/images/icon/img_discovery.png",
          pagePath: "/pages/discovery/index",
          text: "发现",
          clas: "menu-item",
          selected: false,
        },
        {
          selectedIconPath: "/static/images/icon-green/img_scan.png",
          iconPath: "/static/images/icon-green/img_scan.png",
          pagePath: "",
          text: "",
          clas: "menu-item menu-item2",
          selected: false
        },
        {
          selectedIconPath: "/static/images/icon-green/img_user.png",
          iconPath: "/static/images/icon/img_user.png",
          pagePath: "/pages/member/index/index",
          text: "我的",
          clas: "menu-item",
          selected: false
        }
      ],
      position: "bottom"
    },
    title: '咕咚饮水'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swichNav: function (e) {
      console.log(e)
      let that = this;
      if (e.target.dataset.current == 0) {
        wx.setNavigationBarTitle({
          title: '发现'
        })
        wx.redirectTo({
          url: '/pages/ysjindex/index?currentTab=' + 0,
        })
      } else if (e.target.dataset.current == 2) {
        wx.setNavigationBarTitle({
          title: '我的'
        })
        wx.redirectTo({
          url: '/pages/ysjindex/index?currentTab='+2,
        })
      }
      if (that.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current
        })
      }
    },
    scanQr: function () {
      app.scanQr()
    },

  }
})
