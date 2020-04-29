// pages/topup/index.js
var app = getApp();
core = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    activity_id: '',
    change: 1, //充值协议控制 1是
    user: [],
    con_info: [], //个人信息
    shows: false, //加载
    select_index: 0, // 控制前端显示
    select_type: '', //  选择线上线下的控制
    disableds: false, //控制按钮
    modal: false, //弹出显示
    item_id: 1,
    region: ['请选择地址', '', ''], // 以下是填下收货地址的内容
    name: '',
    mobile: '',
    address: '',
    district: '',
    city: '',
    province: '', // 以上是填下收货地址的内容
    datalength: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.getlist()
    that.getActivityInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },
  nav_tz(e) {
    wx.navigateTo({
      url: '/pages/topup_list/index'
    })
  },
  //获取用户信息
  getuserinfo(e) {
    var that = this;
    core.post("apiservice/getUserinfo", {}, function(res) {
      that.setData({
        user: res.data
      })
    })
  },
  //选择充值协议
  checkboxChange: function(e) {
    let that = this;
    that.setData({
      change: e.detail.value
    })
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //获取活动列表
  getlist(e) {
    let that = this
    let types = ''
    core.post("activityapi/getActivityList", {}, function(res) {
      // console.log(res)
      if (res.flag == "Success") {
        if (res.data == [] || res.data == "") {
          that.setData({
            datalength: true,
            shows: true,
          })
        } else {
          if (res.data[0].type == 2) {
            types = res.data[0].type
          } else {
            types = 1
          }
          that.setData({
            activity_id: res.data[0].id,
            select_type: res.data[0].type,
            list: res.data,
            item_id: types,
            shows: true,
            datalength: false
          })
        }

      } else {
        core.toast(res.msg, 'none')
      }
    })
  },
  //选择ID
  select(options) {
    let that = this
    let types = ''
    if (options.target.dataset.type == 2) {
      types = 2
    } else {
      types = 1
    }
    that.setData({
      activity_id: options.target.dataset.id,
      select_index: options.target.dataset.index,
      select_type: options.target.dataset.type,
      item_id: types,
    })
  },
  //
  refund() {
    this.setData({
      modal: true
    });
  },
  cancel: function() {
    this.setData({
      modal: false
    });
  },
  input_val: function(options) {
    var that = this;
    var datas = options.target.dataset.info;
    console.log(options)
    that.setData({
      "datas": options.detail.value
    })
  },
  out1: function(options) {
    var that = this;
    that.setData({
      address: options.detail.value
    })
  },
  out2: function(options) {
    var that = this;
    that.setData({
      address: options.detail.value
    })
  },
  tel1: function(options) {
    var that = this;
    that.setData({
      mobile: options.detail.value
    })
  },
  tel2: function(options) {
    var that = this;
    that.setData({
      mobile: options.detail.value
    })
  },
  name1: function(options) {
    var that = this;
    that.setData({
      name: options.detail.value
    })
  },
  name2: function(options) {
    var that = this;
    that.setData({
      name: options.detail.value
    })
  },

  //地址
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2],
    })
  },
  //选择收获方式
  reasonBtn(options) {
    let that = this
    that.setData({
      item_id: options.target.dataset.id,
      mobile: '',
      name: '',
    })
  },
  //充值按钮
  cz_button(e) {
    let that = this
    if (that.data.change != 1) {
      core.toast("请阅读同意充值协议！", 'none')
      return false
    }
    that.setData({
      modal: true
    })

  },
  //判断不能为空
  shownull: function(value, msg) {
    if (value == '' || value == undefined || value.length == 0) {
      core.toast(msg, 'none')
      return true;
    }
  },


  //充值接口
  activityRecharge(e) {
    let that = this
    that.setData({
      disableds: true
    })
    core.post("payapi/activityRecharge", {
      id: that.data.activity_id,
      type: that.data.item_id,
      province: that.data.province,
      city: that.data.city,
      district: that.data.district,
      mobile: that.data.mobile,
      name: that.data.name,
      address: that.data.address,
    }, function(res) {
      if (res.flag == "Success") {
        wx.requestPayment({
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          'success': function(reste) {
            that.getActivityInfo()
            core.toast('充值成功')
            that.setData({
              disableds: false,
              modal: false,
            })
          },
          'fail': function(reste) {
            console.log(reste);
            if (reste.errMsg == 'requestPayment:fail cancel') {
              that.setData({
                disableds: false,
                modal: false,
              })
              wx.showToast({
                icon: 'none',
                title: "支付失败",
              })
            }
          }
        })
      } else {
        that.setData({
          disableds: false,
        })
        core.toast(res.msg, 'none')
      }
    })
  },

  //提交
  qur() {
    let that = this
    if (that.data.item_id == 1) {
      if (that.shownull(that.data.name, '请输入联系人！')) return;
      if (that.shownull(that.data.mobile, '请输入联系电话！')) return;
      if (that.shownull(that.data.address, '请输入详细地址！')) return;
      if (that.shownull(that.data.province, '请选择地址！')) return;
      if (that.shownull(that.data.city, '请选择地址！')) return;
      if (that.shownull(that.data.district, '请选择地址！')) return;
      that.activityRecharge()
    } else {
      if (that.shownull(that.data.name, '请输入联系人！')) return;
      if (that.shownull(that.data.mobile, '请输入联系电话！')) return;
      that.activityRecharge()
    }
  },
  gotoWeb: function(options) {
    var url = options.target.dataset.value ? options.target.dataset.value : '';
    var id = options.target.dataset.id ? options.target.dataset.id : '';
    app.gotoWeb(url, id, '用户协议');
  },
  geturl(options) {
    let url = options.target.dataset.url
    wx.navigateTo({
      url: '/pages/web/index?url=' + url,
    })
  },
  // 获取待返水币和消费的接口
  getActivityInfo(e) {
    let that = this
    core.post("activityapi/getActivityInfo", {}, function(res) {
      if (res.flag == "Success") {
        that.setData({
          con_info: res.data
        })
      } else {
        core.toast(res.msg, 'none')
      }
    })
  },
  previewImg: function (e) {
    let imgArr = e.currentTarget.dataset.src;
    let imgList  = []
    // for (let i = 0; i <= this.data.list.length;i++){
    //   console.log(this.data.list[i].thumb) 
    //   imgList.push(this.data.list[i].thumb)
    // }
    imgList.push(e.currentTarget.dataset.src)
    wx.previewImage({
      current: imgArr,     //当前图片地址
      urls: imgList,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

  
})