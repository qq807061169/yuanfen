var e = require("utils/core.js");

App({
  onShow: function () {
    console.error('')
    this.onLaunch();
  },
  onLaunch: function () {
    // var e = this;
    // var use = this.getCache("userinfo");
    // var arr = Object.keys(use);
    // ("" == use || use.needauth) && this.getUserInfo(function (e) { }, function (e, t) {
    //   var t = t ? 1 : 0,
    //     e = e || "";
    //   console.log(test)
    //   t && wx.redirectTo({
    //     url: "/pages/message/auth/index?close=" + t + "&text=" + e
    //   })
    // })
    // console.log(use)
    wx.getSystemInfo({
      success: function (t) {
        "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
      }
    });
    var t = this;
    wx.getSystemInfo({
      success: function (e) {
        wx.setStorageSync("systemInfo", e);
        var i = e.windowWidth, n = e.windowHeight;
        t.globalData.ww = i, t.globalData.hh = n;
      }
    }), this.getConfig(), this.getUserInfo(function (e) { }, function (e, t) {
      var t = t ? 1 : 0, e = e || "";
      t && wx.redirectTo({
        url: "/pages/message/auth/index?close=" + t + "&text=" + e
      });
    });
  },
  checkAuth: function () {
    var t = "/pages/message/auth/index";
    wx.getSetting({
      success: function (e) {
        e.authSetting["scope.userInfo"] || wx.redirectTo({
          url: t
        });
      }
    }), this.getCache("userinfo") || wx.redirectTo({
      url: t
    }), e.get("member", {}, function (e) {
      e.error && wx.redirectTo({
        url: t
      });
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
    return console.log(e), this.globalData.api = e.config.api, this.globalData.approot = e.config.approot,
      this.globalData.appid = e.config.appid, e.config;
  },
  getCache: function (e, t) {
    var i = +new Date() / 1e3, n = "";
    i = parseInt(i);
    try {
      (n = wx.getStorageSync(e + this.globalData.appid)).expire > i || 0 == n.expire ? n = n.value : (n = "",
        this.removeCache(e));
    } catch (e) {
      n = void 0 === t ? "" : t;
    }
    return n = n || "";
  },
  setCache: function (e, t, i) {
    var n = +new Date() / 1e3, o = !0, a = {
      expire: i ? n + parseInt(i) : 0,
      value: t
    };
    try {
      wx.setStorageSync(e + this.globalData.appid, a);
    } catch (e) {
      o = !1;
    }
    return o;
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
  getUserInfo: function (t, i) {
    var n = this, o = {};
    !(o = n.getCache("userinfo")) || o.needauth ? wx.login({
      success: function (a) {
        a.code ? e.post("wxapp/login", {
          code: a.code
        }, function (a) {
          a.error ? e.alert("获取用户登录态失败:" + a.message) : a.isclose && i && "function" == typeof i ? i(a.closetext, !0) : wx.getUserInfo({
            success: function (i) {
              o = i.userInfo, e.get("wxapp/auth", {
                data: i.encryptedData,
                iv: i.iv,
                sessionKey: a.session_key
              }, function (e) {
                1 == e.isblack && wx.showModal({
                  title: "无法访问",
                  content: "您在商城的黑名单中，无权访问！",
                  success: function (e) {
                    e.confirm && n.close(), e.cancel && n.close();
                  }
                }), i.userInfo.openid = e.openId, i.userInfo.id = e.id, i.userInfo.uniacid = e.uniacid,
                  i.needauth = 0, n.setCache("userinfo", i.userInfo), n.setCache("userinfo_openid", i.userInfo.openid),
                  n.setCache("userinfo_id", e.id), n.getSet(), t && "function" == typeof t && t(o);
              });
            },
            fail: function (i) {
              wx.redirectTo({
                // url: "/pages/message/auth/index"
              })
              // e.get("wxapp/check", {
              //     openid: a.openid
              // }, function(e) {
              //     1 == e.isblack && wx.showModal({
              //         title: "无法访问",
              //         content: "您在商城的黑名单中，无权访问！",
              //         success: function(e) {
              //             e.confirm && n.close(), e.cancel && n.close();
              //         }
              //     }), e.needauth = 1, n.setCache("userinfo", e, 7200), n.setCache("userinfo_openid", a.openid), 
              //     n.setCache("userinfo_id", a.id), n.getSet(), t && "function" == typeof t && t(o);
              // });
            }
          });
        }) : e.alert("获取用户登录态失败:" + a.errMsg);
      },
      fail: function (t) {
        e.alert("获取用户信息失败!");
      }
    }) : t && "function" == typeof t && t(o);
  },
  close: function () {
    this.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  getSet: function () {
    var t = this;
    t.getCache("cacheset"), setTimeout(function () {
      var i = t.getCache("cacheset");
      e.get("cacheset", {
        version: i.version
      }, function (e) {
        e.update && t.setCache("cacheset", e.data);
      });
    }, 10);
  },
  url: function (e) {
    e = e || {};
    var t = {}, i = "", n = "", o = this.getCache("usermid");
    i = e.mid || "", n = e.merchid || "", "" != o ? ("" != o.mid && void 0 !== o.mid || (t.mid = i,
      t.merchid = o.merchid), "" != o.merchid && void 0 !== o.merchid || (t.merchid = n,
        t.mid = o.mid)) : (t.mid = i, t.merchid = n), this.setCache("usermid", t, 7200);
  },
  impower: function (e, t, i) {
    wx.getSetting({
      success: function (n) {
        n.authSetting["scope." + e] || wx.showModal({
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
  globalDataClose: {
    flag: !1
  },
  globalData: {
    appid: "wx5710cbd540dce0ad",
    api: "https://ljhs.resfine.com/app/ewei_shopv2_api.php?i=1",
    approot: "https://ljhs.resfine.com/addons/ewei_shopv2/",
    userInfo: null
  }

});