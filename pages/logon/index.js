var request = require('../../utils/request.js');
/**
 * 获取code方法
 */
var getLoginCode = function () {
    return new Promise(function (resolve, reject) {
        wx.login({
          success: function(res) {
            if (res.code) {
              //获取code换取session_key
              console.log("code："+res.code);
              resolve(res.code);
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
              reject(res.errMsg)
            }
          }
        });
    });
};
let app = getApp()
Page({
  data: {
    phone:'',
    verificationCode:'',
    isShowSend:false,
    second:60,
    tips: {
      show: false
    }
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
    let codeType = event.target.dataset.codetype;
    if(phone == ''){
      app.showTips("请输手机号码");
      return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        app.showTips("输入正确的手机号码");
        return false; 
    } 
    //显示重新发送
    this.setData({
      isShowSend:true,
      second:60,
    })
    let s = this.data.second;
    let t = setInterval(()=>{
      --s;
      if(s == 0){
        this.setData({
          isShowSend:false
        })
        clearInterval(t);
      }
      this.setData({
        second:s
      })
    }, 1000);


    //发送请求
    request.fetch({
        mock:true,
        module:'logon',
        action:'generateIdentifyCode',
        data:{
          phone:phone,
          codeType:codeType
        },
        success:function(data){
            console.log(data);
        }
    });
    
  },
  //获取用户输入的验证码
  getVerificationCode(event){
    this.setData({
      verificationCode:event.detail.value
    })
  },
  //点击确定提交手机号，和验证码
  submit(event){
    let phone = this.data.phone;
    let verificationCode = this.data.verificationCode;
    //校验手机号
    if(phone == ''){
        app.showTips("请输手机号码");
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        app.showTips("输入正确的手机号码");
        return false; 
    }
    
    //校验验证码
    if(verificationCode == ''){
      app.showTips("验证码不得为空");
      return false;
    }
    if(isNaN(verificationCode) ){//|| (verificationCode+'').length != 6
      app.showTips("验证码为数字");
      return false;
    }
    console.log("手机号"+this.data.phone);
    console.log("验证码"+this.data.verificationCode); 
    //提交
    request.fetch({
        mock:true,
        module:'logon',
        action:'loginFromMobilePhone',
        data:{
          phone:phone,
          code:verificationCode
        },
        success:function(data){
            console.log(data);
        }
    });
  },
  onLoad() {
    getLoginCode().then((code)=>{
      console.log(code);
    });

    //1.页面初始化，读取Storage,获取用户登录信息，判断微信用户是否为空
    wx.getStorage({
      key: 'userLoginInfo',
      success: function(res) {//已授权
          console.log("已授权");
          console.log(res.data)
          //调接口：判断是否已经绑定过手机接口（完成）。获取openId



      },
      fail:function() {//未授权
        console.log("未授权，没有获取到userLoginInfo信息");
        //提示授权
        wx.showModal({
          title: '授权提示',
          content: '检测到您没有打开悟空找房的用户信息权限，是否去设置打开？',
          success: function(res) {
              //去设置授权
              if(res.confirm){
                console.log("用户点击确定");
                //打开设置页面
                wx.openSetting({
                  success: (res) => {
                    console.log(res);
                  }
                })
              }else{
                console.log("用户点击取消");
              }
          },
          fail:function () {
              console.log('对话框调用失败')
          }
        })
      }
    })
  }
})
