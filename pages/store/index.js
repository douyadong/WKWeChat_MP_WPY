


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
      clearTimeout(this.data.setTF);
      this.setData({
        showStoreId: true
      })
    },
    onShow: function () { 
      this.data.setTF = setTimeout(function () {
        wx.redirectTo({
          url: "/pages/index/index"
        });
      }, 1000);
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