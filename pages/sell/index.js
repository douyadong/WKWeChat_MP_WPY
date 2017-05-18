//index.js
var util = require('../../utils/util.js')
Page({
    data: {},
    call: function() {
        wx.makePhoneCall({
            phoneNumber: '400-821-5365' //仅为示例，并非真实的电话号码
        })
    },
     onShareAppMessage: function() {
        return {
            title: '买房卖房，找好经纪人就对了！'
        }
    },
    onLoad: function() {

    }
})
