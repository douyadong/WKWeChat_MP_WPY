// pages/buy/recommend.js

const request = require('../../utils/request')
const appInstance = getApp()

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
      min: '',
      max: '',
      text: '请选择总价范围'
    },
    currentHouseType: {
      id: '',
      text: '请选择户型'
    },
    showMore: false,
    currentHouseFeatures: [],
    currentLocationStr: '',
    matchAgentList: [],
    recommenAgentList: []
  },
  onLoad: function () {
    let that = this

    // get data
    this.getData(function (res) {
      let data = res.data
      // 价格信息
      that.setPrice(data.startPrice, data.endPrice)

      // 户型信息
      that.setHouseType(data.bedRoomSum)

      // 位置信息
      that.setLocation(data.townList)

      // 房源特色信息
      that.setHouseFeatures(data.cusHouseFeatures)

      // 设置经纪人列表
      that.setAgentList(data)
    })
  },
  setPrice: function (startPrice, endPrice) {
    let that = this

    this.data.prices.forEach(item => {
      if (item.min == startPrice && item.max == endPrice) {
        this.data.currentPrice = item
        that.setData({'currentPrice': that.data.currentPrice})
      }
    })
  },
  setHouseType: function (bedRoomSum) {
    let that = this

    this.data.houseTypes.forEach(item => {
      if (item.id == bedRoomSum) {
        that.data.currentHouseType = item
        that.setData({'currentHouseType': that.data.currentHouseType})
      }
    })
  },
  setLocation: function (townList) {
    let that = this
    let locationStr,location = []

    if (townList && townList.length) {
      townList.forEach(item => {
        location.push(item.townName)
      })

      locationStr = location.join('、')

      this.setData({'currentLocationStr': locationStr })
    }
  },
  setHouseFeatures: function (featuresList) {
    let that = this

    this.data.houseFeatures.forEach(item => {
      featuresList.forEach(oFeature => {
        if (oFeature.featureId == item.id) {
          item.selected = true
        }
      })
    })

    this.setData({'houseFeatures': this.data.houseFeatures})
  },
  setAgentList: function (data) {
    let that = this

    if (data.orderAgentIdList && data.orderAgentIdList.length) {
      data.orderAgentIdList.forEach(item => {
        that.data.matchAgentList.push({
          'agentId': item.agentId,
          'agentName': item.agentName,
          'agentMobile': item.agentMobile,
          'headRoundImgUrl': item.headRoundImgUrl,
          'headRoundImgKey': item.headRoundImgKey,
          'agentBelongToCompanyName': item.agentBelongToCompanyName,
          'isWellAgent': item.isWellAgent,
          'recommandInfo': item.recommandInfo
        })
      })
      this.setData({'matchAgentList': that.data.matchAgentList})
    }

    if (data.recommendAgentIdList && data.recommendAgentIdList.length) {
      data.recommendAgentIdList.forEach(item => {
        that.data.recommenAgentList.push({
          'agentId': item.agentId,
          'agentName': item.agentName,
          'agentMobile': item.agentMobile,
          'headRoundImgUrl': item.headRoundImgUrl,
          'headRoundImgKey': item.headRoundImgKey,
          'agentBelongToCompanyName': item.agentBelongToCompanyName,
          'isWellAgent': item.isWellAgent,
          'recommandInfo': item.recommandInfo
        })
      })
      this.setData({'recommenAgentList': that.data.recommenAgentList})
    }
  },
  handleRedirect: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url})
  },
  backToHomePage: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  showMore: function () {
    this.setData({'showMore': true})
  },
  getData: function (callback) {
    let cityId = wx.getStorageSync('geography').cityId
    let guestId = wx.getStorageSync('userInfo').guestId

    request.fetch({
      'module': 'buy',
      'action': 'getDetails',
      'showLoading': true,
      'data': {
        'guestId': guestId,
        'cityId': cityId
      },
      success: function (res) {
        callback(res)
      }
    })
  },
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.text
    })
  }
})
