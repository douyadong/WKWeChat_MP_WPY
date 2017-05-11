//detail.js
var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var swiper = require('../components/swiper.js');
var request = require('../../utils/request.js');
var app = getApp();
var params = $.extend(true,{},{
    data: {
        isCollapsed:true,//基本信息收起
        houseId:'1465823', //房源ID
        agentId:'1245',
        district:'长宁', //区域
        town:'古北区',//板块
        imgUrls: [{
            url: "https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL",
            videoUrl:"http://v.wkzf.com/fe5b05415e74492f93752219333d443bWV.mp4",
            "type": "video"
        }, {
            url: "https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/d3cb48985d2b47949a6ce982d1bf1ca3.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/7490de2c618c4e129572accad3adc51e.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/3410510d92b84f3798bed69c494e0e22.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/1580f8be571d4c3d88c77839cd73d38a.DL",
            "type": "img"
        }],
        comments: [{
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2015-10-06 12:10",
            upCount: "20",
            downCount: "11",
            imgList:['https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL','https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL','https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL']
        },{
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2015-10-06 12:10",
            upCount: "20",
            downCount: "11"
        },{
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2015-10-06 12:10",
            upCount: "20",
            downCount: "11"
        }],
        esfSources: [{
            "thumbnail": "https://img.wkzf.com/e13cc00ccbb547f9b7e63454535cabb0.ML",
            "title": "精装修 随时可以看房子",
            "layout": "2室2厅2卫",
            "area": 136,
            "money": 453,
            "location": "浦东 花木",
            "price": "45800"
        }, {
            "thumbnail": "https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
            "title": "精装修 随时可以看房子",
            "layout": "2室2厅2卫",
            "area": 136,
            "money": 453,
            "location": "浦东 花木",
            "price": "45800"
        }]
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
            module:'esf',
            action:'getDetail',
            data:{
                houseId:this.data.houseId,
                agentId:this.data.agentId
            },
            success:function(data){
                var newData = {};
                var h = data.data.house;
                var e = data.data.estate;
                var fileds = ['houseTitle','totalPrice','areaStr','houseChild','unitPrice','advancePayment','mortgage','completed','houseType','floorDesc','decorationStr','orientationStr','sellPoint','ownerMotivation','aroundSupport','houseTypeDesc','estateDesc','taxDesc','otherIntroduce','isTopHouse','fullYears','onlyOne','isSubwayHouse','isSchoolHouse','orientation','isNewOnStore'];
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
                
                newData.comments = e.comment.commentList;//评论
                newData.commentsCount = e.comment.ammount;
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

                that.setData(newData);
            }
        });
    },
    onLoad: function(options) {
        this.data.houseId = options.houseId;
        this.data.agentId = options.agentId;
    }
},houseComment,swiper);


Page(params)