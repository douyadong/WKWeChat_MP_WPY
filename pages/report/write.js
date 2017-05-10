//logs.js
var util = require('../../utils/util.js')
Page({
    data: {
        houseId: '',
        notExist: 0,
        hasSold: 0,
        priceNotReal: 0,
        imgNotReal: 0,
        othreReason: 0,
        memo: ""
    },
    changenotExist: function() {
        this.setData({
            notExist: !this.data.notExist
        })
    },
    changehasSold: function() {
        this.setData({
            hasSold: !this.data.hasSold
        })
    },
    changepriceNotReal: function() {
        this.setData({
            priceNotReal: !this.data.priceNotReal
        })
    },
    changeimgNotReal: function() {
        this.setData({
            imgNotReal: !this.data.imgNotReal
        })
    },
    changeothreReason: function() {
        this.setData({
            othreReason: !this.data.othreReason
        })
    },
    listenerDesInput: function(e) {
        console.log(e.detail.value);
        this.data.des = e.detail.value;
    },
    submit: function() {
        var requestData = {
            houseId: this.data.houseId,
            notExist: this.data.notExist,
            hasSold: this.data.hasSold,
            priceNotReal: this.data.priceNotReal,
            imgNotReal: this.data.imgNotReal,
            othreReason: this.data.othreReason,
            memo: this.data.memo
        };
        console.log(requestData);
        if (requestData.notExist || requestData.hasSold || requestData.priceNotReal || requestData.imgNotReal || requestData.othreReason || requestData.memo) {
            if (requestData.memo.length <= 300) {
                wx.request({
                    url: '',
                    data: requestData,
                    success: function(res) {
                        console.log("request success");
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
            } else {
                wx.showModal({
                    content: '补充说明不能超过300字',
                    showCancel: false,
                    confirmColor: '#4081D6'
                })
            }
        } else {
            wx.showModal({
                content: '请选择举报原因或者填写补充说明',
                showCancel: false,
                confirmColor: '#4081D6'
            });
        }
    },
    onLoad: function(options) {
        this.setData({
            houseId: options.houseId
        })
    }
})
