var util = require('../../utils/util.js');
var request = require('../../utils/request.js');
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
    changenotExist: function () {
        this.setData({
            notExist: (this.data.notExist + 1) % 2
        })
    },
    changehasSold: function () {
        this.setData({
            hasSold: (this.data.hasSold + 1) % 2
        })
    },
    changepriceNotReal: function () {
        this.setData({
            priceNotReal: (this.data.priceNotReal + 1) % 2
        })
    },
    changeimgNotReal: function () {
        this.setData({
            imgNotReal: (this.data.imgNotReal + 1) % 2
        })
    },
    changeothreReason: function () {
        this.setData({
            othreReason: (this.data.othreReason + 1) % 2
        })
    },
    listenerDesInput: function (e) {        
        this.data.memo = e.detail.value;
    },
    submit: function () {
        var requestData = {
            guestId:12323,
            houseId: this.data.houseId,
            notExist: this.data.notExist,
            hasSold: this.data.hasSold,
            priceNotReal: this.data.priceNotReal,
            imgNotReal: this.data.imgNotReal,
            otherReason: this.data.othreReason,
            memo: this.data.memo
        };
        if (requestData.notExist || requestData.hasSold || requestData.priceNotReal || requestData.imgNotReal || requestData.othreReason || requestData.memo) {
            if (requestData.memo.length <= 300) {
                request.fetch({                    
                    "module": "report",
                    "action": "write",
                    "data": requestData,
                    "success": function (data) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                });
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
    onLoad: function (options) {
        /**
         * options中需要houseId
         */
        this.setData(options);
    }
})
