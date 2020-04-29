//作者QQ:1026770372
function t(t) {
  var n = t.getFullYear(),
    o = t.getMonth() + 1,
    r = t.getDate(),
    u = t.getHours(),
    i = t.getMinutes(),
    g = t.getSeconds();
  return [o, r].map(e).join("月") + "日" + [u, i].map(e).join(":")
} function e(t) { return t = t.toString(), t[1] ? t : "0" + t } 

/**
 * 单个倒计时
 * content:上下文内容
 * start：开始时间 Date.parse(new Date()) / 1000
 * end:结束时间
 */
function countDown(content, start, end) {
  end = end - start;
  var interval = setInterval(function () {
    // 秒数  
    var second = end;
    // 天数位  
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;

    // 小时位  
    var hr = Math.floor((second - day * 3600 * 24) / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位  
    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位  
    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    content.setData({
      day: dayStr,
      hour: hrStr,
      minute: minStr,
      second: secStr,
    });
    end--;
    if (end < 0) {
      clearInterval(interval);
      // wx.showToast({
      //   title: '活动已结束',
      // });
      content.setData({
        day: '00',
        hour: '00',
        minute: '00',
        decond: '00',
      });
    }
  }.bind(content), 1000);

}

module.exports = {
  formatTime: t,
  countDown: countDown
}
