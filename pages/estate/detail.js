var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var request = require('../../utils/request.js');
var swiper = require('../components/swiper.js');

var params = $.extend(true, {}, {
    data: {    
           
    },
    callEstateExpert: function () { //打电话给小区专家    
        wx.makePhoneCall({
            phoneNumber: this.data.agent && this.data.agent.agentMobile
        });
    } ,
    openLocation: function() {
        wx.openLocation({
            longitude: parseFloat(this.data.estateInfo.longitude),
            latitude: parseFloat(this.data.estateInfo.latitude),
            name:this.data.estateInfo.estateName,
            address:this.data.estateInfo.estateAddr
        })
    },
    onLoad: function (options) {
        this.setData({
          subEstateId:options.subEstateId,
          agentId:options.agentId
        });        
    },
    onShow: function () {
        this.getEstateInfo();
    },
    onShareAppMessage: function () {

    },
    getEstateInfo: function () { //获取小区详情
        var that = this;
        request.fetch({
            //"mock":true,
            "showLoading":true,
            "module": "estate",
            "action": "detail",
            "data": {
                subEstateId: that.data.subEstateId
            },
            "success": function (data) {
                var e = data.data.estateInfo;

                var estateInfo = {
                    district:e.district,
                    estateName:e.estateName,
                    town:e.town,
                    propertyRight:e.propertyRight,
                    completed:e.completed,
                    totalHouse:e.totalHouse,
                    propertyType:e.propertyType,
                    propertyCharges:e.propertyCharges,
                    greenRate:e.greenRate,
                    volumeRate:e.volumeRate,
                    propertyCompany:e.propertyCompany,
                    developers:e.developers,
                    subwayName:e.subwayName,
                    schoolName:e.schoolName,
                    sellhouseCount:e.sellhouseCount,
                    longitude:e.longitude,
                    latitude:e.latitude,
                    estateAddr:e.estateAddr,
                    markers:[{
                        //iconPath: "/resources/others.png",
                        id: 0,
                        latitude: e.latitude,
                        longitude: e.longitude
                    }]
                };
                var comments = e.comment && e.comment.commentList || [];
                var agent = data.data.agent;
                var imgUrls = [];

                /*
                if(e.videoUrl){//todo:后端没有提供
                    imgUrls.push({url:e.videoUrl,videoUrl:e.videoUrl,type='video'});
                }*/  

                if(e.imgList && e.imgList.length){
                    e.imgList.forEach(function(item){
                        imgUrls.push({url:item});
                    });
                }                            
                that.setData({                    
                    estateInfo,
                    comments,
                    commentsCount:e.comment && e.comment.amount || 0,
                    imgUrls
                });
            }
        });
    }
}, houseComment,swiper);

Page(params);