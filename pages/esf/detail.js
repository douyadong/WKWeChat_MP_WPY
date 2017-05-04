//detail.js
var util = require('../../utils/util.js')
Page({
    data: {
        imgUrls: [{
            url: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
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
        }],
        "esfSources":[
      {
        "thumbnail":"https://img.wkzf.com/e13cc00ccbb547f9b7e63454535cabb0.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      },
      {
        "thumbnail":"https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      }
    ]
    },
    //swiper获取当前页
    preview: function(event) {
        console.log(event);
        wx.previewImage({
            current: event.target.dataset.imgUrl, // 当前显示图片的http链接
            urls: ["http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL", "https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL"] // 需要预览的图片http链接列表
        })
    },
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function(log) {
                return util.formatTime(new Date(log))
            })
        })
    }
})
