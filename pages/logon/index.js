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
        if (data.status.toString() == '1' && data.data != null && data.data != "") {
          console.log("通过 openId 判断是否已经绑定过手机接口 ------已绑定，保存用户绑定信息到本地");
          wx.setStorageSync('userBindInfo',data.data);
          wx.setStorageSync('userInfo',data.data);
          resolve(data.data)
        }else {
          console.log("通过 openId 判断是否已经绑定过手机接口 -----  没绑定，需要手动登录");
        }
      },
      fail: function () {
        console.log("通过 openId 判断是否已经绑定过手机接口 失败");
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
var submit = function (phone, verificationCode,openid,unionId) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'loginFromMobilePhone',
      data: {
        phone: phone,
        code: verificationCode,
        openId:openid,
        unionId:unionId
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != null) {
          //把登录完成绑定的用户信息存储下来
          wx.setStorageSync('userBindInfo',data);
          wx.setStorageSync('userInfo',data.data);
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
 * 添加微信用户到公司数据库
 * 返回openid
 */
var addOpenUser = function (encryptedData,iv,code) {
    console.log("添加微信用户到公司数据库");
    return new Promise(function (resolve, reject) {
        let openid = wx.getStorageSync('openid');
        if(openid != ''){
            resolve(openid);
            return
        }
        request.fetch({
            mock:!true,
            module:'logon',
            action:'addOpenUser',
            data:{
                encryptedData:encryptedData,
                iv:iv,
                code:code
            },
            success:function(data){
                if(data.status.toString() == "1" && data.data != null && data.data.openid != null && data.data.openid != ""){
                     console.log("添加用户信息成功,返回openid成功");
                     wx.setStorageSync('openid',data.data.openid);
                     wx.setStorageSync('unionId',data.data.unionId);
                     resolve(data.data.openid);
                }else{
                    console.log("添加用户信息失败，获取openid失败");
                }
            },
            fail:function () {
                console.log("添加用户信息失败，获取openid失败");
            }
        });
    })
}
/**
 * 获取用户授权信息
 */
var getUserAuthorizedInfo = function() {
    return new Promise(function (resolve, reject) {
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
    submit(phone, verificationCode,wx.getStorageSync('openid'),wx.getStorageSync('unionId')).then((data) => {
        toPage();
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

    //本地读取openid是否存在
    var openid = wx.getStorageSync('openid')
    if(openid == ''){//不存在
        console.log("openid不存在，调用授权");
        wx.openSetting({
          success: (res) => {
            if(res.authSetting['scope.userInfo']){//用户同意授权
                //调用授权
                getUserAuthorizedInfo().then((data)=>{
                  //获取code
                  getLoginCode().then((code)=>{
                      //调用添加用户信息，获取openid
                      addOpenUser(data.encryptedData,data.iv,code).then((openid)=>{
                          //根据openid绑定关心，返回用户绑定信息
                          isBind(openid).then((data)=>{//返回用户绑定信息
                            console.log("userBindInfo:"+userBindInfo );
                            toPage();
                          });
                      });
                  })
                });
            }else{//用户不同意授权
                console.log("用户拒绝授权，只能输入手机号码+验证码，手动登录");
            }

            if(res.authSetting['scope.userLocation']){
              //重新获取地理位置
              getGeography();
            }
          }
        })
    }else{//存在
      //读取用户绑定信息
      let userBindInfo = wx.getStorageSync('userBindInfo');
      if(userBindInfo == ''){
        console.log("没有获取到用户绑定信息，去获取");
        isBind(openid).then((data)=>{//返回用户绑定信息,手动登录
          console.log("userBindInfo:"+userBindInfo );
          toPage();
        });
      }else{
          console.log("获取到用户绑定信息存在，说明已登录，直接调回入口页");
          toPage();
      }
    }
  },
  toPage(){
      let _this = this;
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
