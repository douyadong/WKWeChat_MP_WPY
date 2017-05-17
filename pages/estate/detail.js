var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var request = require('../../utils/request.js');
var swiper = require('../components/swiper.js');
var app = getApp();
var params = $.extend(true, {}, {
    data: {
        "qqMapKey": app.globalData.qqmapkey
    },
    callEstateExpert: function() { //打电话给小区专家    
        wx.makePhoneCall({
            phoneNumber: this.data.agent && this.data.agent.agentMobile
        });              
    } ,
    openLocation: function() {
        wx.openLocation({
            longitude: parseFloat(this.data.estateInfo.longitude),
            latitude: parseFloat(this.data.estateInfo.latitude),
            name: this.data.estateInfo.estateName,
            address: this.data.estateInfo.estateAddr
        })
    },
    onLoad: function(options) {
        /**
        * options中需要有subEstateId和agentId
        */
        let userInfo = wx.getStorageSync('userInfo');
        let guestPhoneNum = userInfo && userInfo.mobile || '';
        options.guestPhoneNum = guestPhoneNum;

        this.setData(options);
    },
    onShow: function() {
        this.getEstateInfo();
    },
    gotoComment: function(event) {
        let url = event.currentTarget.dataset.url;
        app.isLogin(true, url);
        wx.navigateTo({
            url: url
        })
    },
    getEstateInfo: function() { //获取小区详情
        var that = this;
        request.fetch({                     
            "showLoading": true,
            "module": "estate",
            "action": "detail",
            "data": {
                subEstateId: that.data.subEstateId,
                //agentId:that.data.agentId,
                guestPhoneNum: that.data.guestPhoneNum
            },
            "success": function(data) {
                var e = data.data.estateInfo;
                //根据百度地图坐标获取腾讯地图坐标
                app.getQQMapLocation(e.latitude, e.longitude, function(res) {
                    that.setData({
                        'estateInfo.latitude': res.data.locations[0].lat,
                        'estateInfo.longitude': res.data.locations[0].lng
                    })
                });
                var estateInfo = {
                    district: e.district,
                    estateName: e.estateName,
                    town: e.town,
                    propertyRight: e.propertyRight,
                    completed: e.completed,
                    totalHouse: e.totalHouse,
                    propertyType: e.propertyType,
                    propertyCharges: e.propertyCharges,
                    greenRate: e.greenRate,
                    volumeRate: e.volumeRate,
                    propertyCompany: e.propertyCompany,
                    developers: e.developers,
                    subwayName: e.subwayName,
                    schoolName: e.schoolName,
                    sellhouseCount: e.sellhouseCount,
                    estateAddr: e.estateAddr
                };

                var comments = e.comment && e.comment.commentList || [];
                var agent = data.data.agent;
                var imgUrls = [];

                if (e.imgList && e.imgList.length) {
                    e.imgList.forEach(function(item) {
                        imgUrls.push({ url: item });
                    });
                }

                that.setData({
                    estateInfo,
                    comments,
                    commentsCount: e.comment && e.comment.amount || 0,
                    imgUrls,
                    agent
                });

                wx.setNavigationBarTitle({
                    title: e.estateName,
                })
            }
        });
    }
}, houseComment, swiper);

Page(params);
