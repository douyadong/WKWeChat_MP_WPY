var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var request = require('../../utils/request.js');

var params = $.extend(true, {}, {
    data: {        
    },
    callEstateExpert: function () { //打电话给小区专家    
        wx.makePhoneCall({
            phoneNumber: this.data.agent && this.data.agent.agentMobile
        });
    } ,
    preview: function (event) {        
        wx.previewImage({
            current: event.target.dataset.imgUrl, // 当前显示图片的http链接
            urls: this.data.imgUrls.filter(function (item) { return item.type === 'img' }).map(function (item) { return item.url })// 需要预览的图片http链接列表
        })
    },
    onLoad: function (option) {
        this.data.subEstateId = option.subEstateId;
    },
    onShow: function () {
        this.getEstateInfo();
    },
    onShareAppMessage: function () {

    },
    getEstateInfo: function () { //获取小区详情
        var that = this;
        request.fetch({
            "mock":true,
            "module": "estate",
            "action": "detail",
            "data": {
                subEstateId: that.data.subEstateId
            },
            "success": function (data) {
                var e = data.data.estateInfo;

                var estateInfo = {
                    district:e.district,
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
                    markers:[{
                        //iconPath: "/resources/others.png",
                        id: 0,
                        latitude: e.latitude,
                        longitude: e.longitude,
                        width: 50,
                        height: 50
                    }]
                };
                var comments = e.comment.commentList;
                var agent = data.data.agent;
                var imgUrls = [];

                /*
                if(e.videoUrl){//todo:后端没有提供
                    imgUrls.push({url:e.videoUrl,type='video'});
                }*/  

                if(e.imgList && e.imgList.length){
                    e.imgList.forEach(function(item){
                        imgUrls.push({url:item});
                    });
                }                            
                that.setData({                    
                    estateInfo,
                    comments,
                    commentsCount:e.comment.amount,
                    imgUrls
                });
            }
        });
    }
}, houseComment)

Page(params)