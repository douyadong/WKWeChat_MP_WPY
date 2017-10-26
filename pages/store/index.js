Page({
    data: {
      agentId : ""  
    } ,
    onLoad: function (options) {     
      this.setData({
        agentId: options.agentId
      });
    } ,
    onReady: function () {
    
    } ,
    onShow: function () {      
      setTimeout(function () {
        wx.redirectTo({
          url: "/pages/index/index"
        });
      }, 2000);
    } ,
    onHide: function () {
    
    } ,

    onUnload: function () {
    
    } ,
    onPullDownRefresh: function () {
    
    } ,
    onReachBottom: function () {
    
    } ,
    onShareAppMessage: function () {
    
    }
})