var request = require('../../utils/request.js')
let app = getApp()
/**
 * 获取code方法
 */
var getLoginCode = function () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}
/**
 * 通过code获取openId
 */
var getOpenId = function (code) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'getOpenIdByCode',
      showLoading: false,
      data: {
        code: code
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != '') {
          resolve(data.data)
        }else {
          resolve('')
        }
      },
      fail: function () {
        resolve('')
      }
    })
  })
}
/**
 * 通过 openId 判断是否已经绑定过手机接口
 */
var isBind = function (openId) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'getWechatBindGuestInfo',
      showLoading: false,
      data: {
        openId: openId
      },
      success: function (data) {
        if (data.status.toString() == '1') {
          resolve(data.data)
        }else {
          reject('')
        }
      },
      fail: function () {
        reject('')
      }
    })
  })
}

/**
 * 根据手机号，获取短信验证码和语音验证码
 */
var getVerificationCode = function (phone, codeType) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'generateIdentifyCode',
      data: {
        phone: phone,
        codeType: codeType
      },
      success: function (data) {
        if (data.status.toString() == '1') {
          resolve(data.data)
        }else {
          resolve('')
        }
      },
      fail: function () {
        resolve('')
      }
    })
  })
}

/**
 * 提交登录信息
 */
var submit = function (phone, verificationCode) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'loginFromMobilePhone',
      data: {
        phone: phone,
        code: verificationCode
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != null) {
          resolve(data.data)
        }else {
          resolve('')
        }
      },
      fail: function () {
        resolve('')
      }
    })
  })
}

/**
 * 根据经纬度，获取地理位置信息
 */
var getLocation = function () {
  let defineGeography = {
    'cityId': 43,
    'cityName': '上海市',
    'districtId': 45,
    'townId': null,
    'cityPinyin': 'shanghaishi'
  }
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        request.fetch({
          mock: !true,
          module: 'index',
          action: 'findCityInfoByLonAndLat',
          data: {
            lon: longitude,
            lat: latitude
          },
          success: function (data) { // 获取城市信息成功
            if (data.status.toString() == '1' && data.data != null) {
              // 把成功后的地理位置信息写入本地
              wx.setStorage({
                key: 'geography',
                data: data.data
              })
              resolve(data.data)
            }else {
              wx.setStorage({
                key: 'geography',
                data: defineGeography
              })
              resolve(defineGeography)
            }
          },
          fail: function () {
            wx.setStorage({
              key: 'geography',
              data: defineGeography
            })
            resolve(defineGeography)
          }
        })
      }
    })
  })
}

