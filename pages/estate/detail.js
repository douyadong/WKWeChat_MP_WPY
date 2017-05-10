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
            "module": "estate",
            "action": "detail",
            "data": {
                subEstateId: that.data.subEstateId
            },
            "success": function (data) {  
                //打点数据
                data.estateInfo.markers = [{
                    //iconPath: "/resources/others.png",
                    id: 0,
                    latitude: data.estateInfo.latitude,
                    longitude: data.estateInfo.longitude,
                    width: 50,
                    height: 50
                    }];              
                that.setData({                    
                    data
                });
            }
        });
    }
}, houseComment)

Page(params)