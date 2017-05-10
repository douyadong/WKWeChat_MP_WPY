//detail.js
var util = require('../../utils/util.js')
Page({
    data: {
        houseId:'1465823', //房源ID
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
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function(log) {
                return util.formatTime(new Date(log))
            })
        })
    }
})
