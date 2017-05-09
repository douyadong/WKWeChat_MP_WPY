/**
 * 小区详情、二手房详情和新房详情评论列表控件
 */
var request = require('../../utils/request.js');
var app = getApp();
module.exports = {
  /*
    data:{
      comments:[{}],
      commentTotal:integer
    }
  */

  _zan:function(event){//赞
    console.log(app.getCurrentPage());
    var self = this;
    var item = event.currentTarget.dataset.item;
    //判断是否登录
    app.isLogin();
    //判断是否点亮
    if(item.isActive){
      return;
    }    
    
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
        //更新赞个数，并设置isActive  
        var comments = self.data.comments;
        var itemInComments = comments.filter(function(c){
          return c.commentId == item.commentId;
        })[0];    
        itemInComments.isActive = true;
        itemInComments.upCount = data.upCount;
        self.setData({comments:comments});  
      }
    });*/
  },

  _previewImage:function(){//图片预览

  }

};