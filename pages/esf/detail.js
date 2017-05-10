//detail.js
var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var request = require('../../utils/request.js');
var app = getApp();
var params = $.extend(true,{},{
    data: {
        houseId:'1465823', //房源ID
        agentId:'1245',
        district:'长宁', //区域
        town:'古北区',//板块
        imgUrls: [{
            url: "https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL",
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
            downCount: "11"
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
    //swiper获取当前页
    preview: function(event) {
        console.log(event);
        wx.previewImage({
            current: event.target.dataset.imgUrl, // 当前显示图片的http链接
            urls: ["http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL", "https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL"] // 需要预览的图片http链接列表
        })
    },
    showMoreBasicInfo:function(){
        //基本信息查看更多按钮点击事件 tofo
    },
    getEstateInfo: function() { //获取二手房详情
        var that = this;
        wx.showLoading();
        wx.request({
            url: app.urls.estateInfoUrl,
            data: { //todo:此处需要根据接口定义提供调用参数

            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                // success
                //todo:此处需要把接口返回的数据转换成需要的格式，并调用that.setData()...

            },
            fail: function(res) {
                // fail
                //todo:错误提示
            },
            complete: function(res) {
                // complete        
                wx.hideLoading();
            }
        })
    },
    onLoad: function() {
    }
},houseComment)


Page(params)