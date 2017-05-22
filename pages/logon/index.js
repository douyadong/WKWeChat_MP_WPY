var request = require('../../utils/request.js')
let app = getApp()
/**
 * 根据经纬度获取地理定位
 */
var getGeography = function() {
    let defineGeography = {
        "cityId": 43,
        "cityName": "上海市",
        "districtId": 45,
        "townId": null,
        "cityPinyin":"shanghaishi"
    }
    return new Promise(function (resolve, reject) {  
      //地理定位
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {//地理定位成功，获取经纬度
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          //根据精度纬度，获取当前所在的城市信息
          request.fetch({
              mock:!true,
              module:'index',
              action:'findCityInfoByLonAndLat',
              data:{
                lon:longitude,
                lat:latitude
              },
              success:function(data){//获取城市信息成功
                if(data.status.toString() == '1' && data.data != null){
                    wx.setStorage({
                      key:"location",
                      data:data.data
                    });
                    resolve(data.data);
                }else{
                    resolve(defineGeography);
                }
              },
              fail:function() {//获取城市信息失败
                  resolve(defineGeography);
              }
          });
        },
        fail:function() {//用户取消地理定位
            resolve(defineGeography);
        }
      })
  })
}
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
          wx.setStorageSync('openid',data.data);
          resolve(data.data)
        }else {
          //resolve('')
          console.log("openId获取失败");
        }
      },
      fail: function () {
        //resolve('')
        console.log("openId获取失败");
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
      showLoading: false,
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
        code: verificationCode,
        openId:wx.getStorageSync('openid')
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != null) {
          //把登录完成绑定的用户信息存储下来
          wx.setStorageSync('userInfo',data.data);
          resolve(data.data)
        }else {
          reject(data.message)
        }
      },
      fail: function () {
        reject('网络异常')
      }
    })
  })
}
/**
 * 添加微信用户到公司数据库
 */
var addOpenUser = function (openid,avatarUrl,city,country,gender,language,nickName,province) {
    return new Promise(function (resolve, reject) {
        request.fetch({
            mock:!true,
            module:'logon',
            action:'addWeixinUser',
            //method:'POST',
            data:{
                openId:openid,
                avatarUrl:avatarUrl,
                city:city,
                country:country,
                gender:gender,
                language:language,
                nickName:nickName,
                province:province
            },
            success:function(data){
                if(data.status.toString() == "1" && data.data != null){
                     console.log("添加微信用户到公司数据库 成功");
                     resolve(data.data);
                }else{
                    console.log("添加微信用户到公司数据库 失败");
                }
            },
            fail:function () {
                console.log("添加微信用户到公司数据库 失败");
            }
        });
    })
}
/**
 * 通过 openid 判断是否已经绑定过手机接口
 */
var isBind = function (openid) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'getWechatBindGuestInfo',
      showLoading: false,
      data: {
        openId: openid
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != null && data.data != "") {
          console.log("通过 openid 判断是否已经绑定过手机接口 ------已绑定，保存用户绑定信息到本地，userInfo 有值");
          wx.setStorageSync('userInfo',data.data);
          resolve(data.data)
        }else {
          console.log("通过 openid 判断是否已经绑定过手机接口 -----  没绑定");
        }
      },
      fail: function () {
        console.log("通过 openid 判断是否已经绑定过手机接口 失败");
      }
    })
  })
}
/**
 * 获取用户授权信息
 */
