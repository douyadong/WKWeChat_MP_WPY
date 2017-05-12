//工具方法
let _ = require('../../utils/extend.js')
var request = require('../../utils/request.js');
//筛选区域脚本
let filterAgentList = require('./filterAgentList/filterAgentList.js')

//获取应用实例
let app = getApp()
let main = {
  data: {
    geographical:{
        "cityId": 43,
        "cityName": "上海市",
        "districtId": 45,
        "townId": null
    },
    agentList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  },
  init(){
    let _this = this;
    //地理定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        //根据地理定位返回的精度纬度，获取当前所在的城市信息
        request.fetch({
            mock:true,
            module:'index',
            action:'findCityInfoByLonAndLat',
            data:{
              lon:longitude,
              lat:latitude
            },
            success:function(data){
              if(data.status.toString() == '1'){
                console.log("地理位置获取成功");
                  //更新地理数据
                  _this.setData({
                      geographical:data.data
                  });
                  //把城市信息保存到本地
                  wx.setStorage({
                    key:"geographical",
                    data:data.data
                  });
                  //根据地理位置，获取区域数据
                  request.fetch({
                      mock:true,
                      module:'index',
                      action:'getCityAreasInfo',
                      data:{
                        cityId:_this.data.geographical.cityId,
                        houseType:0//0表示不区分新房和二手房1新房2二手房3租房
                      },
                      success:function(data){
                          _this.filterAgentListInit(data.data);
                      }
                  });
              }
            },
            fail:function() {//失败
                console.log("地理位置获取失败");
                wx.setStorage({
                  key:"geographical",
                  data:{}
                })
                //获取区域数据
                request.fetch({
                    mock:true,
                    module:'index',
                    action:'getCityAreasInfo',
                    data:{
                      cityId:_this.data.geographical.cityId,
                      houseType:0//0表示不区分新房和二手房1新房2二手房3租房
                    },
                    success:function(data){
                        _this.filterAgentListInit(data.data);
                    }
                });
            }
        });
      },
      fail:function() {
         console.log("取消地理授权");
         wx.setStorage({
          key:"geographical",
          data:{}
        })
      }
    })
  },
  getUserInfo(){
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        console.log(userInfo);
        //更新数据
        that.setData({
          //userInfo:userInfo
        })
      })
  },
  onLaunch() {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onLoad(){
    this.init();
    this.getUserInfo();
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
Page(_.extend(true,main, filterAgentList))
