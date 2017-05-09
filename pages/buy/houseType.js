/**
 * @desc 我要买房-户型选择
 */
Page({
  data: {
    items: [{
      id: '1',
      text: '一室',
      selected: false
    }, {
      id: '2',
      text: '二室',
      selected: false
    }, {
      id: '3',
      text: '三室',
      selected: false
    }, {
      id: '4',
      text: '四室',
      selected: false
    }, {
      id: '5',
      text: '五室及以上',
      selected: false
    }, {
      id: '0',
      text: '不限',
      selected: false
    }],
    currentHouseType: 0
  },
  onLoad: function () {
    let houseTypeId = wx.getStorageSync('buy_houseType') || 0

    this.data.items.forEach(item => {
      if (item.id == houseTypeId) {
        item.selected = true
      }
    })

    this.setData({currentHouseType: houseTypeId})
    this.setData({items: this.data.items})
  },
  choose: function (event) {
    this.resetData()

    let tmpObj = this.data.items[event.target.dataset.index-1]
    tmpObj.selected = true

    this.data.currentHouseType = tmpObj.id

    this.setData({
      items: this.data.items
    })
  },
  submit: function (event) {
    wx.setStorageSync('buy_houseType', this.data.currentHouseType)
    wx.navigateBack({url: '/pages/buy/index'})
  },
  resetData: function () {
    var that = this

    this.data.items.forEach(function (element) {
      element.selected = false
    })

    this.setData({
      items: this.data.items
    })
  }
})
