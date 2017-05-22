/**
 * 小区详情、二手房详情和新房详情评论列表控件
 */
var request = require('../../utils/request.js');
var app = getApp();
module.exports = {
  hc_zan:function(event){//赞    
    let self = this;
    let item = event.currentTarget.dataset.item;
    //判断是否登录
    if(!app.isLogin()){
      return;
    }
    //判断是否点亮
    if(item.isUp){
      return;
    }    
    
    let userInfo = wx.getStorageSync('userInfo');
    //调用赞接口
    request.fetch({
      "module":"estate",
      "action":"zan",
      "data":{
        "guestId":userInfo.guestId,
        "guestPhoneNum": userInfo.mobile,
        "commentId": item.pkid,
        "commentType":"2"
      },
      "showLoading":true,
      success:function(data){
        //更新赞个数，并设置isUp  
        let comments = self.data.comments;
        let itemInComments = comments.filter(function(c){
          return c.pkid == item.pkid;
        })[0];    
        itemInComments.isUp = 1;
        itemInComments.upAmount++;
        self.setData({comments:comments});  
      }
    });
  },

  hc_previewImage:function(event){//图片预览
    let currentImg = event.currentTarget.dataset.imgUrl;
    let commentId = event.currentTarget.dataset.commentId;
    let imgList = this.data.comments.filter(function(item){return item.pkid == commentId})[0].imgList;
    wx.previewImage({
      current: currentImg,
      urls: imgList.map(function(img){return img.url})
    })
  }
};