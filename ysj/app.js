var e = require("utils/core.js");
App({
  data: {
    globalnum: 1, // 用于测试的全局变量
    balance:'',
    point:'',
    modal:"",
    achieve_msgs:"",
    globals:1, //用于广告弹出
    eqId:"",//首次登录进来设备id的存放
    mid:""
  },
	onLaunch : function () {
    var e = this.getCache("userinfo");
    var arr = Object.keys(e);
    if (!e || e == '' || arr.length==0 || e == null || e == undefined || e.length == 0 ){
      this.getUserInfo();
    };

	},
  onShow: function (options) {
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {//如果有新版本
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.getUpdateManager().applyUpdate();
        })
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    })
  },
  scanQr: function (callback) {
    wx.scanCode({
      success(res) {
        // console.log(res)
        if (!res.path == "") {
          if (res.path.indexOf('pages/ysjindex/index?id=') >= 0) {
            var ids = res.path.split("=")[1]
            if (ids == "") {
              core.toast('缺少设备信息', 'none')
            } else {
              core.post("apiservice/getdevices", { id: ids }, function (res) {
                if(res.flag == "0"){
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
                }else if (res.flag == "Error") {
                  if (res.msg == "本设备为租赁模式，请直接按键取水") {
                    wx.redirectTo({
                      url: '/pages/rental/index?intds=' + res.data.intds + '&tds=' + res.data.tds + '&quality=' + res.data.quality
                    })
                  } else {
                      //租赁模式 跳转
                    if (res.data.scenario == 2){
                      wx.redirectTo({
                        url: '/pages/hire/index?id=' + ids
                      })
                    }else{
                      core.toast(res.msg, 'none')
                    }
                  }
                } else {
                  switch (res.data.link_way){
                    case 1 :
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
            }
          } else if (res.path.indexOf('pages/ysjindex/index?activity_id=') >= 0){
            var activity_id = res.path.split("/")[2]
            var test = activity_id.split("&")[0]
            var test1 = activity_id.split("&")[1]
            var pathId = test.split("=")[1]
            var pathCode
            if (test1 == undefined){
              pathCode = ""
            }else{
              pathCode = test1.split("=")[1]
            }
            core.post("apiservice/getactivity", { id: pathId, code: pathCode }, function (res) {
              if (res.flag == "Success") {
                if (callback!=null){
                  console.info(res);
                  callback(res);
                }
              } else {
                core.toast(res.msg, 'none')
              }
            })
          }else {
            core.toast('请扫正确的小程序码~', 'none')
          }
        } else {
          core.toast('扫对应的小程序码~', 'none')
        }
      },
      fail: (res) => {
        // core.toast('扫码失败~', 'none')
      }
    })
  },



	requirejs : function (e) {
		return require("utils/" + e + ".js")
	},
	getCache : function (e, t) {
		var i = +new Date / 1e3,
		n = "";
		i = parseInt(i);
		try {
			n = wx.getStorageSync(e + this.globalData.appid),
			n.expire > i || 0 == n.expire ? n = n.value : (n = "", this.removeCache(e))
		} catch (e) {
			n = void 0 === t ? "" : t
		}
		return n = n || ""
	},
	setCache : function (e, t, i) {
		var n = +new Date / 1e3,
		a = !0,
		o = {
			expire : i ? n + parseInt(i) : 0,
			value : t
		};
		try {
			wx.setStorageSync(e + this.globalData.appid, o)
		} catch (e) {
			a = !1
		}
		return a
	},
	removeCache : function (e) {
		var t = !0;
		try {
			wx.removeStorageSync(e + this.globalData.appid)
		} catch (e) {
			t = !1
		}
		return t
	},
	getUserInfo : function (t, i) {
    // console.log(t)

		var n = this,
		    a = n.getCache("userinfo");
    console.log(n.data.mid)
		if (a) return void(a);
		wx.login({
			success : function (o) {
				if (!o.code) return void e.alert("获取用户登录态失败:" + o.errMsg);
				e.post("Apiservice/login", {
          code: o.code,
          mid: n.data.mid ? n.data.mid :'',
          flag:'login',
				}, function (o) {
          if(o.flag == 'Success'){
            n.setCache('userinfo', o.data, 7200);
            t && "function" == typeof t && t(a);
            //wx.redirectTo({
            //  url: '/pages/index/index',
            //})
          }else if(o.flag == 'Error'){
            wx.reLaunch({
              url: '/pages/message/auto/index?mid=' + n.data.mid,
            })
          }
				})
			},
			fail : function () {
				e.alert("获取用户信息失败!")
			}
		})
	},

	getSet : function () {
		// var t = this;
		// "" == t.getCache("sysset") && setTimeout(function () {
		// 	var i = t.getCache("cacheset");
		// 	e.get("cacheset", {
		// 		version : i.version
		// 	}, function (e) {
		// 		e.update && t.setCache("cacheset", e.data),
		// 		t.setCache("sysset", e.sysset, 7200)
		// 	})
		// }, 10)
	},
	url : function (e) {
		e = e || {};
		var t = {},
		i = "",
		n = "",
		a = this.getCache("usermid");
		if (e.scene){
      var scene = decodeURIComponent(e.scene);
      var qstring = [];
      var strs = scene.split("&");
      for (var ii = 0; ii < strs.length; ii++) {
        qstring[strs[ii].split("=")[0]] = unescape(strs[ii].split("=")[1]);
      }
      if (qstring.mid) e.mid = qstring.mid;
      //console.log(e.mid);
    }
		i = e.mid || "",
		n = e.merchid || "",
		"" != a ? ("" != a.mid && void 0 !== a.mid || (t.mid = i), "" != a.merchid && void 0 !== a.merchid || (t.merchid = n)) : (t.mid = i, t.merchid = n),
		this.setCache("usermid", t, 7200)
	},
  impower: function (e, t, i) {
    wx.getSetting({
      success: function (a) {
        console.log(a), a.authSetting["scope." + e] || wx.showModal({
          title: "用户未授权",
          content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
          confirmText: "去设置",
          success: function (e) {
            e.confirm ? wx.openSetting({
              success: function (e) { }
            }) : "route" == i ? wx.switchTab({
              url: "/pages/index/index"
            }) : "details" == i || wx.navigateTo({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
  },
  //切换tabbar的方法  
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  // 跳转到web页面
  gotoWeb: function(url, param, title){
    if(param == ''){
      var url = this.globalData.api + url;
    }else{
      var url = this.globalData.api + url + '/id/' + param;
    }
    wx.navigateTo({
      url: '/pages/web/index?url='+url+'&title='+title,
    })
  },
  globalData: {
    appid: "wxf98ca3e715f173e2",
    // api: "http://192.168.0.102/gudong/public/index.php/cms/",
    // api: "http://192.168.0.102:9096/201901/gudong/public/index.php/cms",
    // http://localhost:9096/201901/gudong/public/
    // api: "http://localhost:9096/www/2019yiadmin/public/index.php/cms/",
    // api: "http://192.168.1.128/ysj//public/index.php/cms/",
    // api: "https://water.resfine.com/public/index.php/cms/",
    // api: "https://testwater.resfine.com/public/index.php/cms/",  
    api: "https://www.hztule.com/public/index.php/cms/", 
    apikey: "APP3487219823",
    ApiSecret: "pr3f2WGdTCTYSOFT201401fcWdxJgFQZLySv",
    tabBar: {
      color: "#747474",
      selectedColor: "#37b6ff",
      backgroundColor: "#fff",
      list: [
        {
          selectedIconPath: "/static/images/icon-green/img_discovery.png",
          iconPath: "/static/images/icon/img_discovery.png",
          pagePath: "/pages/discovery/index",
          text: "发现",
          clas: "menu-item",
          selected: false,
        },
        {
          selectedIconPath: "/static/images/icon-green/img_scan.png",
          iconPath: "/static/images/icon-green/img_scan.png",
          pagePath: "/pages/index/index",
          text: "",
          clas: "menu-item menu-item2",
          selected: false
        },
        {
          selectedIconPath: "/static/images/icon-green/img_user.png",
          iconPath: "/static/images/icon/img_user.png",
          pagePath: "/pages/member/index/index",
          text: "我的",
          clas: "menu-item",
          selected: false
        }
      ],
      position: "bottom"
    },
	}
})