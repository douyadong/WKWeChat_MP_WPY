//工具方法
let _ = require('../../utils/extend.js')
//筛选区域脚本
let screen = require('./screen/template.js')
//区域模拟数据
let mock = require('./../buy/mock.js')
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
  onLoad(){
    var that = this;
    //模拟数据-获取区域列表
    setTimeout(()=>{
      this.setData({
        regionList:mock.areaInfo.data
      })
    },1000);
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
