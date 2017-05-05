//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
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
      },
      {
        "thumbnail":"https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      },{
        "thumbnail":"https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      },{
        "thumbnail":"https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      },{
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
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
