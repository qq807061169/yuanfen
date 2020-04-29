// pages/components/adv/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:'',
    },
    currentIndex: {
      type: Number,
      value: 0,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    modal: false,
    activity_cz: false,
    getadv: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 广告弹出
    advertising: function () {
      let that = this;
      core.post("advapi/getadv", {
        deviceid: this.data.text
      }, function (res) {
        if (res.flag == "Success") {
         
          // console.log(typeof (res.data))
          // var datas = res.data
          // console.log(datas)
          // console.log(res.data.length)

          if (res.data.length > 0) {
          // if (res.data) {
            that.setData({
              getadv: res.data,
              activity_cz: true,
            })
          }
        } else {
          core.toast(res.msg, 'none')
        }
      })
    },
    noViewAdv(e) {
      let that = this;
      console.log(e)
      core.post("advapi/noViewAdv", {
        id: e.currentTarget.dataset.id,
      }, function (res) {
        if (res.flag == "Success") {
          that.setData({
            activity: false,
          })
        } else {
          core.toast(res.msg, 'none')
        }
      })
    },
    gb_btrn: function () {
      let that = this
      that.viewadv()
      that.setData({
        activity_cz: false,
      })
    },
    viewadv: function (e) {
      let that = this;
      core.post("advapi/viewadv", {}, function (res) {
        if (res.flag != "Success") {
          core.toast(res.msg, 'none')
        }
      })
    },
  
    nav_btg: function () {
      let that = this;
      that.viewadv()
    },
    changeIndicatorDots(e){
      let that = this
      that.setData({
        currentIndex: e.detail.current
      })
    }
  },
  pageLifetimes: {
    show() {
      // console.log("12")
      // this.advertising()
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  }
})
