// pages/components/find/index.js
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
    list:''
  },
  created: function () {
    var that = this
    core.post("article/getarticle", {}, function (res) {
      that.setData({
        list: res.data
      })
    }, true);
  },
  detached:function(){
    console.log("1")
  },
  moved:function() {
    // 在组件实例进入页面节点树时执行
    console.log("1")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotoWeb: function (options) {
      var url = options.target.dataset.value;
      var id = options.target.dataset.id;
      app.gotoWeb(url, id, '文章内容');
    },
  },
  pageLifetimes: {
    show() {
      this.setData({
        show:!0,
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
