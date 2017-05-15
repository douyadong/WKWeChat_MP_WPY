//工具方法
let _ = require('../../utils/extend.js')
var request = require('../../utils/request.js');
//筛选区域脚本
let filterAgentList = require('./filterAgentList/filterAgentList.js')

//获取应用实例
let app = getApp()
let main = {
  data: {
    //地理位置信息
    geography:{
        "cityId": 43,
        "cityName": "上海市",
        "districtId": 45,
        "townId": null,
        "cityPinyin":"shanghaishi"
    },
    //经纪人列表
    agentList:[],
    //获取经纪人列表的筛选条件
    districtAndTown:"",//选中区域拼音
    orderType:1,//排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
    selectLabelList:-1,//更多：-1.不限 1.好经纪人 2.客户热评 3.推荐房源数量多
    pageIndex:0,//起始条数 默认从0开始
  },
  setGeography(cb){
    let _this = this;
    //先把默认的地理位置信息写入到本地
    wx.setStorage({
      key:"geography",
      data:_this.data.geographical
    })
    //地理定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {//地理定位成功，获取经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude+"---------------"+longitude);
        //根据精度纬度，获取当前所在的城市信息
        request.fetch({
            mock:!true,
            module:'index',
            action:'findCityInfoByLonAndLat',
            data:{
              lon:longitude,
              lat:latitude
            },
            success:function(data){//获取城市信息成功
              console.log("经纬度，获取城市成功");
              console.log(data);
              if(data.status.toString() == '1'){
                  //更新地理信息状态
                  _this.setData({
                      geography:data.data
                  });
                  //把成功后的地理位置信息写入本地
                  wx.setStorage({
                    key:"geography",
                    data:data.data
                  });
              }
              cb();
            },
            fail:function() {//获取城市信息失败
                console.log("经纬度，获取城市失败");
                cb();
            }
        });
      },
      fail:function() {//用户取消地理定位
        //使用的是默认城市id,获取区域信息
        console.log("用户取消地理定位");
        cb();
      }
    })
  },
  //根据城市id获取区域信息
  getCityAreasInfo(cityId){
    let _this = this;
    //根据城市id，获取区域数据
    request.fetch({
        mock:!true,
        module:'index',
        action:'getCityAreasInfo',
        data:{
          cityId:cityId,
          houseType:0//0表示不区分新房和二手房1新房2二手房3租房
        },
        success:function(data){
            //console.log(data);
            _this.filterAgentListInit(data.data);
            wx.setStorage({
                key:"cityInfo",
                data:data.data
            })
        },
        fail:function(params) {
          _this.filterAgentListInit([]);
          wx.setStorage({
                key:"cityInfo",
                data:[]
          })
        }
    });
  },
  //获取用户信息
  getUserInfo(){
      var that = this
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            withCredentials:true,
            success: function (res) {console.log(res);
              wx.setStorage({
                key:"userLoginInfo",
                data:res
              })
            }
          })
        }
      })
  },
  //获取经纪人列表
  getAgentList(cityId,districtAndTown,orderType,selectLabelList,pageIndex,cb){
    console.log(cityId,districtAndTown,orderType,selectLabelList,pageIndex);
    let _this = this;
    request.fetch({
          mock:!true,
          module:'index',
          action:'searchAgentList',
          data:{
              "cityId": cityId,//城市主键
              "districtAndTown": districtAndTown,//选中区域拼音。区域选的如果是不限，就传当前城市
              "orderType": orderType,//排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
              "selectLabelList":selectLabelList,//1.好经纪人 2.客户热评 3.推荐房源数量多
              "pageIndex": pageIndex,//起始条数 默认从0开始
              "pageSize": 20,//每页数量 默认20条
          },
          success:function(data){
              if(data.status.toString() == "1"){
                  cb(data.data.agentList);
              }else{
                  cb([]);
              }
          },
          fail:function() {
            cb([]);
          }
    });
  },
  onLoad(){
    let _this = this;
    //设置地理
    _this.setGeography(function() {
      //获取区域信息
      _this.getCityAreasInfo(_this.data.geography.cityId);
      //设置区域
      _this.setData({
          //districtAndTown:_this.data.geography.cityPinyin
          districtAndTown:""
      })
      //获取经纪人列表
      _this.getAgentList(
        _this.data.geography.cityId,
        _this.data.districtAndTown,
        _this.data.orderType,
        _this.data.selectLabelList,
        _this.data.pageIndex,
        function (agentList) {
          _this.setData({
            agentList:agentList
          })
        }
      );
    });
  },
  //滚动到底部异步加载经纪人列表
  onReachBottom(){
    let _this = this;
    let pageIndex = ++_this.data.pageIndex
    _this.setData({
        pageIndex:pageIndex
    })
    //获取经纪人列表
    _this.getAgentList(
      _this.data.geography.cityId,
      _this.data.districtAndTown,
      _this.data.orderType,
      _this.data.selectLabelList,
      _this.data.pageIndex,
      function (agentList) {
        let oldAgentList = _this.data.agentList;
        for(let i=0;i<agentList.length;i++){
          oldAgentList.push(agentList[i]);
        }
        _this.setData({
            agentList:oldAgentList
        })
      }
    );
  }
}
Page(_.extend(true,main, filterAgentList))
