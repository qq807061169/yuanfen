// pages/selectwater/index.js
var app = getApp(),
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usermy: '',
    // show:false,
    waterWidth: '',
    quality: '',
    tds: 0,
    tdslen: 0,
    intds:0,
    num: [],
    quality_default: '', //套餐id
    quality_num: '', 
    packageid:'',//支付完套餐id
    res:'',
    userid:'',//用户id
    sueeid:'',//设备id
    pay:'',//支付金额
    order: '',//订单号
    user:[],
    disb:false,
    outtime:'',
    attribute:1,
    cold_package:[], //冷水
    hot_package:[],//热水
    modal: false,
    is_achieve:'', //控制送水币显示

    // previousMargin: 0,
    // nextMargin: 0,
    // activity:false,//广告
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sueeid = options.id //设备ID
    // var user = app.getCache('userinfo');  //获取用户信息
    // var userid = user.id
    core.post("apiservice/getdevices", { id: sueeid}, function (res) {
      if (res.flag == 'Error'){
        core.toast(res.msg, 'none');
      }else{
        that.setData({
          cold_package: res.data.cold_package,
          hot_package: res.data.hot_package,
          intds: res.data.intds,
        })
      }
    });
  if(app.getCache('userinfo')){
      that.setData({
        user: app.getCache('userinfo')
      })
    }else{
      app.getUserInfo(function(){
        that.setData({
          user: app.getCache('userinfo')
        })
      })
    }
    core.post("apiservice/getUserinfo", { user_id: that.data.user.id }, function (res) {
      that.setData({
        user: res.data
      })
    })
    core.loading();
 
    core.post('apiservice/getRule_water', {
      deviceid: sueeid,
      watertype: that.data.attribute,
    }, function (option) {
      // console.log(option);
      if (option.flag == 'Error') {
        core.toast(data.msg, 'none');
      } else {
        // console.log(option);
        app.editTabBar();
        
        that.setData({
          tds: option.data.tds,
          tdslen: option.data.tds.toString().length,
          quality: option.data.quality,
          sueeid: sueeid,
        })
      }
    });
    that.setData({
      page: options.page,
      achieve_msg: options.achieve_msg,
      is_achieve: options.is_achieve,
      sueeid: options.id
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    core.hideLoading();
 
    this.setData({
      show:!0,
    })
    var mycomponent = this.myComponent = this.selectComponent('#myComponent')
    mycomponent.advertising()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '咕咚共享饮水'
    })
    this.queryMultipleNodes()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.redirectTo({
    //   url: '/pages/index/index'
    // })
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

  /**
   * 选择水量
   */
  select: function(options){
    console.log(options);
    var that = this;
    this.setData({
      quality_default: options.target.dataset.id,
      quality_num: options.target.dataset.value,
      pay: options.target.dataset.amount,
      outtime: options.target.dataset.time
    })
    console.log(options.target.dataset.value, options.target.dataset.amount,options.target.dataset.time)
  },
  scanQr: function () {
    var that = this;
    wx.scanCode({
      success(res){
        console.log(res)
        // core.loading();
        if(!res.path == ""){
          if (res.path.indexOf('pages/ysjindex/index?id=') >= 0) {
            var ids = res.path.split("=")[1]
            core.post("apiservice/getdevices",{id:ids},function(rest){
              if (res.flag == "0") {
                core.confirm(res.msg,
                  function () {
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
                  },
                  function () {
                    console.log("取消")
                  }
                )
              }else if (rest.flag == "Error"){
                core.toast(rest.msg, 'none')
              }else{
                that.setData({
                  num: rest.data.package,
                  outtime: rest.data.rules.out_time
                })
                core.toast(rest.msg, 'none')
              }
            },true)
          } else if (res.path.indexOf('pages/ysjindex/index?activity_id=') >= 0) {
            var activity_id = res.path.split("/")[2]
            var test = activity_id.split("&")[0]
            var test1 = activity_id.split("&")[1]
            var pathId = test.split("=")[1]
            var pathCode
            if (test1 == undefined) {
              pathCode = ""
            } else {
              pathCode = test1.split("=")[1]
            }

            core.post("apiservice/getactivity", { id: pathId, code: pathCode}, function (res) {
              if (res.flag == "Success") {
                that.setData({
                  modal:true,
                  achieve_msgs: res.msg,
                  point: res.data.point
                })
              } else {
                core.toast(res.msg, 'none')
              }
            })
          }else{
            core.toast('请扫正确的小程序码~', 'none')
          }
        }else{
          core.toast('扫对应的小程序码~', 'none')
        }
      },
      fail: (res) => {
        core.toast('扫码失败~', 'none')
        console.log(res);
      }
    })
  },
  /**
   * 立即购买
   */
  modal_out: function () {
    let that = this
    that.setData({
      modal: false,
    })
  },

  buy: function(e){
    var t = this
    if (t.data.quality_num == '') {
      core.alert("请选择套餐！")
      return false
    }
    t.setData({
      disb:true
    })
    if (t.data.packageid == t.data.quality_default){
      core.post("payapi/payorder", {  //微信支付
        user_id: t.data.user.id,
        orderno: t.data.order
      }, function (results) {
        wx.requestPayment({
          timeStamp: results.data.timeStamp.toString(),
          nonceStr: results.data.nonceStr,
          package: results.data.package,
          signType: 'MD5',
          paySign: results.data.paySign,
          'success': function (reste) {
            console.log(reste);
            wx.redirectTo({
              url: '/pages/buysuccess/index?order_no=' + t.data.order + '&pages=' + 1
            })
          },
          'fail': function (reste) {
            // console.log(res.data)
            if (reste.errMsg == 'requestPayment:fail cancel') {
              core.alert("取消支付")
            }
            t.setData({
              disb: false,
              // packageid: res.data.packageid
            })
          }
        })
      },true)
    }else{
      core.post("apiservice/addOrder", {   //订单
        devicesid: t.data.sueeid,
        user_id: t.data.user.id,
        packageid: t.data.quality_default,
        watertype: t.data.attribute,
        paytype: '微信支付',
      }, function (res) {
        t.setData({
          order: res.data['ordersn']
        })
        if (res.flag == "Success") {
          console.log(res.data)
          core.post("payapi/payorder", {  //微信支付
            user_id: t.data.user.id,
            orderno: res.data['ordersn']
          }, function (results) {
            if (results.flag == "Success"){
              wx.requestPayment({
                timeStamp: results.data.timeStamp.toString(),
                nonceStr: results.data.nonceStr,
                package: results.data.package,
                signType: 'MD5',
                paySign: results.data.paySign,
                'success': function (reste) {
                  // console.log(reste);
                  wx.redirectTo({
                    url: '/pages/buysuccess/index?order_no=' + t.data.order + '&pages=' + 1 + '&out_time=' + t.data.outtime
                  })
                },
                'fail': function (reste) {
                  console.log(res.data)
                  if (reste.errMsg == 'requestPayment:fail cancel') {
                    core.alert("取消支付")
                  }
                  t.setData({
                    disb: false,
                    packageid: res.data.packageid
                  })
                }
              })
            }else{
              wx.showToast({
                icon: 'none',
                title: results.msg,
              })
            }
            t.setData({
              disb: false,
            })
          },true)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg,
          })
          t.setData({
            disb: false,
          })
        }
      },true);
    }
    
  },


  // 选择冷热水
  btnwen:function(e){
    var that = this;
    that.setData({
      attribute: e.target.dataset.id,
    })
  },
  btnhot: function (e) {
    var that = this;
    that.setData({
      attribute: e.target.dataset.id,
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
  modal_out: function () {
    let that = this;
    let ids = that.data.sueeid
    core.post("apiservice/getdevices", { id: that.data.sueeid }, function (res) {
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
      showModal: !0
    })
  },

})