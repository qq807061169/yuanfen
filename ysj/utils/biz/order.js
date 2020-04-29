var r = getApp(),
  e = r.requirejs("core");
module.exports = {
  url: function (r) {
    wx.redirectTo({
      url: r
    })
  },
  cancelArray: ["我不想预约了", "信息填写错误，重新预约", "其他原因"],
  order: ["确认要取消该预约吗?", "确认要删除该预约吗?", "确认要彻底删除该预约吗?", "确认要恢复该预约吗?", "请再次确认回收物品数量及金额，本操作不可撤销。", "确定您要取消申请?"],
  cancel: function (r, o, t) {
    var i = this,
      n = this.cancelArray[o];
    e.post("order/op/cancel", {
      id: r,
      remark: n
    },
      function (r) {
        0 == r.error && i.url(t)
      },
      !0)
  },
  delete: function (r, o, t, i) {
    var n = this;
    e.confirm(0 == o ? this.order[3] : this.order[o],
      function () {
        e.post("order/op/delete", {
          id: r,
          userdeleted: o
        },
          function (r) {
            if (0 == r.error) return void (void 0 !== i ? (i.setData({
              page: 1,
              list: []
            }), i.get_list()) : n.url(t));
            e.toast(r.message, "loading")
          },
          !0)
      })
  },
  finish: function (r, o) {
    var t = this;
    e.confirm(this.order[4],function () {
      e.post("order/op/finish", {id: r}, function (r) {
        wx.showModal({
          title: '提示',
          content: '您的环保金已到账',
          cancelText: '环保中心',
          confirmText: '查看明细',
          success: function (res) {
            if (res.confirm) {
              return void t.url('/pages/member/log/index');
              e.toast(r.message, "loading")
            } else if (res.cancel) {
              return void t.url(o);
              e.toast(r.message, "loading")
            }
          }
        })
          // if (0 == r.error) return void t.url(o);
          // e.toast(r.message, "loading")
      },!0)},function(){return ;})
  },
  refundcancel: function (r, o,url) {
    var t = this;
    e.confirm(this.order[5],
      function () {
        if (!url){
          url = "order/refund/cancel";
        }
        e.post(url, {
          id: r
        },
          function (r) {
            if (0 == r.error) return void ("function" == typeof o ? o() : t.url(o));
            e.toast(r.message, "loading")
          },
          !0)
      })
  },
  codeshow: function (r, o) {
    var t = e.data(o).orderid;
    e.post("verify/qrcode", {
      id: t
    },
      function (r) {
        0 == r.error ? $this.setData({
          code: !0,
          qrcode: r.url
        }) : e.alert(r.message)
      },
      !0)
  },
  codehidden: function (r) {
    r.setData({
      code: !1
    })
  }
}