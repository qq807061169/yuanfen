// pages/intake/index.js
var app = getApp();
    core = app.requirejs("core");
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    waterWidth: '',
    quality: '',
    tds: 0,
    tdslen: 0,
    res: 0,
    user: [],
    id: '',
    order:'',
    out_time:'',
    intds:0,
    attribute:1,
    page:'',
    sign:'',
    paytep:'',
    water_number:'',
    achieve_msg:'',
    modal:false,
    achieve_msgs:"",
    is_achieve:"",
    activity: false,
    getadv: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    core.loading();
    var that = this;
    if (app.getCache('userinfo')) {
      that.setData({
        user: app.getCache('userinfo')
      })
    } else {
      app.getUserInfo(function () {
        that.setData({
          user: app.getCache('userinfo')
        })
      })
    }
    app.editTabBar();
    // var obj = wx.createSelectorQuery();
    // obj.selectAll('.warerdrop').boundingClientRect(function (rect) {
    //   that.setData({
    //     waterWidth: rect[0]['width'] / 2,
    //     res: options.res,
    //     tds:options.tds
    //   })
    // });   
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
      if (res.flag == "Success"){
        that.setData({
          user: res.data
        })
        app.data.balance = res.data.amountbalance
      }else{
        core.toast(res.msg, 'none');
      }
    })

    var sueeid = options.id //设备ID
    that.setData({
      id: sueeid,
      out_time: options.out_time,
      intds: options.intds,
      page: options.page,
      achieve_msg: options.achieve_msg,
      is_achieve: options.is_achieve
    })
    
   
    // 获取可取水量
    core.post('apiservice/getRule_water', {
      deviceid: sueeid,
      watertype: that.data.attribute
    }, function (option) {
      if (option.flag == 'Error') {
        core.toast(option.msg, 'none');
      } else {
        that.setData({
          res: option.data.water_num,
          tds: option.data.tds,
          tdslen: option.data.tds.toString().length,
          quality: option.data.quality,
          sign: option.data.sign,
          water_number: option.data.water_number,
          show:!0,
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    core.hideLoading();
    var mycomponent = this.myComponent = this.selectComponent('#myComponent')
    mycomponent.advertising()
  //滚动到底部
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '咕咚共享饮水'
    })
    this.queryMultipleNodes()
  

    // core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
    //   console.log(res)
    //   that.setData({
    //     usermy: res.data.amountbalance
    //   })
    //   // app.data.balance = res.data.amountbalance
    //   app.data.balance = res.data.amountbalance
    // })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 选择冷热水
  btnwen: function (e) {
    var that = this;
    that.setData({
      attribute: e.target.dataset.id,
    })
    core.post("apiservice/getRule_water", {
      deviceid: that.data.id,
      watertype: that.data.attribute
    }, function (res) {
      if (res.flag == "Success") {
        that.setData({
          res: res.data.water_num,
        })
      } else {
        core.toast(res.msg, 'none');
      }
    }, true)
    
  },
  btnhot: function (e) {
    var that = this;
    that.setData({
      attribute: e.target.dataset.id,
    })
    core.post("apiservice/getRule_water", {
      deviceid: that.data.id,
      watertype: that.data.attribute
    }, function (res) {
      if (res.flag == "Success") {
        that.setData({
          res: res.data.water_num,
        })
      } else {
        core.toast(res.msg, 'none');
      }
    }, true)
   
  },
  scanQr: function () {
    app.scanQr()
  },


// modal-out
  modal_out:function(){
    let that = this;
    let ids  = that.data.id
    core.post("apiservice/getdevices", { id: that.data.id }, function (res) {
      if (res.flag == "Error") {
        if (res.msg == "本设备为租赁模式，请直接按键取水") {
          wx.redirectTo({
            url: '/pages/rental/index?intds=' + res.data.intds + '&tds=' + res.data.tds + '&quality=' + res.data.quality
          })
        } else {
          core.toast(res.msg, 'none')
        }
      } else {
        switch (res.data.link_way) {
          case 1:
            wx.redirectTo({
              url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds + '&page=' + 1 + '&achieve_msg=' + res.data.achieve_msg
            })
            break;
          case 2:
            wx.redirectTo({
              url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds
            });
            break;
          case 3:
            wx.redirectTo({
              url: '/pages/selectwater/index?id=' + ids
            })
            break;
        }
      }
    }, true)
    that.setData({
      showModal : !0
    })
  },
  /**
   * 停止取水
   */


  stop: function () {
    var that = this;
    core.post("apiservice/addOrder", { //新增订单
      devicesid: that.data.id,
      watertype: that.data.attribute,
      paytype: '余额支付',
    }, function (res) {

      that.setData({
        order: res.data['ordersn'],
        paytep:res.data.paytype

      })
      if (res.flag == "Success") {
        // 调用出水的接口
        core.post('apiservice/sacnWater2', {
          orderno: res.data['ordersn']
        }, function (result) {
          if (result.data == 1) {
            // 出水成功页面跳转
            wx.redirectTo({
              url: '/pages/buysuccess/index?order_no=' + that.data.order + '&pages=' + 2 + '&out_time=' + that.data.out_time + '&paytep=' + that.data.paytep
            })
          } else {
            core.toast(result.msg, 'none');
          }
        },true)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    },true);
  },


  /**
   * 充值
   */
  recharge: function(){
    wx.navigateTo({
      url: '/pages/member/wallet/index?flag=recharge',
    })
  },



  queryMultipleNodes() {
    const that = this
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.select('.body').boundingClientRect();
      // 执行查询
      query.exec(ele => {
        let e = ele[0];
        wx.pageScrollTo({
          scrollTop: e.bottom,
        });
      })
    }, 300)
  },
  modal_outs: function () {
    let that = this
    that.setData({
      modal: false,
    })
  },
  
 
})