//detail.js
var util = require('../../utils/util.js')
Page({
    data: {
        postImageUrl: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
        videoUrl: "http://v.wkzf.com/f789568828984978a6ebe32db70cb13bWV.mp4",
        imgUrls: [
            'https://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL',
            'https://img.wkzf.com/a236825f9cdb45a69bd0b2a8c959a2e1.DL',
            'https://img.wkzf.com/4057c482adf3421fbb257d00c0848eed.DW',
            'https://img.wkzf.com/06faf0080ee947218d0e55cac57c8b64.DW'
        ],
        swiperCurrent: 1,
        swiperTotal: 12,
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
    //swiper获取当前页
    getSwiperCurrentPage: function(event) {
        this.setData({
            swiperCurrent: event.detail.current+1
        })
    },
    preview:function(){
        wx.previewImage({
        current:this.data.swiperCurrent,
        urls:this.data.imgUrls // 需要预览的图片http链接列表
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
