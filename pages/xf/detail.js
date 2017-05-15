import request from "../../utils/request" ;
import $ from "../../utils/extend" ;
import houseComment from "../components/house-comment" ;
import swiper from "../components/swiper" ;
import detailFoot from "../components/detailfoot" ;
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js" ;

let qqmapsdk ;

let params =$.extend(true , {} , {
     data : {
            
     } ,
     render : function() {
          let  _ = this ;          
          request.fetch({
              "module": "xf" ,
              "action" : "detail" ,
              "mock" : false ,
              "data" : {
                  "subEstateId" : _.data.subEstateId ,
                  "agentId" : _.data.agentId
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
    onLoad : function (options) {
         qqmapsdk = new QQMapWX({
            key : '3PLBZ-SHL3O-E4TWH-SFGHP-WYGG5-KKFLN'
         }) ; 
         //将页面传递过来的经纪人ID和新房ID保存起来供其他地方使用       
        this.setData({
          agentId : options.agentId ,
          subEstateId : options.subEstateId
        }) ;
        this.render() ;    
    }
} , houseComment , swiper , detailFoot ) ;

Page(params) ;