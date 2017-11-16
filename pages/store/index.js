Page({
    data: {
      storeId : ""  
    } ,
    onLoad: function (options) {     
      this.setData({
        storeId: options.storeId
      });
    } ,
    onReady: function () {
    
    } ,
    onShow: function () {      
      setTimeout(function () {
        wx.redirectTo({
          url: "/pages/index/index"
        });
      }, 3000);
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