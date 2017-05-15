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
     render : function(options) {
          let  _ = this ;
          let subEstateId = options.subEstateId ;
          request.fetch({
              "module": "xf" ,
              "action" : "detail" ,
              "mock" : false ,
              "data" : {
                  "subEstateId" : _.data.subEstateId, //113408 ,
                  "agentId" : _.data.agentId//100321    
              } ,
              "showLoading" :  true ,            
              success : function (res) {
                  let result = res.data ;
                  //给二手房和新房两个组件赋值
                  result.xfSources = result.aroundNewHouseList ;                  
                  result.comments = result.comment && result.comment.commentList || [] ; 
                  //给经纪人信息赋值
                  result.agentDetail = result.agent ;
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
        this.setData({
          agentId:options.agentId,
          subEstateId:options.subEstateId
        });
        this.render(options) ;    
    }
} , houseComment , swiper , detailFoot ) ;

Page(params) ;