var getUserAuthorizedInfo = function() {
    return new Promise(function (resolve, reject) {
      /*
        wx.showModal({
          title: '提示',
          content: '是否同意授权',
          success: function(res) {
            if (res.confirm) {
                wx.openSetting({
                    success: (res) => {
                      //是否勾选过授权
                      if(res.authSetting["scope.userInfo"]){
                          wx.getUserInfo({
                              withCredentials: true,
                              success: function (res) {
                                  // 把用户授权信息写入到本地
                                  wx.setStorageSync('userAuthorizedInfo',res);
                                  resolve(res);
                              },
                              fail: function () {
                                  console.log("获取用户授权信息失败");
                              }
                          })
                      }else{
                          console.log("用户没有勾选授权，获取不到授权信息");
                      }

                      //是否勾选过地理位置
                      if(res.authSetting["scope.userLocation"]){
                          //根据经纬度，获取地理位置
                          getGeography();
                      }else{
                        console.log("用户没有勾选地理位置，获取不到地理位置信息");
                      }
                    }
                  }) 
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        }) 
        */
        wx.openSetting({
            success: (res) => {
              //是否勾选过授权
              if(res.authSetting["scope.userInfo"]){
                  wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                          // 把用户授权信息写入到本地
                          wx.setStorageSync('userAuthorizedInfo',res);
                          resolve(res);
                      },
                      fail: function () {
                          console.log("获取用户授权信息失败");
                      }
                  })
              }else{
                  console.log("用户没有勾选授权，获取不到授权信息");
              }

              //是否勾选过地理位置
              if(res.authSetting["scope.userLocation"]){
                  //根据经纬度，获取地理位置
                  getGeography();
              }else{
                console.log("用户没有勾选地理位置，获取不到地理位置信息");
              }
            }
        })
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    isShowAgreement: false,
    isFocus:false
  },
  //获取焦点事件
  bindfocus(event){
    this.setData({
      isFocus:true
    });
  },
  // 获取手机号
  getPhone(event) {
    let _this = this; 
    _this.setData({
      phone: event.detail.value
    })
    if(event.detail.value.toString().length == 11){
      _this.setData({
        isFocus:false
      });
    }
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
      app.showTips('请输入正确的手机号码')
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
        //app.showTips('获取验证码成功')
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
      app.showTips('请输入正确的手机号码')
      return false
    }
    app.showTips('语音验证码拨打中，请注意接收来电');
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
      app.showTips('请输入正确的手机号码')
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

    // 提交
    submit(phone, verificationCode).then((data) => {
      var userAuthorizedInfo = wx.getStorageSync('userAuthorizedInfo');
      var openid = wx.getStorageSync('openid');
      if(userAuthorizedInfo != ''){
          addOpenUser(openid, userAuthorizedInfo.userInfo.avatarUrl, userAuthorizedInfo.userInfo.city, userAuthorizedInfo.userInfo.country, userAuthorizedInfo.userInfo.gender, userAuthorizedInfo.userInfo.language, userAuthorizedInfo.userInfo.nickName, userAuthorizedInfo.userInfo.province).then(()=>{
                             console.log("3");
                           });
      }
      _this.toPage();
    },(msg)=>{
        app.showTips(msg);
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
      let type=options.type 
      _this.setData({
        returnUrl: returnUrl,
        type: type
      })
    }else{
      _this.setData({
        type:"navigateBack"
      });
    }

   let userInfo = wx.getStorageSync('userInfo');
   if(userInfo == ''){
      //判断是否授权
      var userAuthorizedInfo = wx.getStorageSync('userAuthorizedInfo');
      if(userAuthorizedInfo == ''){//没有授权过
          console.log("没有授权过，调授权接口");
          wx.showModal({
            title: '提示',
            content: '是否同意授权',
            success: function(res) {
                if (res.confirm) {
                    getUserAuthorizedInfo().then((userAuthorizedInfo)=>{
                        //获取code，调用添加微信用户接口
                        getLoginCode().then((code)=>{
                          console.log("code:"+code);
                          //根据code，获取openid
                          getOpenId(code).then((openid)=>{
                              console.log("1----------");
                              if(openid != ''){
                                    //添加微信用户到本地
                                    console.log("2---------------"+openid);
                                    addOpenUser(openid, userAuthorizedInfo.userInfo.avatarUrl, userAuthorizedInfo.userInfo.city, userAuthorizedInfo.userInfo.country, userAuthorizedInfo.userInfo.gender, userAuthorizedInfo.userInfo.language, userAuthorizedInfo.userInfo.nickName, userAuthorizedInfo.userInfo.province).then(()=>{
                                      console.log("3");
                                    });
                                    isBind(openid).then(()=>{
                                          _this.toPage();
                                    });
                              }
                          });
                        });
                    });
                }
            }
          })
      }else{//授权过
          console.log("授权过");
      }
   }else{
     _this.toPage();
   }
  },
  toPage(){
      let _this = this;
      console.log("跳页面");
      // 返回到登录前的url
      if (_this.data.type == 'redirect') {
        wx.redirectTo({
          url: _this.data.returnUrl
        })
      }else {
        wx.navigateBack()
      }
  }
})
