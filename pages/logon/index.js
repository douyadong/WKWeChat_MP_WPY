var request = require('../../utils/request.js');
Page({
  data: {
    phone:'',
    verificationCode:'',
    isShowSend:false,
    second:60
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
      wx.showToast({
          title: '请输手机号码',
          icon: 'success',
          duration: 2000
        })
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        wx.showToast({
          title: '输入正确的手机号码',
          icon: 'success',
          duration: 2000
        })
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
      wx.showToast({
          title: '请输手机号码',
          icon: 'success',
          duration: 2000
        })
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        wx.showToast({
          title: '输入正确的手机号码',
          icon: 'success',
          duration: 2000
        })
        return false; 
    }
    
    //校验验证码
    if(verificationCode == ''){
      wx.showToast({
        title: '验证码不得为空',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    if(isNaN(verificationCode) ){//|| (verificationCode+'').length != 6
      wx.showToast({
        title: '验证码为数字',
        icon: 'success',
        duration: 2000 
      })
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
  onLoad: function () {
    //1.页面初始化，读取Storage，判断微信用户是否为空

    //不为空，说明已授权，提交登录信息
    
    //为空，未授权 -> 弹出授权提示，设置授权
    //点“取消”，弹框消失，“确定”去登录，校验手机号，验证码



  }
})
