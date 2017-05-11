//detail.js
var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var swiper = require('../components/swiper.js');
var request = require('../../utils/request.js');
var df = require('../components/detailfoot.js');
var app = getApp();
var params = $.extend(true,{},{
    data: {
        isCollapsed:true,//基本信息收起
    },
    toggleMoreBasicInfo:function(){
        //基本信息查看更多按钮点击事件
        this.setData({
            isCollapsed:!this.data.isCollapsed
        });
    },
    getDetail: function() { //获取二手房详情
        var that = this;
        request.fetch({
            mock:true,
            module:'esf',
            action:'getDetails',
            data:{
                houseId:this.data.houseId,
                agentId:this.data.agentId
            },
            success:function(data){
                var newData = {imgUrls:[]};
                var h = data.data.house;
                var e = data.data.estate;
                var a = data.data.agent;
                var fields = ['houseTitle','totalPrice','areaStr','houseChild','unitPrice','advancePayment','mortgage','completed','houseType','floorDesc','decorationStr','orientationStr','sellPoint','ownerMotivation','aroundSupport','houseTypeDesc','estateDesc','taxDesc','otherIntroduce','isTopHouse','fullYears','onlyOne','isSubwayHouse','isSchoolHouse','orientation','isNewOnStore'];
                fields.forEach(function(item){
                    newData[item] = h[item];
                });

                fields = ['estateId','subEstateId','estateName','subwayName','schoolName','completedStr','totalHouseCount','estateAddr','sameEstateHouseAmount','longitude','latitude'];
                fields.forEach(function(item){
                    newData[item] = e[item];
                });

                newData.markers = [{
                    //iconPath: "/resources/others.png",
                    id: 0,
                    latitude: e.latitude,
                    longitude: e.longitude,
                    width: 50,
                    height: 50
                }];
                

                if(h.houseVideoResponse){
                    newData.imgUrls.push({url: h.houseVideoResponse.videoSmallImage,
            videoUrl:h.houseVideoResponse.videoUrl,
            "type": "video"});
                }
                if(h.imgList && h.imgList.length){
                    h.imgList.forEach(function(img){
                        newData.imgUrls.push({
                            url:img
                        });
                    });                    
                }
                newData.comments = e.comment.commentList;//评论
                newData.commentsCount = e.comment.ammount;
                newData.sameTownTotalCount = data.data.sameTownTotalCount;
                newData.esfSources= data.data.sameTownHouseList.map(function(item){
                    return {
                        thumbnail:item.houseImgUrl,
                        title:item.houseTitle,
                        layout:item.houseChild,
                        area:item.areaStr,
                        money:item.totalPrice,
                        location:item.district+" "+item.town,
                        price:item.unitPrice
                    }
                });//相似房源列表
                if(a){
                    newData.agentInfo = a;
                    newData.agentInfo.isShowWXCode = true;
                }

                that.setData(newData);
            }
        });
    },
    onLoad: function(options) {
        this.data.houseId = options.houseId;
        this.data.agentId = options.agentId;

        this.getDetail();
    }
},houseComment,swiper,df);

Page(params)