/**
 * 小区详情、二手房详情和新房详情评论列表控件
 */
var request = require('../../utils/request.js');
var app = getApp();
module.exports = {
  /*
    data:{
      comments:[{
        "pkid": 1079,
        "subEstateId": 0,
        "upAmount": 0,
        "downAmount": 0,
        "comment": "丰田天",
        "createTimeStr": "2017-03-23 16:04:52",
        "orderLevel": null,
        "isUp": 0,
        "isDown": 0,
        "imgList": null,
        "landlord": 0
      }]
    }
  */

  hc_zan:function(event){//赞    
    var self = this;
    var item = event.currentTarget.dataset.item;
    //判断是否登录
    app.isLogin();
    //判断是否点亮
    if(item.isActive){
      return;
    }    
    
    //调用赞接口
    /*request.fetch({
      "module":"estate",
      "action":"zan",
      "data":{
        "guestId":"",
        "commentId":item.id,
        "commentType":"2"
      },
      "showLoading":true,
      success:function(data){
        //更新赞个数，并设置isUp  
        var comments = self.data.comments;
        var itemInComments = comments.filter(function(c){
          return c.pkid == item.pkid;
        })[0];    
        itemInComments.isUp = 1;
        itemInComments.upAmount = data.upAmount;
        self.setData({comments:comments});  
      }
    });*/
  },

  hc_previewImage:function(event){//图片预览
    var currentImg = event.currentTarget.dataset.imgUrl;
    var commentId = event.currentTarget.dataset.commentId;
    var imgList = this.data.comments.filter(function(item){return item.pkid == commentId})[0].imgList;
    wx.previewImage({
      current: currentImg,
      urls: imgList.map(function(img){return img.url})
    })
  }
};