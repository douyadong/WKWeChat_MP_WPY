/**
 * @desc 我要买房-价格选择
 */
Page({
  data: {
    items: [{
      id: '1',
      text: '100万以下',
      min: 0,
      max: 100,
      selected: false
    }, {
      id: '2',
      text: '100-150万',
      min: 100,
      max: 150,
      selected: false
    }, {
      id: '3',
      text: '150-200万',
      min: 150,
      max: 200,
      selected: false
    }, {
      id: '4',
      text: '200-250万',
      min: 200,
      max: 250,
      selected: false
    }, {
      id: '5',
      text: '250-300万',
      min: 250,
      max: 300,
      selected: false
    }, {
      id: '6',
      text: '300-500万',
      min: 300,
      max: 500,
      selected: false
    }, {
      id: '7',
      text: '500-1000万',
      min: 500,
      max: 1000,
      selected: false
    }, {
      id: '8',
      text: '1000-2000万',
      min: 1000,
      max: 2000,
      selected: false
    }, {
      id: '9',
      text: '2000万以上',
      min: 2000,
      max: 0,
      selected: false
    }, {
      id: '0',
      text: '不限',
      min: 0,
      max: 0,
      selected: false
    }],
    currentPrice: 0
  },
  onLoad: function () {
    let priceId = wx.getStorageSync('buy_price') || 0

    this.data.items.forEach(item => {
      if (item.id == priceId) {
        item.selected = true
      }
    })

    this.setData({currentPrice: priceId})
    this.setData({items: this.data.items})
  },
  choose: function (event) {
    this.resetData()

    let tmpObj = this.data.items[event.target.dataset.index]
    tmpObj.selected = true

    this.data.currentPrice = tmpObj.id

    this.setData({
      items: this.data.items
    })
  },
  submit: function (event) {
    wx.setStorageSync('buy_price', this.data.currentPrice)
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
