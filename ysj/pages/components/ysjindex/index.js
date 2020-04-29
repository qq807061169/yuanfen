// pages/components/ysjindex/index.js
var app = getApp();
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
    show: 0,
    fulldata: app.data.globalnum,
    achieve_msg:"",
  },
  created:function(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotoWeb: function (options) {
      var url = options.target.dataset.value ? options.target.dataset.value : '';
      var id = options.target.dataset.id ? options.target.dataset.id : '';
      app.gotoWeb(url, id, '用户协议');
    },
    agreement: function () {
      var that = this;
      console.log(that.data.fulldata)
      if (that.data.fulldata == 1) {
        var num = 0;
      } else if (that.data.fulldata == 0) {
        var num = 1;
      }
      that.setData({
        fulldata: num
      })
      app.data.globalnum = that.data.fulldata;
    },
    sq: function () {
      app.scanQr()
    },
    modal_out:function(){
      this.triggerEvent("twoLevelCommentBtn", false);
    }
  },
  pageLifetimes: {
    show() {
      var that = this
      that.setData({
        show: 1
      })
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
