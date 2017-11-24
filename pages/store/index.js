Page({
    data: {
      storeId : "",
      showStoreId: false,
    } ,
    onLoad: function (options) {     
      this.setData({
        storeId: options.storeId
      });
    } ,
    onReady: function () {
    
    } ,
    clearF:function(){
      clearTimeout(this.setTF);
      this.setData({
        showStoreId: true
      })
    },
    setTF:setTimeout(function () {
        wx.redirectTo({
          url: "/pages/index/index"
        });
      }, 2000),
    onShow: function () { 
      this.setTF
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