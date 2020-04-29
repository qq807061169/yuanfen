// pages/ysjindex/index.js
var app = getApp();
core = app.requirejs("core");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    is_achieve: '', //控制送水币显示
    usermy:[],
    user:[],
    currentIndex:0,
    tabBar: {
      color: "#747474",
      selectedColor: "#528921",
      backgroundColor: "#fff",
      list: [
        {
          selectedIconPath: "/static/images/icon-green/img_discovery.png",
          iconPath: "/static/images/icon/img_discovery.png",
          pagePath: "",
          text: "发现",
          clas: "menu-item",
          selected: false,
        },
        {
          selectedIconPath: "/static/images/icon-green/img_scan.png",
          iconPath: "/static/images/icon-green/img_scan.png",
          pagePath: "1",
          text: "",
          clas: "menu-item menu-item2",
          selected: false
        },
        {
          selectedIconPath: "/static/images/icon-green/img_user.png",
          iconPath: "/static/images/icon/img_user.png",
          pagePath: "",
          text: "我的",
          clas: "menu-item",
          selected: false
        }
      ],
      position: "bottom"
    },
    title:'咕咚饮水',
    modal:false,
    activity: false,
    getadv:[],
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  swichNav: function (e) {
    let that = this;
    if (e.target.dataset.current == 0){
      wx.setNavigationBarTitle({
        title: '发现'
      })
    } else if (e.target.dataset.current == 2){
      wx.setNavigationBarTitle({
        title: '我的'
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  scanQr: function (a,b) {
    var that = this
    app.scanQr(function B(res) {
      that.setData({
        modal:true,
        achieve_msgs:res.msg,
        point: res.data.point
      })
    });
  },
  twoLevelCommentBtn:function(r){
    // console.log(r)
  },
  modal_out:function(){
    let that  = this
    that.setData({
      modal:false,
    })
  },
  gb_btrn: function () {
    let that = this
    that.viewadv()
    that.setData({
      activity: false,
    })
  },
  tz_btn:function(){
    wx.navigateTo({
      url: '/pages/topup/index'
    })
  },
  getPhoneNumber(e){
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // console.log(e)
      wx.login({
        success(o) {
          core.post("Apiservice/login",
          {
            code: o.code,
            flag: 'login',
          },function(r){
            // console.log(r)
            core.post("apiservice/bindMobile",{
              sessionkey: r.data.session_key,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },function(t){
              // console.log(t)
              if (t.flag == "Success"){
                core.toast("绑定成功！", 'none')
                that.setData({
                  activity:false
                })
              }else{
                core.toast(t.msg, 'none')
              }
            })
          })
        }
      })
    }
  },
  onLoad: function (options) {
    // console.log(options)
    var that = this
    var user = app.getCache('userinfo');
    var ids = options.id;
    app.data.eqId = options.id;
    var activity_id = options.activity_id
    if (options.apigetdevices==1){
      // console.log(options.eqId)
      that.getdevices(options.eqId)
    }
    if (activity_id){
      core.post("apiservice/getactivity", { id: activity_id},function(res){
        if (res.flag == "Success"){
          that.setData({
            modal:true,
            achieve_msgs: res.msg,
            point: res.data.point
          })
        }else{
          core.toast(res.msg, 'none')
        }
      })
    }
    that.getdevices(ids)
    that.setData({
      currentTab: options.currentTab,
    })
    app.data.mid = options.mid,
    that.advertising()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var that = this
    if (that.data.currentTab == 0){
      wx.setNavigationBarTitle({
        title: '发现'
      })
      
    }
    if (that.data.currentTab == 2) {
      wx.setNavigationBarTitle({
        title: '我的'
      })
    }
 
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
    app.data.globals  = 2;
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

//获取id进入页面
  getdevices:function(ids){
    core.post("apiservice/getdevices", { id: ids }, function (res) {
      if (res.flag == "0") {
        wx.showModal({
          title: '提示',
          content: res.msg,
          confirmText: "继续取水", //默认是“确定”
          success: function (rest) {
            if (rest.cancel) {
              //点击取消
            } else if (rest.confirm) {
              //点击确定
              switch (res.data.link_way) {
                case 1:
                  wx.redirectTo({
                    url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds + '&page=' + 1 + '&achieve_msg=' + res.data.achieve_msg + '&is_achieve=' + res.data.is_achieve
                  })
                  break;
                case 2:
                  wx.redirectTo({
                    url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds + '&is_achieve=' + res.data.is_achieve + '&achieve_msg=' + res.data.achieve_msg
                  });
                  break;
                case 3:
                  wx.redirectTo({
                    url: '/pages/selectwater/index?id=' + ids + '&is_achieve=' + res.data.is_achieve + '&achieve_msg=' + res.data.achieve_msg
                  })
                  break;
              }
            }
          }
        })
      } else if (res.flag == "Error") {
        if (res.msg == '缺少参数：id') {
        } else if (res.msg == "本设备为租赁模式，请直接按键取水") {
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
              url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds + '&page=' + 1 + '&achieve_msg=' + res.data.achieve_msg + '&is_achieve=' + res.data.is_achieve
            })
            break;
          case 2:
            wx.redirectTo({
              url: '/pages/intake/index?id=' + ids + '&out_time=' + res.data.rules.out_time + '&intds=' + res.data.intds + '&is_achieve=' + res.data.is_achieve + '&achieve_msg=' + res.data.achieve_msg
            });
            break;
          case 3:
            wx.redirectTo({
              url: '/pages/selectwater/index?id=' + ids + '&is_achieve=' + res.data.is_achieve + '&achieve_msg=' + res.data.achieve_msg
            })
            break;
        }
      }
    }, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 广告弹出
  advertising:function () {
    let that = this;
    core.post("advapi/getadv", { }, function(res){
      if (res.flag == "Success"){
        // console.log(res.data)
        if(res.data.length > 0){
          that.setData({
            getadv: res.data,
            activity: true,
          })
        }
      }else{
        core.toast(res.msg, 'none')
      }
    })
  },
  viewadv:function(e){
    let that = this;
    core.post("advapi/viewadv", {}, function (res) {
      if (res.flag != "Success") {
        core.toast(res.msg, 'none')
      } 
    })
  },
  nav_btg:function(){
    let that = this;
    that.viewadv()
  },
 
  noViewAdv(e){
    let that = this;
    console.log(e)
    core.post("advapi/noViewAdv",{
      id: e.currentTarget.dataset.id,
    },function(res){
      if (res.flag == "Success") {
        that.setData({
          activity: false,
        })
      }else{
        core.toast(res.msg, 'none')
      }
    })
  },
  changeIndicatorDots(e) {
    let that = this
    that.setData({
      currentIndex: e.detail.current
    })
  }
})