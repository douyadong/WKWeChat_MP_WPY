var app = getApp();
var util = require('../../utils/util.js')

Page({
  data: {
    imgUrls:[{
      url:"http://v.wkzf.com/f789568828984978a6ebe32db70cb13bWV.mp4",
      "type":"video"
    },{
      url:"http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      "type":"img"
    },{
      url:"https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL",
      "type":"img"
    },{
      url:"https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      "type":"img"
    },{
      url:"https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      "type":"img"
    },{
      url:"https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      "type":"img"
    }],
    estateExpert:{//小区专家
      name:"",
      id:"",
      cellphone:""
    },
    info:{
      town:"",//所属板块
      propertyYear:"",//产权年限
      finishYear:"",//竣工年代
      totalHouse:"",//房屋总数
      propertyType:"",//物业类型
      proertyFee:"",//物业费
      greenRatio:"",//绿化率
      plotRatio:"",//容积率
      propertyCompany:"",//物业公司
      developer:"",//开发商
    },
    comments:[/*{
      photo:"http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      cellphone:"133*****2365",
      labels:["",""],
      content:"南北通透，黄金楼层，满五唯一，精装修。",
      createDate:""+(new Date()),
      upCount:"20",
      downCount:"11"
    }*/],
    loadingCount:0
  },
  callEstateExpert:function(){//打电话给小区专家    
    wx.makePhoneCall({
    phoneNumber: this.data.estateExpert && this.data.estateExpert.cellphone
})
  } , 
  toComment:function(){
    wx.navigateTo({url:'/pages/index/index'});
  },
  preview:function(event){
    console.log(event);
    wx.previewImage({
      current: event.target.dataset.imgUrl, // 当前显示图片的http链接
      urls: ["http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL","https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL"] // 需要预览的图片http链接列表
    })
  },
  onLoad: function () {
    
  },
  onShow:function(){
    console.log('onShow...');

    var v = [{
      photo:"http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
      cellphone:"133*****2365",
      labels:["",""],
      content:"南北通透，黄金楼层，满五唯一，精装修。",
      createDate:""+(new Date()),
      upCount:"20",
      downCount:"11"
    }];
    v[0].createDate = "" + (new Date());
    this.setData({
      comments:v
    })    
  },
  onShareAppMessage:function(){

  },
  getEstateInfo:function(){//获取小区详情
    var that = this;    
    wx.showLoading();
    wx.request({
      url: app.urls.estateInfoUrl,
      data: {//todo:此处需要根据接口定义提供调用参数

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        //todo:此处需要把接口返回的数据转换成需要的格式，并调用that.setData()...

      },
      fail: function(res) {
        // fail
        //todo:错误提示
      },
      complete: function(res) {
        // complete        
        wx.hideLoading();
      }
    })
  },
  getComments:function(){//获取小区评论，如果放在小区详情接口里，这个方法就不需要了
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.urls.commentsUrl,
      data: {//todo:此处需要根据接口定义提供调用参数

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        //todo:
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
        wx.hideLoading();
      }
    })

  },
  showLoading:function(){
    /*如果页面中同时有多个异步请求，分别调用wx.showLoading和wx.hideLoading会出现问题
      多次调用wx.showLoading没有一点问题，始终只会有一个loading出现。问题在于，有多于
      一个异步操作时，有一个完成就会调用wx.hideLoading，但是此时并不能保证所有的异步操
      作都结束了，但是只要调用wx.hideLoading，loading就会消失。    
    */
    this.data.loadingCount++;
    wx.showLoading();    
  },
  hideLoading:function(){
    if(this.data.loadingCount>0){
      this.data.loadingCount--;
      if(this.data.loadingCount===0){
        wx.hideLoading();
      }
    }
  }
})
