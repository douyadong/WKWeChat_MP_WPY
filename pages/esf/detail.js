//detail.js
var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var swiper = require('../components/swiper.js');
var request = require('../../utils/request.js');
var df = require('../components/detailfoot.js');
var app = getApp();
var params = $.extend(true, {}, {
    data: {
        isCollapsed: true, //基本信息收起
        "qqMapKey": app.globalData.qqmapkey,
        "openType": "redirect"
    },
    toggleMoreBasicInfo: function() { //基本信息展开和收起        
        this.setData({
            isCollapsed: !this.data.isCollapsed
        });
    },
    openLocation: function() {
        wx.openLocation({
            longitude: parseFloat(this.data.longitude),
            latitude: parseFloat(this.data.latitude),
            name: this.data.houseTitle,
            address: this.data.estateAddr
        })
    },
    jump: function(event) {
        let url = event.currentTarget.dataset.url;
        app.isLogin(true, url);
        wx.navigateTo({
            url: url
        })
    },
    onShareAppMessage: function() {
        return {
            title: '买房卖房，找好经纪人就对了！'
        }
    },
    getDetail: function() { //获取二手房详情
        var that = this;
        request.fetch({
            //mock:true,
            "showLoading": true,
            module: 'esf',
            action: 'getDetails',
            data: {
                houseId: this.data.houseId,
                agentId: this.data.agentId,
                guestPhoneNum: this.data.guestPhoneNum
            },
            success: function(data) {
                var newData = { imgUrls: [] };
                var h = data.data.house;
                var e = data.data.estate;
                var a = data.data.agent;
                var fields = ['houseTitle', 'totalPrice', 'areaStr', 'houseChild', 'unitPrice', 'advancePayment', 'mortgage', 'completed', 'houseType', 'floorDesc', 'decorationStr', 'orientationStr', 'sellPoint', 'ownerMotivation', 'aroundSupport', 'houseTypeDesc', 'estateDesc', 'taxDesc', 'otherIntroduce', 'isTopHouse', 'fullYears', 'onlyOne', 'isSubwayHouse', 'isSchoolHouse', 'orientation', 'isNewOnStore'];
                fields.forEach(function(item) {
                    newData[item] = h[item];
                });
                fields = ['estateId', 'subEstateId', 'estateName', 'subwayName', 'schoolName', 'completedStr', 'totalHouseCount', 'estateAddr', 'sameEstateHouseAmount', 'longitude', 'latitude', 'estateImgUrl'];
                fields.forEach(function(item) {
                    newData[item] = e[item];
                });
                /********百度地图坐标转腾讯地图坐标************/
                app.getQQMapLocation(e.latitude, e.longitude, function(res) {
                    that.setData({
                        'latitude': res.data.locations[0].lat,
                        'longitude': res.data.locations[0].lng
                    })
                });
                if (h.houseVideoResponse) {
                    newData.imgUrls.push({
                        url: h.houseVideoResponse.videoSmallImage,
                        videoUrl: h.houseVideoResponse.videoUrl,
                        "type": "video"
                    });
                }
                if (h.estateVideoResponse) {
                    newData.imgUrls.push({
                        url: h.estateVideoResponse.videoSmallImage,
                        videoUrl: h.estateVideoResponse.videoUrl,
                        "type": "video"
                    });
                }
                if (h.imgList && h.imgList.length) {
                    h.imgList.forEach(function(img) {
                        newData.imgUrls.push({
                            url: img
                        });
                    });
                }
                newData.comments = e.comment && e.comment.commentList || []; //评论
                newData.commentsCount = e.comment && e.comment.amount || 0;
                newData.sameTownTotalCount = data.data.sameTownTotalCount; //在售房源数量
                newData.esfSources = [];
                if (data.data.sameTownHouseList) { //相似房源列表
                    newData.esfSources = data.data.sameTownHouseList || []; //相似房源列表
                    newData.esfSources.forEach(function(element) {
                        element.agentId = that.data.agentId;
                    });

                }

                if (a) { //经纪人信息
                    newData.agentInfo = a;
                    newData.agentInfo.isShowWXCode = false;
                }

                that.setData(newData);
                wx.setNavigationBarTitle({
                    title: h.district + " " + h.town,
                })
            }
        });
    },
    onLoad: function(options) {
        /**
         * options中需要houseId、agentId和sourceType
         */
        let userInfo = wx.getStorageSync('userInfo');
        let guestPhoneNum = userInfo && userInfo.mobile || '';
        options.guestPhoneNum = guestPhoneNum;

        this.setData(options);
        this.getDetail();
    }
}, houseComment, swiper, df);

Page(params)
