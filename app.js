// app.js
wx.showLLL = function () {
  console.log('wx.showLLLL')
}

App({
  onLaunch: function () {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    }else {
      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            withCredentials:true,
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(res);
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  timer: null,
  isLogin: function (needRedirect = true) { // 判断是否登录了小程序
    var userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // 当前页的地址
      var returnUrl = this.getCurrentPage().__route__
      if (!needRedirect) {return false;}
      wx.navigateTo({
        url: '/pages/logon/index?returnUrl='+returnUrl
      })
    }

    return true
  },
  showLoading: function (title = '加载中...') {
    this.getCurrentPage().setData({'loading': {'show': true,title: title}})
  },
  hideLoading: function (cb) {
    this.getCurrentPage().setData({'loading': {'show': false}})
    typeof cb == 'function' && cb()
  },
  showTips: function (obj) {
    let that = this
    let text,duration = 2000,cb

    if (typeof obj === 'object') {
      ({text, duration=2000, cb} = obj)
    }else {
      text = obj
    }

    this.getCurrentPage().setData({'tips': {'show': true,text: text}})
    clearTimeout(this.timer)
    this.timer = setTimeout(function () {
      that.getCurrentPage().setData({'tips': {'show': false}})
      typeof cb == 'function' && cb()
    }, duration)
  }
})
