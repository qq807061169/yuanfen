// components/personal/index.js
var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
// components/index/index.js
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
    list: '',
    dataarr:[],
    datainfo:[],
    modal:false,
    task:[],
  },
  created: function () {
    
  },
  detached: function () {
  },
  moved: function () {
    // 在组件实例进入页面节点树时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    disnav(){
      wx.navigateTo({
        url: '/classification/details/index?jf=' + this.data.datainfo.my_credit,
      })
    }, 
    newsnav(){
      r.post("&r=news.gonews",{},function(res){
        console.log(res)
      })
      wx.navigateTo({
        url: '/classification/newslist/index',
      })
    },
     sign(){
      let that = this
      r.post("&r=sign",{},function(res){
        if (res.status == 1){
          that.setData({
            dataarr: res.result.date_arr,
            datainfo: res.result,
            task: res.result.task
          })
        }else{
          console.log(res)
        }
      })
    },
    //打卡
    btndak(){
      let that = this
      r.post("&r=sign.dosign",{},function(res){
        if (res.status == 1 || res.status == 2){
          that.setData({
            qd_info: res.result.message,
            modal: true,
          })
        }
      })
    },
    modal_out(){
      let that = this
      that.sign()
      that.setData({
        modal:false
      })
    }
  },
  pageLifetimes: {
    show() {
      let that = this
      that.setData({
        user: e.getCache("userinfo")
      })
      that.sign()
     
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
