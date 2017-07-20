//index.js
var util = require('../../utils/util.js')
var bigData = require('../../utils/bigData');
Page({
    data: {},
    call: function(e) {
        this.bigData(e);

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
      bigData.send({
        "pageName":"1132"
      });
    },
    bigData:function(event){
      bigData.send(event.currentTarget.dataset);
    }
})
