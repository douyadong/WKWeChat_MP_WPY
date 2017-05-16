//video.js
var util = require('../../utils/util.js');
var dt = require('../components/detailfoot.js');
var request = require('../../utils/request.js');
Page({
    data: {
        // videoUrl:'http://v.wkzf.com/fe5b05415e74492f93752219333d443bWV.mp4'
    },
    onLoad: function (options) {
        this.setData({
            videoUrl: options.videoUrl,
            agentId: options.agentId
        })

        this.getAgentInfo();
    },
    getAgentInfo: function () {
        var that = this;
        if (this.data.agentId) {
            request.fetch({
                module: "esf",
                action: "agentInfo",
                data: {
                    agentId: this.data.agentId
                },
                success: function (data) {
                    data.data.isShowWXCode = false;
                    that.setData({
                        agentInfo:data.data
                        /*agentInfo: {
                            "agentImage": data.data.headRoundImgUrl,
                            "agentName": data.data.agentName,
                            "agentCompany": data.data.companyName,
                            "agentPhoneNum": data.data.agentMobile,
                            "agentWechatNum": data.data.agentWChatId,
                            "agentCodeImg": data.data.agentWChartQRImgUrl,
                            'isShowWXCode': false
                        }*/
                    });

                }
            });
        }
    }
})
