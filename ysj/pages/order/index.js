// pages/index/index.js
var app = getApp(), foxui = app.requirejs("foxui"),
    core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: "",
    orderinfo:[],
    user:[],
    userid:'',
    flag:'',
    curpage:2,
    phoneHeight:'',
    load: true,
    list:'',
    count:'0',
    number:'',
    numberlength:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var th = this;
    if (app.getCache('userinfo')) {
      th.setData({
        user: app.getCache('userinfo')
      })
    } else {
      app.getUserInfo(function () {
        th.setData({
          user: app.getCache('userinfo')
        })
      })
    }

    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;
        // 算出比例
        let ratio = 750 / clientWidth;
        // 算出高度(单位rpx)
        let height = clientHeight * ratio;
        // 设置高度
        that.setData({
          phoneHeight: height/2
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
    var th = this
    core.post("apiservice/getOrderinfo", {
      user_id: th.data.user.id,
      status: th.data.currentTab
    }, function (res) {
      th.setData({
        count: res.msg,
      })
      if (res.flag == 'Error') {
        var pmheight = th.data.phoneHeight
        core.toast(res.msg, 'none')
        th.setData({
          winHeight: pmheight,
        })
      }
      else {
        th.hqgd()
      }
      var number = res.data.length
      var pmheight = number * 305
      th.setData({
        orderinfo: res.data,
        flag: res.flag,
      })
    },true)
    }, 300)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    wx.stopPullDownRefresh() 
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


hqgd:function(){
  var th = this
  setTimeout(function () {
    const query = wx.createSelectorQuery()
    query.select('#column-list').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      console.log(res[0].height)
      th.setData({
        winHeight: res[0].height
      })
    })
  }, 1000);
  
},

//点击
switchNav: function (r) {
  console.log(r)
  var t = this;
  wx.pageScrollTo({
    scrollTop: 0
  })
  if (t.data.flag == "Error"){
    t.setData({
      load: false,
    })
  }
  t.setData({
    currentTab: r.currentTarget.id
  })
  console.log(t.data.currentTab)
  if (t.data.count == t.data.orderinfo.length) {
    t.setData({
      load: false,
      loading: true,//加载动画的显示
    })
  } else {
    t.setData({
      winHeight: "",
      load: true,
      loading: false,//加载动画的显示
      curpage: 2
    })
  }
    core.post("apiservice/getOrderinfo", {
      user_id: t.data.user.id,
      status: t.data.currentTab
    }, function (res) {
      console.log(res)
      t.setData({
        count: res.msg,
      })
      if (res.flag == 'Error' || t.data.orderinfo == []){
        var pmheight = t.data.phoneHeight
        t.setData({
          winHeight: pmheight,
          load: false,
        })
      }else{
        t.hqgd()
      }
      var number = res.data.length
      var pmheight = number * 305
      t.setData({
        // count: res.msg,
        orderinfo: res.data,
        flag: res.flag,
      })
    },true)
  },
  //滑动
  switchTab: function (r) {
    var t = this;
    if (t.data.flag == "Error") {
      t.setData({
        load: false,
      })
    }
    if (t.data.count == t.data.orderinfo.length){
      t.setData({
        load: false,
        loading: true,//加载动画的显示
      })
    }else{
      t.setData({
        winHeight: "",
        load: true,
        loading: false,//加载动画的显示
        curpage:2
      })
    }
    this.setData({
      currentTab: r.detail.current
    }),
      core.post("apiservice/getOrderinfo", {
      user_id: t.data.user.id,
        status: t.data.currentTab
      }, function (res) {
        t.setData({
          count: res.msg,
        })
        if (res.flag == 'Error') {
          var pmheight = t.data.phoneHeight
          t.setData({
            winHeight: pmheight
          })
        } else {
          t.hqgd()
        }
        var number = res.data.length
        var pmheight = number * 305
        t.setData({
          // count: res.msg,
          orderinfo: res.data,
          flag: res.flag,
        })
      },true)
  },


  //底部加载
  onReachBottom: function () {
    setTimeout(() => {
    var t = this;
    // console.log(t)
    t.hqgd()
    if (t.data.load) {//全局标志位，方式请求未响应是多次触发
      core.post("apiservice/getOrderinfo", {
        user_id: t.data.user.id,
        status: t.data.currentTab,
        curpage: t.data.curpage
      }, function (res) {
        // console.log(t.data.count)
        // console.log(t.data.orderinfo.length)
        if (t.data.count == t.data.orderinfo.length) {
          t.setData({
            load: false,
          })
          core.toast('没有数据了', 'none')
        }else{
          var number = res.data.length + t.data.orderinfo.length;
          var pmheight = number * 302
          var arrayinfo = t.data.orderinfo.concat(res.data);
          t.setData({
            numberlength: number,
            orderinfo: arrayinfo,
            flag: res.flag,
            curpage: t.data.curpage + 1,
          })
        }
      })
    }
    }, 300)
  },
  //出水按钮
  btnwater:function(e){
    var t = this;
    console.log(e.currentTarget.dataset.order)
    core.post('Apiservice/sacn_water2',{
      orderno: e.currentTarget.dataset.order
    },function(res){
      if (res.flag == "Success"){
        core.toast(res.msg, 'none')
      }else{
        core.toast(res.msg, 'none')
      }
    })
  }
})