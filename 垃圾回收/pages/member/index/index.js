var e = getApp(), a = e.requirejs("core"), t = e.requirejs("wxParse/wxParse"), i = e.requirejs("biz/diypage"), r = e.requirejs("jquery");

Page({
    data: {
        route: "member",
        icons: e.requirejs("icons"),
        member: {},
        diypages: {},
        audios: {},
        audiosObj: {},
        modelShow: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        swiperheight: 0,
        iscycelbuy: !1,
        bargain: !1
    },
    onLoad: function(a) {
        e.checkAuth();
        var t = this;
        e.url(a), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowWidth / 1.7;
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: a
                });
            }
        }), i.get(this, "member", function(e) {});
    },
    getInfo: function() {
        var e = this;
        a.get("member", {}, function(a) {
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: a,
                show: !0,
                customer: a.customer,
                customercolor: a.customercolor,
                phone: a.phone,
                phonecolor: a.phonecolor,
                phonenumber: a.phonenumber,
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    onShow: function() {
        this.getInfo();
        var a = this;
        a.setData({
            imgUrl: e.globalData.approot
        }), wx.getSetting({
            success: function(e) {
                var t = e.authSetting["scope.userInfo"];
                a.setData({
                    limits: t
                }), t || wx.redirectTo({
                    url: "/pages/message/auth/index"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage();
    },
    cancelclick: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        wx.openSetting({
            success: function(e) {}
        });
    },
    phone: function() {
        var e = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    play: function(e) {
        var a = e.target.dataset.id, t = this.data.audiosObj[a] || !1;
        if (!t) {
            t = wx.createInnerAudioContext("audio_" + a);
            var i = this.data.audiosObj;
            i[a] = t, this.setData({
                audiosObj: i
            });
        }
        var r = this;
        t.onPlay(function() {
            var e = setInterval(function() {
                var i = t.currentTime / t.duration * 100 + "%", s = Math.floor(Math.ceil(t.currentTime) / 60), n = (Math.ceil(t.currentTime) % 60 / 100).toFixed(2).slice(-2), o = Math.ceil(t.currentTime);
                s < 10 && (s = "0" + s);
                var u = s + ":" + n, c = r.data.audios;
                c[a].audiowidth = i, c[a].Time = e, c[a].audiotime = u, c[a].seconds = o, r.setData({
                    audios: c
                });
            }, 1e3);
        });
        var s = e.currentTarget.dataset.audio, n = e.currentTarget.dataset.time, o = e.currentTarget.dataset.pausestop, u = e.currentTarget.dataset.loopplay;
        0 == u && t.onEnded(function(e) {
            c[a].status = !1, r.setData({
                audios: c
            });
        });
        var c = r.data.audios;
        c[a] || (c[a] = {}), t.paused && 0 == n ? (t.src = s, t.play(), 1 == u && (t.loop = !0), 
        c[a].status = !0, r.pauseOther(a)) : t.paused && n > 0 ? (t.play(), 0 == o ? t.seek(n) : t.seek(0), 
        c[a].status = !0, r.pauseOther(a)) : (t.pause(), c[a].status = !1), r.setData({
            audios: c
        });
    },
    pauseOther: function(e) {
        var a = this;
        r.each(this.data.audiosObj, function(t, i) {
            if (t != e) {
                i.pause();
                var r = a.data.audios;
                r[t] && (r[t].status = !1, a.setData({
                    audios: r
                }));
            }
        });
    },
    onHide: function() {
        this.pauseOther();
    },
    onUnload: function() {
        this.pauseOther();
    },
    navigate: function(e) {
        var a = e.currentTarget.dataset.url, t = e.currentTarget.dataset.phone, i = e.currentTarget.dataset.appid, r = e.currentTarget.dataset.appurl;
        a && wx.navigateTo({
            url: a,
            fail: function() {
                wx.switchTab({
                    url: a
                });
            }
        }), t && wx.makePhoneCall({
            phoneNumber: t
        }), i && wx.navigateToMiniProgram({
            appId: i,
            path: r
        });
    },
    close: function() {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});