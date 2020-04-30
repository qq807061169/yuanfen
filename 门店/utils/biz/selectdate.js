module.exports = {
    doDay: function(t, e) {
        var a = e.data.currentObj, r = a.getFullYear(), d = a.getMonth() + 1, n = a.getDate(), c = "";
        c = "left" == t.currentTarget.dataset.key ? (d -= 1) <= 0 ? r - 1 + "/12/" + n : r + "/" + d + "/" + n : (d += 1) <= 12 ? r + "/" + d + "/" + n : r + 1 + "/1/" + n, 
        a = new Date(c);
        e.setData({
            currentDate: a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日" + [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][a.getDay()],
            currentObj: a,
            currentYear: a.getFullYear(),
            currentMonth: a.getMonth() + 1
        }), this.setSchedule(e);
    },
    getCurrentDayString: function(t, e) {
        var a = t.data.currentObj;
        if ("" != a) return a;
        var r = e.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3");
        return new Date(r);
    },
    setSchedule: function(t) {
        var e = t.data.currentObj.getMonth() + 1, a = t.data.currentObj.getFullYear(), r = t.data.currentObj.getDate(), d = (t.data.currentObj.getDate(), 
        new Date(a, e, 0).getDate()), n = t.data.currentObj.getUTCDay() + 1 - (r % 7 - 1), c = n <= 0 ? 7 + n : n, u = [], i = 0, s = {};
        s.y = a, s.m = e, e < 10 && (s.m = "0" + e);
        var o = [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ];
        if (1 == t.data.isdelay) {
            var g, D = (g = t.data.cycelbuy_periodic.split(","))[0] * [ 1, 7, 30 ][g[1]], l = t.data.period_index;
            0 == l && (l = 1);
            var y = g[2] - l + 1;
        }
        for (var h = t.data.maxday, f = t.data.initDate, p = t.data.checkedDate, v = 0; v < 42; v++) {
            var k = v % 7;
            if (v < c - 1) u[v] = {
                id: "",
                week: "",
                no_optional: !0,
                checked: !1
            }; else if (i < d) {
                if (s.d = i + 1, i < 9) {
                    var b = i + 1;
                    s.d = "0" + b;
                }
                var M = !1, Y = !1, j = Date.parse(s.y + "/" + s.m + "/" + s.d);
                j < f && (M = !0), 1 == t.data.isdelay && (j - p) % (864e5 * D) == 0 && j < p + y * D * 864e5 && j > p && (Y = !0), 
                j > f + 864e5 * (h - 1) && (M = !0), j == p && (M = !1, Y = !0), u[v] = {
                    id: i + 1,
                    week: o[k],
                    no_optional: M,
                    checked: Y
                }, i = u[v].id;
            } else i >= d && (u[v] = {
                id: "",
                week: "",
                no_optional: !0,
                checked: !1
            });
        }
        t.setData({
            currentDayList: u
        });
    },
    selectDay: function(t, e) {
        if (t.target.dataset.day) {
            if (e.data.create) var a = e.data.currentYear + "." + e.data.currentMonth + "." + t.target.dataset.day + " " + t.target.dataset.week; else a = e.data.currentYear + "年" + e.data.currentMonth + "月" + t.target.dataset.day + "日 " + t.target.dataset.week;
            e.setData({
                currentDay: t.target.dataset.day,
                currentDa: t.target.dataset.day,
                currentDate: a,
                checkedDate: Date.parse(e.data.currentYear + "/" + e.data.currentMonth + "/" + t.target.dataset.day),
                receipttime: Date.parse(e.data.currentYear + "/" + e.data.currentMonth + "/" + t.target.dataset.day) / 1e3
            });
        }
    }
};