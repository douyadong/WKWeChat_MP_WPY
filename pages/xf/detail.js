import request from "../../utils/request" ;
import $ from "../../utils/extend" ;
import houseComment from "../components/house-comment" ;
import swiper from "../components/swiper" ;
import detailFoot from "../components/detailfoot" ;
var app = getApp();

let params =$.extend(true , {} , {
     data : {
           "qqMapKey":app.globalData.qqmapkey 
     } ,
     render : function() {
          let  _ = this ;          
          request.fetch({
              "module": "xf" ,
              "action" : "detail" ,
              "data" : {
                  "subEstateId" : _.data.subEstateId ,
                  "agentId" : _.data.agentId,
                  "guestPhoneNum": _.data.guestPhoneNum
              } ,
              "showLoading" :  true ,            
              success : function (res) {
                  let result = res.data ;
                  //设置导航栏标题，格式为："区域 板块"
                  wx.setNavigationBarTitle({
                      title : result.newHouseDetail.districtName + " " + result.newHouseDetail.townName
                  }) ;
                  //给二手房和新房两个组件赋值
                  result.xfSources = result.aroundNewHouseList ;
                  if(result.xfSources) {
                      result.xfSources.forEach(function(element){
                          element.agentId = _.data.agentId ;
                      }) ; 
                  }                           
                  result.comments = result.comment && result.comment.commentList || [] ;                  
                  result.imgUrls = [] ;
                  //先将视频整合起来
                  if(result.newHouseDetail.estateVideoResponse) result.imgUrls.push({ "url" : result.newHouseDetail.estateVideoResponse.videoSmallImage , "videoUrl" : result.newHouseDetail.estateVideoResponse.videoUrl , "type" : "video" }) ; 
                  //再整合图片
                  if(result.newHouseDetail.cimageList) {
                      result.newHouseDetail.cimageList.forEach(function(element) {
                          result.imgUrls.push({ "url" : element.imageUrl }) ; 
                      }) ;
                  }
                //根据百度地图坐标获取腾讯地图坐标
                app.getQQMapLocation(result.newHouseDetail.latitude, result.newHouseDetail.longitude, function(res) {
                    _.setData({
                        'newHouseDetail.latitude': res.data.locations[0].lat,
                        'newHouseDetail.longitude': res.data.locations[0].lng
                    })
                });
                  _.setData(result) ;
              }
          }) ;
     } ,
     openLocation: function() {
        wx.openLocation({
            longitude : parseFloat(this.data.newHouseDetail.longitude) ,
            latitude : parseFloat(this.data.newHouseDetail.latitude) ,
            name : this.data.newHouseDetail.estateName ,
            address : this.data.newHouseDetail.initName
        }) ;
    } ,
    gotoComment:function(event){
      let url = event.currentTarget.dataset.url;
      let app = getApp();
      app.isLogin(true, url);
      wx.navigateTo({
        url: url
      })  
    },
    onLoad : function (options) {
        let userInfo = wx.getStorageSync('userInfo');
        let guestPhoneNum = userInfo && userInfo.mobile || '';

         //将页面传递过来的经纪人ID和新房ID保存起来供其他地方使用       
        this.setData({
          agentId : options.agentId ,
          subEstateId : options.subEstateId,
          guestPhoneNum: guestPhoneNum
        }) ;
        this.render() ;    
    }
} , houseComment , swiper , detailFoot ) ;

Page(params);
