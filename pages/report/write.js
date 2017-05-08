//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    reason1:false,
    reason2:false,
    reason3:false,
    reason4:false,
    reason5:false,
    des:""
  },
  changereason1:function(){
  	this.setData({
  		reason1:!this.data.reason1
  	})
  },
  changereason2:function(){
  	this.setData({
  		reason2:!this.data.reason2
  	})
  },
  changereason3:function(){
  	this.setData({
  		reason3:!this.data.reason3
  	})
  },
  changereason4:function(){
  	this.setData({
  		reason4:!this.data.reason4
  	})
  },
  changereason5:function(){
  	this.setData({
  		reason5:!this.data.reason5
  	})
  },
  listenerDesInput:function(e){
  	console.log(e.detail.value);
  	this.data.des = e.detail.value;
  },
  submit:function(){
  	wx.request({
  		url:'',
  		data:{
  			reason1:this.data.reason1,
  			reason2:this.data.reason2,
  			reason3:this.data.reason3,
  			reason4:this.data.reason4,
  			reason5:this.data.reason5,
  			des:this.data.res
  		},
  		success:function(res){
  			console.log("request success");
  		}
  	})
  },
  onLoad: function () {
    
  }
})
