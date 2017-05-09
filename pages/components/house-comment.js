/**
 * 小区详情、二手房详情和新房详情评论列表控件
 */
var request = require('../../utils/request.js');
module.exports = {
  /*
    data:{
      comments:[{}],
      commentTotal:integer
    }
  */

  _zan:function(event){//赞
    console.log(event.currentTarget.dataset.item);
    /*request.fetch({
      "module":"estate",
      "action":"zan",
      "showLoading":true,
      success:function(data){
        //更新赞个数，并设置isActive    
      }
    });*/
  },

  _previewImage:function(){//图片预览

  }

};