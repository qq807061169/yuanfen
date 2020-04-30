var e = require("utils/core.js");

App({
  onShow: function () {
    this.onLaunch();
  },
  onLaunch: function () {
    var e = this;
    wx.getSystemInfo({
      success: function (t) {
        "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
      }
    });
    var t = this;
    wx.getSystemInfo({
      success: function (e) {
        wx.setStorageSync("systemInfo", e);
        var a = e.windowWidth, i = e.windowHeight;
        t.globalData.ww = a, t.globalData.hh = i;
      }
    });
  },
  checkAuth: function () {
    var t = "/pages/auth/index", a = getCurrentPages(), i = a[a.length - 1], n = {
      params: i.options || null,
      url: i.route
    };
    if (n.params.hasOwnProperty("scene")) {
      var o = {}, s = decodeURIComponent(n.params.scene).split("&").shift().split("=");
      o.id = s[1], n.params = o;
    }
    this.setCache("routeData", n);
    this.getCache("userinfo");
    wx.getSetting({
      success: function (a) {
        a.authSetting["scope.userInfo"] ? e.get("member", {}, function (e) {
          e.error && wx.navigateTo({
            url: t
          });
        }) : wx.navigateTo({
          url: t
        });
      }
    });
  },
  requirejs: function (e) {
    return require("utils/" + e + ".js");
  },
  getConfig: function () {
    if (null !== this.globalData.api) return {
      api: this.globalData.api,
      approot: this.globalData.approot,
      appid: this.globalData.appid
    };
    var e = wx.getExtConfigSync();
    return this.globalData.api = e.config.api, this.globalData.approot = e.config.approot,
      this.globalData.appid = e.config.appid, e.config;
  },
  getCache: function (e, t) {
    var a = +new Date() / 1e3, i = "";
    a = parseInt(a);
    try {
      (i = wx.getStorageSync(e + this.globalData.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "",
        this.removeCache(e));
    } catch (e) {
      i = void 0 === t ? "" : t;
    }
    return i = i || "";
  },
  setCache: function (e, t, a) {
    var i = +new Date() / 1e3, n = !0, o = {
      expire: a ? i + parseInt(a) : 0,
      value: t
    };
    try {
      wx.setStorageSync(e + this.globalData.appid, o);
    } catch (e) {
      n = !1;
    }
    return n;
  },
  removeCache: function (e) {
    var t = !0;
    try {
      wx.removeStorageSync(e + this.globalData.appid);
    } catch (e) {
      t = !1;
    }
    return t;
  },
  close: function () {
    this.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  getSet: function () {
    var t = this;
    "" == t.getCache("cacheset") && setTimeout(function () {
      var a = t.getCache("cacheset");
      e.get("cacheset", {
        version: a.version
      }, function (e) {
        e.update && t.setCache("cacheset", e.data);
      });
    }, 10);
  },
  url: function (e) {
    e = e || {};
    var t, a, i = {}, n = this.getCache("usermid");
    for (var o in t = e.mid || "", a = e.merchid || "", n) void 0 !== n[o] && (i[o] = n[o]);
    "" != n ? ("" != n.mid && void 0 !== n.mid || (i.mid = t), "" != n.merchid && void 0 !== n.merchid || (i.merchid = a)) : (i.mid = t,
      i.merchid = a), this.setCache("usermid", i);
  },
  impower: function (e, t, a) {
    wx.getSetting({
      success: function (i) {
        i.authSetting["scope." + e] || wx.showModal({
          title: "用户未授权",
          content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
          confirmText: "去设置",
          success: function (e) {
            e.confirm ? wx.openSetting({
              success: function (e) { }
            }) : "route" == a ? wx.switchTab({
              url: "/pages/index/index"
            }) : "details" == a || wx.navigateTo({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
  },
  globalDataClose: {
    flag: !1
  },
  globalData: {
    appid: "wx3405746cec930a4f",
    // api: "http://192.168.0.102:9096/202003/mendian/app/ewei_shopv2_api.php?i=1",
    // approot: "http://192.168.0.102:9096/202003/mendian/addons/ewei_shopv2/",
    api: "https://boyi.resfine.com/app/ewei_shopv2_api.php?i=1",
    approot: "https://boyi.resfine.com/addons/ewei_shopv2/",
    // api: "http://192.168.0.120/202003/mendian/app/ewei_shopv2_api.php?i=1",
    // approot: "http://192.168.0.120/202003/mendian/addons/ewei_shopv2/",
    userInfo: null,
    isgoods: false,
    mdid:'', //门店id
    storeid:'',//自提点id
    mdtype: '',
    gps: false,
  }
});