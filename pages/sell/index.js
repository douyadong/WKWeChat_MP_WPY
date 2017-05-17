//index.js
var util = require('../../utils/util.js')
Page({
    data: {},
    call: function() {
        wx.makePhoneCall({
            phoneNumber: '400-821-5365' //仅为示例，并非真实的电话号码
        })
    },
    onLoad: function() {

    }
})
