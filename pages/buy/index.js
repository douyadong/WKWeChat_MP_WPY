// logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    prices: [{
      id: '1',
      text: '100万以下',
      min: 0,
      max: 100
    }, {
      id: '2',
      text: '100-150万',
      min: 100,
      max: 150
    }, {
      id: '3',
      text: '150-200万',
      min: 150,
      max: 200
    }, {
      id: '4',
      text: '200-250万',
      min: 200,
      max: 250
    }, {
      id: '5',
      text: '250-300万',
      min: 250,
      max: 300
    }, {
      id: '6',
      text: '300-500万',
      min: 300,
      max: 500
    }, {
      id: '7',
      text: '500-1000万',
      min: 500,
      max: 1000
    }, {
      id: '8',
      text: '1000-2000万',
      min: 1000,
      max: 2000
    }, {
      id: '9',
      text: '2000万以上',
      min: 2000,
      max: 0
    }, {
      id: '0',
      text: '不限',
      min: 0,
      max: 0
    }],
    houseTypes: [{
      id: '1',
      text: '一室'
    }, {
      id: '2',
      text: '二室'
    }, {
      id: '3',
      text: '三室'
    }, {
      id: '4',
      text: '四室'
    }, {
      id: '5',
      text: '五室及以上'
    }, {
      id: '0',
      text: '不限'
    }],
    houseFeatures: [{
      id: 10,
      type: 'Subway',
      text: '地铁房',
      selected: false
    }, {
      id: 20,
      type: 'School',
      text: '近学校',
      selected: false
    }, {
      id: 30,
      type: 'South',
      text: '朝南',
      selected: false
    }, {
      id: 40,
      type: 'Elevator',
      text: '有电梯',
      selected: false
    }, {
      id: 50,
      type: 'Green',
      text: '绿化好',
      selected: false
    }, {
      id: 60,
      type: 'Parking',
      text: '有停车位',
      selected: false
    }],
    currentPrice: {
      id: '0',
      min: '0',
      max: '0',
      text: '不限'
    },
    currentHouseType: {
      id: '0',
      text: '不限'
    },
    currentHouseFeatures: [],
    currentLocation: ''
  },
  onLoad: function () {
    // let that = this
    // let priceId = wx.getStorageSync('buy_price')
    // let houseTypeId = wx.getStorageSync('buy_houseType')

    // this.data.houseTypes.forEach(item => {
    //   if (item.id == houseTypeId) {
    //     that.currentHouseType = item
    //   }
    // })

    // this.data.prices.forEach(item => {
    //   if (item.id == priceId) {
    //     that.currentPrice = item
    //   }
    // })

    // this.setData({'currentPrice': this.currentPrice})
    // this.setData({'currentHouseType': this.currentHouseType})
  },
  onShow: function () {
    let that = this
    let priceId = wx.getStorageSync('buy_price')
    let houseTypeId = wx.getStorageSync('buy_houseType')

    this.data.houseTypes.forEach(item => {
      if (item.id == houseTypeId) {
        that.currentHouseType = item
      }
    })

    this.data.prices.forEach(item => {
      if (item.id == priceId) {
        that.currentPrice = item
      }
    })

    this.setData({'currentPrice': this.currentPrice})
    this.setData({'currentHouseType': this.currentHouseType})
  },
  handleRedirect: function (e) {
    wx.navigateTo({url: e.target.dataset.url})
  },
  chooseHouseFeature: function (event) {
    let tmpFeature = this.data.houseFeatures[event.target.dataset.index]
    tmpFeature.selected = !tmpFeature.selected

    this.setData({'houseFeatures': this.data.houseFeatures})
  },
  getData: function (cd) {},
  clearLocation: function (event) {}
})
