//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    phone:'',
    verificationCode:'',
    logs: []
  },
  //获取手机号
  getPhone(event){
    this.setData({
      phone:event.detail.value
    })
  },
  //获取验证码
  getCode(event){
    let phone = this.data.phone;

    if(phone == ''){
      wx.showToast({
          title: '请输手机号码',
          icon: 'success',
          duration: 2000
        })
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'success',
          duration: 2000
        })
        return false; 
    } 
    //发送请求
  },
  //获取用户输入的验证码
  getVerificationCode(event){
    this.setData({
      verificationCode:event.detail.value
    })
  },
  //点击确定提交手机号，和验证码
  submit(event){
    console.log("手机号"+this.data.phone);
    console.log("验证码"+this.data.verificationCode);
  },
  //获取语音验证
  verification(event){
    wx.showToast({
      title: '语音验证码拨打中，请注意接收来电',
      icon: 'success',
      duration: 2000
    })
    //发送请求
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
