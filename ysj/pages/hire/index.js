// pages/hire/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //设备id
    list: [],
    curitemId: '', //套餐id
    leasetype: '',
    modal_show: false,
    btn_foot: "立即购买",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      id: options.id,
      orderid: options.orderid,
    })
    that.getData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.orderid ? this.setData({
      btn_foot: "立即续租"
    }) : this.setData({
      btn_foot: "立即购买"
    })
    this.setData({
      show: true,
    })
  },
  getData(id) {
    let that = this
    core.post("apiservice/getdevices", {
      id: id
    }, function(res) {
      if (res.msg == "Success") {
        console.log(res.data.cold_package)
        let curitem0
        // if (res.data.rules) {
        //   curitem0 = res.data.rules.id
        // } else {
        //   curitem0 = res.data.cold_package[0].id
        // }
        curitem0 = res.data.cold_package[0].id
        that.setData({
          list: res.data.cold_package,
          curitemId: curitem0,
          rules: res.data.rules,
          url:res.data.url,
        })
      } else {
        core.toast(res.msg, 'none');
      }
    }, true)
  },
  btnselect(e) {
    let that = this
    console.log(e.target.dataset.id)
    that.setData({
      curitemId: e.target.dataset.id,
      leasetype: e.target.dataset.leasetype,
    })
  },
  btn_ljgm() {
    let that = this
    if (that.data.orderid) {
      core.post("leaseapi/renewOrder", {
        packageid: that.data.curitemId,
        orderid: that.data.orderid,
        paytype: 1,
      }, function(res) {
        if (res.flag == "Success") {
          console.log(res)
          core.post("payapi/payLeaseOrder", { //微信支付
            id: res.data.id
          }, function(results) {
            console.log(results)
            wx.requestPayment({
              timeStamp: results.data.timeStamp.toString(),
              nonceStr: results.data.nonceStr,
              package: results.data.package,
              signType: 'MD5',
              paySign: results.data.paySign,
              'success': function(reste) {
                console.log(reste);
                core.toast("支付成功", 'none');
                wx.navigateTo({
                  url: '/pages/equipment/list/index',
                })
              },
              'fail': function(reste) {
                // console.log(res.data)
                if (reste.errMsg == 'requestPayment:fail cancel') {
                  core.alert("取消支付")
                }
              }
            })
          }, true)
        } else {
          core.toast(res.msg, 'none');
        }
      })
    } else {
      that.setData({
        modal_show: true,
      })
    }
  },
  out1(e) {
    let that = this
    console.log(e)
    var named = e.target.dataset.names
    that.setData({
      [named]: e.detail.value
    })
  },
  modal_gb() {
    let that = this
    that.setData({
      modal_show: false,
    })
  },
  btnSubmit() {
    let that = this;
    core.post("leaseapi/addOrder", {
      devicesid: that.data.id,
      packageid: that.data.curitemId,
      paytype: 1,
      name: that.data.name,
      mobile: that.data.mobile,
    }, function(res) {
      console.log(res)
      if (res.flag == "Success") {
        core.post("payapi/payLeaseOrder", { //微信支付
          id: res.data.id
        }, function (results) {
          console.log(results)
          wx.requestPayment({
            timeStamp: results.data.timeStamp.toString(),
            nonceStr: results.data.nonceStr,
            package: results.data.package,
            signType: 'MD5',
            paySign: results.data.paySign,
            'success': function (reste) {
              console.log(reste);
              core.toast("支付成功", 'none');
              wx.navigateTo({
                url: '/pages/equipment/list/index',
              })

            },
            'fail': function (reste) {
              // console.log(res.data)
              if (reste.errMsg == 'requestPayment:fail cancel') {
                core.alert("取消支付")
              }
            }
          })
        }, true)
        

        core.toast(res.msg, 'none');
        that.setData({
          modal_show: false,
        })
      } else {
        core.toast(res.msg, 'none');
      }
    })
  },
  clickurl(){
    let that = this
    wx.navigateTo({
      url: '/pages/web/index?url='+that.data.url,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})