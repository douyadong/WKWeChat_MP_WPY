//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: "",
    city: "",
    mobile: "",
    remark: "",
    msg: "",
    showError: false 
  },
  //事件处理函数
  bindInput: function(e) {
    let obj = {};
    obj[e.currentTarget.dataset.name] = e.detail.value;    
    this.setData(obj);
  },
  commit: function(){
    //验证必填项
    if(!this.data.name) {
      this.error("姓名不能为空！");
      return;
    }

    if(this.data.name.length > 30) {
      this.error("姓名最多30个字符！");
      return;
    }

    //姓名只能为汉字或字母
    var reg = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;
    if (!reg.test(this.data.name)) {
      this.error("姓名只能是汉字或者字母!");
      return;
    }


    if (!this.data.mobile) {
      this.error("手机不能为空！");
      return;
    }

    //手机号为1开头的11位数字
    var reg2 = /^1\d{10}$/;
    if (!reg2.test(this.data.mobile)) {
      this.error("请输入正确的手机号码!");
      return;
    }

    if(!this.data.city){
      this.error("城市不能为空！");
      return;
    }

    if (this.data.city.length > 30) {
      this.error("合作城市最多30个字符!");
      return;
    }

    if (!reg.test(this.data.city)) {
      this.error("合作城市只能输入汉字或字母!");
      return;
    }

    if (this.data.remark && this.data.remark.length > 120) {
      this.error("备注最多120个字符!");
      return;
    }

    let self = this;
    //提交
    wx.request({
      url: "https://www.wkzf.com/addCooperation.rest",
      data: {
        userName: this.data.name,
        phone: this.data.mobile,
        city: this.data.city,
        memo: this.data.remark,        
        pageSource: 4,
        utm_source: "加盟房产中介小程序"
      },

      success: function(data){
        console.log(data);
        if(data.data.status == '1') {
          self.setData({
            name: "",
            city: "",
            mobile: "",
            remark: "",
            msg: "申请合作成功！",
            showError: true
          });
        } else {
          self.setData({
            msg: data.data.message || "系统错误，请稍后重试！",
            showError: true
          });
        }

        setTimeout(function(){
          self.setData({
            showError: false
          })
        },3000);
      },
      fail: function(){
        self.setData({
          msg: "系统异常，请稍后重试！",
          showError: true
        });
        setTimeout(function () {
          self.setData({
            showError: false
          })
        }, 3000);
      },
      complete: function(){

      }
    });
  },
  error: function(msg) {
    this.setData({msg: msg, showError: true});
    setTimeout(()=>{
      this.setData({showError: false, msg: ""});
    }, 3000);
  },
  onShareAppMessage(){
    return {
      title: "加盟房产中介小程序"      
    };
  }
})
