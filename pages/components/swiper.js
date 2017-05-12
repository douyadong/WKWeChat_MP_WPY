/**
 * 
 */
module.exports = {
  /*
    data:{
      imgUrls:[{
          url:'',
          type:'video'
      }],
      agentId:2234
    }
  */
  s_previewImage:function(event){//图片预览
    wx.previewImage({
        current: event.target.dataset.imgUrl, // 当前显示图片的http链接
        urls: this.data.imgUrls.filter(function (item) { return item.type !== 'video' }).map(function (item) { return item.url })// 需要预览的图片http链接列表
    });
  }
};