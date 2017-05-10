//工具方法
let _ = require('../../utils/extend.js')
//筛选区域脚本
let screen = require('./screen/template.js')

//获取应用实例
let app = getApp()
let main = {
  data: {
    agentList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  },
  goPage(event){
    wx.navigateTo({
      url: event.currentTarget.dataset.pagename
    })
  },
  init(){
    //地理定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.info(latitude);
      },
      fail:function(res) {
        console.log("点击取消");
      }
    })
  },
  onLoad(){
    this.init();
    this.templateInit();
  },
  //滚动到底部异步加载经纪人列表
  onReachBottom(){
    let oldList = this.data.agentList;
    let newList = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    for(let i=0;i<newList.length;i++){
      oldList.push(newList[i]);
    }
    this.setData({
        agentList:oldList
    })
  }
}
Page(_.extend(true,main, screen))
