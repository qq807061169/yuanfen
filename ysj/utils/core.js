var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
  function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  },
  e = require("jquery");
var md5 = require("md5");
module.exports = {
  toQueryPair: function (t, e) {
    return void 0 === e ? t : t + "=" + encodeURIComponent(null === e ? "" : String(e))
  },
  getImageUrl: function (imageurl) {
    var ts = parseInt((+new Date) / 1000);
    var apikey = md5.hexMD5(getApp().globalData.apikey + '|' + ts);
    var ApiSecret = getApp().globalData.ApiSecret;
    var url = '';
    if (imageurl) {
      url = imageurl;
      if (url.indexOf('wx.qlogo') != -1) {
        return url;
      }
    } else {
      return '/static/images/nostore.png';
    }
    var a = getApp().globalData.fileapi + "?ts=" + ts + "&key=" + apikey + "&apisecret=" + ApiSecret + '&filevalue=' + url;
    return a;
  },
  getUrl: function (n, o, i) {
    var a = getApp().globalData.api + "/" + n;
    return o && ("object" == (void 0 === o ? "undefined" : t(o)) ? a += "&" + e.param(o) : "string" == typeof o && (a += "&" + o)),
      a
  },
  json: function (t, n, o, i, a, c) {
    var d = this;
    var r = getApp(),
      s = r.getCache("userinfo"),
      u = r.getCache("usermid"),
      f = r.getCache("authkey");
    var arr = Object.keys(s);
    if (!s || s == '' || arr.length == 0 || s == null || s == undefined || s.length == 0) {
      r.getUserInfo(function (res) {
        d.json(t, n, o, i, a, c);
      });
      return;
    }
    n = n || {},
      n.comefrom = "wxapp",
      s && (n.openid =  s.openid, "cacheset" != t && r.getSet()),
      u && (n.mid = u.mid, n.merchid = u.merchid);
    
    i && d.loading(),
      n && (n.authkey = f || "");
    n.ts = (+new Date) / 1000;
    n.user_id = s.id;
    n.apikey = md5.hexMD5(getApp().globalData.apikey + '|' + n.ts);
    n.ApiSecret = getApp().globalData.ApiSecret;
    var p = a ? this.getUrl(t) : this.getUrl(t, n),
      l = {
        url: p,
        method: a ? "POST" : "GET",
        header: {
          "Content-type": a ? "application/x-www-form-urlencoded" : "application/json",
          Cookie: "PHPSESSID=" + s.openid
        }
      };
    c || delete l.header.Cookie,
      a && (l.data = e.param(n)),
      o && (l.success = function (t) {
        i && d.hideLoading(),
          "request:ok" == t.errMsg && "function" == typeof o && (r.setCache("authkey", t.data.authkey || ""), o(t.data))
      }),
      o && (l.fail = function (res) {
        console.log("网络请求失败~")
       d.toast('网络请求失败', 'none')
      }),

      wx.request(l)
  },
  loginjson: function (t, n, o, i, a, c) {
    var d = this;
    var r = getApp(),
      s = r.getCache("userinfo"),
      u = r.getCache("usermid"),
      f = r.getCache("authkey");
    n = n || {},
      n.comefrom = "wxapp",
      s && (n.openid = s.openid, "cacheset" != t && r.getSet()),
      u && (n.mid = u.mid, n.merchid = u.merchid);

    i && d.loading(),
      n && (n.authkey = f || "");
    n.ts = (+new Date) / 1000;
    n.user_id = s.id;
    n.apikey = md5.hexMD5(getApp().globalData.apikey + '|' + n.ts);
    n.ApiSecret = getApp().globalData.ApiSecret;
    var p = a ? this.getUrl(t) : this.getUrl(t, n),
      l = {
        url: p,
        method: a ? "POST" : "GET",
        header: {
          "Content-type": a ? "application/x-www-form-urlencoded" : "application/json",
          Cookie: "PHPSESSID=" + s.openid
        }
      };
    c || delete l.header.Cookie,
      a && (l.data = e.param(n)),
      o && (l.success = function (t) {
        i && d.hideLoading(),
          "request:ok" == t.errMsg && "function" == typeof o && (r.setCache("authkey", t.data.authkey || ""), o(t.data))
      }),
      o && (l.fail = function (res) {
        console.log("网络请求失败~")
        console.log(res)
      d.toast('网络请求失败','none')
      }),
      wx.request(l)
  },
  post: function (t, e, n, o, i) {
    if (t =='Apiservice/login'){
      this.loginjson(t, e, n, o, !0, i)
    }else{
      this.json(t, e, n, o, !0, i)
    }
  },
  get: function (t, e, n, o, i) {
    this.json(t, e, n, o, !1, i)
  },
  getDistanceByLnglat: function (t, e, n, o) {
    function i(t) {
      return t * Math.PI / 180
    }
    var a = i(e),
      c = i(o),
      r = a - c,
      s = i(t) - i(n),
      u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(r / 2), 2) + Math.cos(a) * Math.cos(c) * Math.pow(Math.sin(s / 2), 2)));
    return u *= 6378137,
      u = Math.round(1e4 * u) / 1e7
  },
  alert: function (e, n) {
    "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)),
      wx.showModal({
        title: "提示",
        content: e,
        showCancel: !1,
        success: function (t) {
          t.confirm && "function" == typeof confirm && n()
        }
      })
  },
  confirm: function (e, n, o) {
    "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)),
      wx.showModal({
        title: "提示",
        content: e,
        showCancel: !0,
        success: function (t) {
          t.confirm ? "function" == typeof n && n() : "function" == typeof o && o()
        }
      })
  },
  loading: function (t) {
    void 0 !== t && "" != t || (t = "加载中"),
      wx.showToast({
        title: t,
        icon: "loading",
        duration: 5e6
      })
  },
  hideLoading: function () {
    wx.hideToast()
  },
  toast: function (t, e) {
    e || (e = "success"),
      wx.showToast({
        title: t,
        icon: e,
        duration: 1e3
      })
  },
  success: function (t) {
    wx.showToast({
      title: t,
      icon: "success",
      duration: 1e3
    })
  },
  upload: function (t) {
    var e = this;
    wx.chooseImage({
      success: function (n) {
        e.loading("正在上传...");
        var o = e.getUrl("FileApi/UploadFile"),
          i = n.tempFilePaths,
          j = {};

        j.ts = (+new Date) / 1000;
        j.apikey = md5.hexMD5(getApp().globalData.apikey + '|' + j.ts);
        j.ApiSecret = getApp().globalData.ApiSecret;
        wx.uploadFile({
          url: o,
          filePath: i[0],
          name: "filedata",
          formData: {
            'ts': j.ts,
            'apikey': j.apikey,
            'ApiSecret': j.ApiSecret
          },
          success: function (n) {
            e.hideLoading();
            var o = JSON.parse(n.data);
            // if (0 != o.error) e.alert("上传失败");
            // else if ("function" == typeof t) {
            //   var i = o.files[0];
            //   t(i)
            // }
            if ('Success' != o.flag) e.alert("上传失败");
            else if ("function" == typeof t) {
              var i = o.msg;
              t(i)
            }
          }
        })
      }
    })
  },
  pdata: function (t) {
    return t.currentTarget.dataset
  },
  data: function (t) {
    return t.target.dataset
  },
  phone: function (t) {
    var e = this.pdata(t).phone;
    wx.makePhoneCall({
      phoneNumber: e
    })
  },
  pay: function (e, n, o) {
    return "object" == (void 0 === e ? "undefined" : t(e)) && ("function" == typeof n && (e.success = n, "function" == typeof o && (e.fail = o), void wx.requestPayment(e)))
  },
  cartcount: function (t) {
    this.get("member/cart/count", {},
      function (e) {
        t.setData({
          cartcount: e.cartcount
        })
      })
  },
  onShareAppMessage: function (t) {
    var e = getApp(),
      n = e.getCache("sysset"),
      o = n.share || {},
      i = e.getCache("userinfo"),
      a = "",
      c = n.shopname || "",
      r = n.description || "";
    return o.title && (c = o.title),
      o.desc && (r = o.desc),
      i && (a = i.id),
      t = t || "/pages/index/index",
      t = -1 != t.indexOf("?") ? t + "&" : t + "?",
      {
        title: c,
        desc: r,
        path: t + "mid=" + a
      }
  },
  getWapByInfo: function (options, id) {
    if (id != 0 && options.currentTarget.dataset.type) {
      var th = this,
        u = options.currentTarget.dataset.url,
        t = options.currentTarget.dataset.type,
        i = options.currentTarget.dataset.id ? options.currentTarget.dataset.id : id,
        ti = options.currentTarget.dataset.title,
        f = options.currentTarget.dataset.flag;
      wx.navigateTo({
        url: th.getApiUrl(u, t, i, ti, f)
      })
    } else if (options.target.dataset.coordinate) {
      wx.navigateTo({
        url: '/pages/web/index?url=' + getApp().globalData.wapApi + options.currentTarget.dataset.url + '&time=' + (Date.parse(new Date())) / 1000 + '&title=' + options.currentTarget.dataset.title + '&longitude=' + options.currentTarget.dataset.longitude + '&latitude=' + options.currentTarget.dataset.latitude
      })
    } else {
      wx.navigateTo({
        url: '/pages/web/index?url=' + getApp().globalData.wapApi + options.currentTarget.dataset.url + '&time=' + (Date.parse(new Date())) / 1000 + '&title=' + options.currentTarget.dataset.title
      })
    }
  },
  getApiUrl: function (u, t, i, ti, f) {
    var a = '';
    if (f == undefined) a = '/pages/web/index?url=' + getApp().globalData.wapApi + u;
    else if (f != undefined) a = '/pages/web/index?url=' + getApp().globalData.wapApinot + u;
    return a + '&' + t + '=' + i + '&time=' + (Date.parse(new Date())) / 1000 + '&title=' + ti;
  },
}