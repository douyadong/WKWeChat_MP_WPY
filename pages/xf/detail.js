import request from "../../utils/request" ;
import $ from "../../utils/extend.js" ;
import houseComment from "../components/house-comment.js" ;
import swiper from "../components/swiper.js" ;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk ;

let params =$.extend(true , {} , {
     data : {         
     } ,
     render : function(options) {
          let  _ = this ;
          let subEstateId = options.subEstateId ;
          request.fetch({
              "module": "xf" ,
              "action" : "detail" ,
              "showLoading" :  true ,              
              success : function (res) {
                  let result = res.data ;
                  //给二手房和新房两个组件赋值
                  result.xfSources = result.aroundNewHouseList ;                  
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
                  //最后赋予模板变量
                  _.setData(res.data) ;
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
            key: '3PLBZ-SHL3O-E4TWH-SFGHP-WYGG5-KKFLN'
         }) ;        
        this.render(options) ;    
    }
} , houseComment , swiper ) ;

Page(params) ;