Page({
  data: {
    phone: '',
    verificationCode: '',
    isShowSend: false,
    second: 60,
    tips: {
      show: false
    },
    returnUrl: '/pages/index/index',
    type:'redirect',
    isShowAgreement: false
  },
  // 获取手机号
  getPhone(event) {
    this.setData({
      phone: event.detail.value
    })
  },
  // 手机号获取验证码
  phoneGetCode(event) {
    let _this = this
    let phone = _this.data.phone
    let codeType = event.target.dataset.codetype
    if (phone == '') {
      app.showTips('请输手机号码')
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      app.showTips('输入正确的手机号码')
      return false
    }
    // 显示重新发送
    this.setData({
      isShowSend: true,
      second: 60
    })
    let s = this.data.second
    let t = setInterval(() => {
      --s
      if (s == 0) {
        _this.setData({
          isShowSend: false
        })
        clearInterval(t)
      }
      _this.setData({
        second: s
      })
    }, 1000)
    // 获取验证码
    getVerificationCode(phone, codeType).then((data) => {
      if (data == '') { // 获取验证码失败
        app.showTips('获取验证码失败,请重新获取')
      }else {
        app.showTips('获取验证码成功')
      }
    })
  },
  // 语音获取验证码
  voiceGetCode(event) {
    let phone = this.data.phone
    let codeType = event.target.dataset.codetype
    if (phone == '') {
      app.showTips('请输手机号码')
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      app.showTips('输入正确的手机号码')
      return false
    }
    // 获取验证码
    getVerificationCode(phone, codeType).then((data) => {
      console.log(data)
    })
  },
  // 获取用户输入的验证码
  getVerificationCode(event) {
    this.setData({
      verificationCode: event.detail.value
    })
  },
  // 点击确定提交手机号，和验证码
  submit(event) {
    let _this = this
    let phone = _this.data.phone
    let verificationCode = _this.data.verificationCode
    // 校验手机号
    if (phone == '') {
      app.showTips('请输手机号码')
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      app.showTips('输入正确的手机号码')
      return false
    }

    // 校验验证码
    if (verificationCode == '') {
      app.showTips('验证码不得为空')
      return false
    }
    if (isNaN(verificationCode)) { // || (verificationCode+'').length != 6
      app.showTips('验证码为数字')
      return false
    }
    // console.log("手机号"+_this.data.phone)
    // console.log("验证码"+_this.data.verificationCode); 
    // 提交
    submit(phone, verificationCode).then((data) => {
      if (data != '') {
        app.showTips('登录成功')
        console.log('提交成功')
        console.log(data)
        // 把最终的用户信息，写如到本地
        wx.setStorage({
          key: 'userInfo',
          data: data
        })
        _this.goUrl();
      }else {
        app.showTips('登录失败，重新登录')
        console.log('登录失败，重新登录')
        console.log(data)
      }
    })
  },
  goUrl(){
    let _this = this;
    // 返回到登录前的url
    if (_this.data.type == 'redirect') {
      wx.redirectTo({
        url: _this.data.returnUrl
      })
    }else {
      wx.navigateBack({
        url: _this.data.returnUrl
      })
    }
  },
  // 写已授权逻辑
  yesAuthorized() {
    let _this = this
    // 获取code
    getLoginCode().then((code) => {
      console.log('code:' + code)
      // 根据code，获取openId
      getOpenId(code).then((openId) => {
        console.log(openId)
        // 根据openId，判断是否已经绑定过手机
        isBind(openId).then((data) => {
          console.log(data)
          if (data == null) { // 没有绑定手机号
            // 正常登录（即验证手机号码）
            console.log('已授权，没有绑定过手机号码，走正常登录逻辑（即验证手机号码）')
          }else { // 返回对象，已经绑定手机号。登录结束
            // 把最终的用户信息，写如到本地
            wx.setStorage({
              key: 'userInfo',
              data: data
            })
            _this.goUrl();
          }
        })
      })
    })
  },
  // 写未授权逻辑
  notAuthorized() {
    let _this = this
    // 提示授权
    wx.showModal({
      title: '授权提示',
      content: '检测到您没有打开悟空找房的用户信息权限，是否去设置打开？',
      success: function (res) {
        // 去设置授权
        if (res.confirm) {
          console.log('用户点击确定')
          // 打开设置页面
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) { // 用户勾选了获取“用户信息”选项
                // 获取用户授权信息
                wx.login({
                  success: function () {
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                        console.log('获取到用户信息，在调用已授权逻辑，进行一系列处理')
                        // 把用户授权信息写入到本地
                        wx.setStorage({
                          key: 'userAuthorizedInfo',
                          data: res
                        })
                        // 在调用用户授权逻辑
                        _this.yesAuthorized()
                      },
                      fail: function () {
                        console.log('获取到用户信息失败，只能输入手机号和验证码进行登录')
                      }
                    })
                  }
                })
              }else { // 用户没勾选了获取“用户信息”选项，走正常登录
                console.log('用户没勾选获取“用户信息”选项，只能输入手机号和验证码进行登录')
              }

              if (res.authSetting['scope.userLocation']) { // 用户勾选了获取“地理位置”选项
                getLocation()
              }else { // 用户没勾选了获取“地理位置”选项，走正常登录

              }
            }
          })
        }else { // 用户点击取消，就需要自己输入手机号，验证码，走正常登录逻辑
          console.log('用户点击取消打开设置，什么都获取不到，只能输入手机号和验证码进行登录')
        }
      }
    })
  },
  showAgreement() {
    let _this = this
    _this.setData({
      isShowAgreement: true
    })
  },
  hideAgreement() {
    let _this = this
    _this.setData({
      isShowAgreement: false
    })
  },
  onLoad(options) {
    let _this = this
    if (options.returnUrl != null && options.returnUrl != '') {
      let returnUrl = decodeURIComponent(options.returnUrl)
      _this.setData({
        returnUrl: returnUrl,
        type: options.type
      })
    }

    // 1.页面初始化，读取Storage,获取用户登录信息，判断微信用户是否为空
    wx.getStorage({
      key: 'userAuthorizedInfo',
      success: function (res) { // 已授权
        console.log('已授权')
        _this.yesAuthorized()
      },
      fail: function () { // 未授权
        console.log('未授权，没有获取到userAuthorizedInfo信息')
        _this.notAuthorized()
      }
    })
  }
})
