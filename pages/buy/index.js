/**
 * @desc 我要买房-首页
 * @author:yuxiaochen@lifang.com
 */

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
    },
      {
        id: '-1',
        text: '请选择总价范围',
        min: -1,
        max: -1
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
    },
      {
        id: '',
        text: '请选择户型'
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
      id: '-1',
      min: '-1',
      max: '-1',
      text: '请选择总价范围'
    },
    currentHouseType: {
      id: '',
      text: '请选择户型'
    },
    areaList: [],
    blockList: [],
    superAreaObject: null,
    currentHouseFeatures: [],
    currentLocationStr: '',
    loaded: false,
    tips: {
      show: false
    }
  },
  onLoad: function (options) {
    let that = this

    // clear buy localStorge
    wx.removeStorageSync('buy_price')
    wx.removeStorageSync('buy_houseType')
    wx.removeStorageSync('buy_location')

    // 判断用户是否登录
    if (!appInstance.isLogin(false)) {
      // 未登录初始化选择项信息
      that.setPrice(-1, -1)
      that.setHouseType('')
      that.setLocation([])
    }else {
      // get data
      this.getData(function (res) {
        let data = res.data

        if (data) {
          // 价格信息
          that.setPrice(data.startPrice, data.endPrice)

          // 户型信息
          that.setHouseType(data.bedRoomSum)

          // 位置信息
          that.setLocation(data.townList)

          // 房源特色信息
          that.setHouseFeatures(data.cusHouseFeatures)
        }else {
          that.setPrice(-1, -1)
          that.setHouseType('')
          that.setLocation([])
        }
      })
    }

    this.data.loaded = true
  },
  onShow: function () {
    let that = this
    let price = wx.getStorageSync('buy_price')
    let houseTypeId = wx.getStorageSync('buy_houseType')
    let selectedBlockList = wx.getStorageSync('buy_location')

    if (!this.data.loaded) {
      let that = this
      let price = wx.getStorageSync('buy_price')
      let houseTypeId = wx.getStorageSync('buy_houseType')
      let selectedBlockList = wx.getStorageSync('buy_location')

      this.setPrice(price.min, price.max)

      this.setHouseType(houseTypeId)

      this.setLocation(selectedBlockList)
    }
  },
  onHide: function () {},
  handleRedirect: function (e) {
    this.data.loaded = false
    wx.navigateTo({url: e.currentTarget.dataset.url})
  },
  setPrice: function (startPrice, endPrice) {
    let that = this

    this.data.prices.forEach(item => {
      if (item.min == startPrice && item.max == endPrice) {
        this.data.currentPrice = item
        wx.setStorageSync('buy_price', item)
        that.setData({'currentPrice': that.data.currentPrice})
      }
    })
  },
  setHouseType: function (bedRoomSum) {
    let that = this

    this.data.houseTypes.forEach(item => {
      if (item.id == bedRoomSum) {
        that.data.currentHouseType = item
        wx.setStorageSync('buy_houseType', item.id)
        that.setData({'currentHouseType': that.data.currentHouseType})
      }
    })
  },
  setLocation: function (townList) {
    let that = this
    let locationStr,location = []

    let areaInfo = wx.getStorageSync('cityInfo')

    this.data.allCheckedAreas = []

    // 转换data
    this.convertData(areaInfo)

    if (townList && townList.length) {
      this.data.blockList.forEach(oBlock1 => {
        townList.forEach(oBlock2 => {
          if ((oBlock1.id == oBlock2.townId) || (oBlock1.id == oBlock2.id)) {
            oBlock1.selected = true
            that.data.superAreaObject[oBlock1.pid]++
            if (that.data.superAreaObject[oBlock1.pid + '_count'] == that.data.superAreaObject[oBlock1.pid]) {
              location.push(oBlock1.pName)
              that.data.allCheckedAreas.push(oBlock1.pid)
            }
          }
        })
      })

      this.data.blockList.forEach(oBlock => {
        if (!that.data.allCheckedAreas.includes(oBlock.pid) && oBlock.selected) {
          location.push(oBlock.name)
        }
      })

      locationStr = location.join('、')
      if (locationStr.length >= 15) {
        locationStr = locationStr.substr(0, 15)
        if (locationStr[locationStr.length - 1] == '、') {
          locationStr = locationStr.substr(0, locationStr.length - 1)
        }
        locationStr += ' ...'
      }

      this.setData({'currentLocationStr': locationStr })
    }

    wx.setStorageSync('buy_location', townList)
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
  convertData: function (data) {
    let that = this
    let superAreaObject = {}
    let areaList = [],blockList = [],index = 0

    data.forEach(oData => {
      let oArea = {}
      oArea.id = oData.id
      oArea.index = index
      oArea.name = oData.name
      oArea.subList = that.genBlockList(oData.subList, index, oData.id, oData.name)
      oArea.count = oArea.subList.length
      areaList.push(oArea)
      index++
    })

    // get all block list and make superAreaObject
    areaList.forEach(oData => {
      superAreaObject[oData.id] = 0
      superAreaObject[oData.id + '_count'] = oData.count
      oData.subList.forEach(oBlock => {
        blockList.push(oBlock)
      })
    })

    this.data.areaList = areaList
    this.data.blockList = blockList
    this.data.superAreaObject = superAreaObject
  },
  genBlockList: function (originData, pIndex, pid, pName) {
    let blockList = []

    originData.forEach(oBlock => {
      if (oBlock.towns && oBlock.towns.length) {
        oBlock.towns.forEach(oTown => {
          let oBlock = {}
          oBlock.pid = pid
          oBlock.pIndex = pIndex
          oBlock.pName = pName
          oBlock.id = oTown.id
          oBlock.name = oTown.name
          oBlock.selected = false
          oBlock.hidden = true
          blockList.push(oBlock)
        })
      }
    })

    return blockList
  },
  chooseHouseFeature: function (event) {
    let tmpFeature = this.data.houseFeatures[event.target.dataset.index]
    tmpFeature.selected = !tmpFeature.selected

    this.setData({'houseFeatures': this.data.houseFeatures})
  },
  getData: function (callback) {
    let cityId = wx.getStorageSync('geography').cityId
    let guestId = wx.getStorageSync('userInfo').guestId

    request.fetch({
      'module': 'buy',
      'action': 'getDetails',
      'data': {
        'guestId': guestId,
        'cityId': cityId
      },
      'showLoading': true,
      success: function (res) {
        callback(res)
      }
    })
  },
  submit: function () {
    let that = this
    let guestId,bedRoomSum,sellPriceStart,sellPriceEnd,townIdStr
    let houseFeatureLists = [],townIdList = [],districtIdList = []
    let requestData = {}

    if (that.data.currentPrice.min == '-1') {
      appInstance.showTips('请选择总价范围')
      return false
    }

    if (!that.data.currentHouseType.id) {
      appInstance.showTips('请选择户型')
      return false
    }

    if (!that.data.currentLocationStr) {
      appInstance.showTips('请选择位置')
      return false
    }

    // 判断是否登录
    appInstance.isLogin(true, '', 'back')

    // 构造请求数据
    requestData.guestId = wx.getStorageSync('userInfo').guestId
    requestData.cityId = wx.getStorageSync('geography').cityId
    requestData.sellPriceStart = this.data.currentPrice.min
    requestData.sellPriceEnd = this.data.currentPrice.max
    requestData.bedRoomSum = this.data.currentHouseType.id

    if (this.data.allCheckedAreas.length) {
      requestData.districtIdList = this.data.allCheckedAreas
    }

    this.data.blockList.forEach(item => {
      if (item.selected) {
        townIdList.push(item.id)
      }
    })

    requestData.townIdList = townIdList

    this.data.houseFeatures.forEach(item => {
      if (item.selected) {
        houseFeatureLists.push(item.id)
      }
    })

    if (houseFeatureLists.length) {
      requestData.houseFeatureLists = houseFeatureLists
    }

    // make request
    request.fetch({
      module: 'buy',
      action: 'edit',
      data: JSON.stringify(requestData),
      method: 'post',
      success: function (res) {
        if (res.data && res.data.orderAgentIdList && res.data.orderAgentIdList.length) {
          wx.redirectTo({
            url: '/pages/buy/recommend'
          })
        }else {
          wx.redirectTo({
            url: '/pages/buy/success'
          })
        }
      }
    })
  }
})
