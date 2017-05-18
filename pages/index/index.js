// 工具方法
let _ = require('../../utils/extend.js')
var request = require('../../utils/request.js')
// 筛选区域脚本
let filterAgentList = require('./filterAgentList/filterAgentList.js')
let util = require('../../utils/util.js')
// 写入一个唯一标识符
if (wx.getStorageSync('device') == '') {
  wx.setStorageSync('device', util.guid())
}
// ////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 根据经纬度获取地理定位
 */
var getGeography = function () {
  let defineGeography = {
    'cityId': 43,
    'cityName': '上海市',
    'districtId': 45,
    'townId': null,
    'cityPinyin': 'shanghaishi'
  }
  return new Promise(function (resolve, reject) {
    // 地理定位
    wx.getLocation({
      type: 'wgs84',
      success: function (res) { // 地理定位成功，获取经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // 根据精度纬度，获取当前所在的城市信息
        request.fetch({
          mock: !true,
          module: 'index',
          action: 'findCityInfoByLonAndLat',
          data: {
            lon: longitude,
            lat: latitude
          },
          success: function (data) { // 获取城市信息成功
            if (data.status.toString() == '1' && data.data != null) {
              wx.setStorage({
                key: 'location',
                data: data.data
              })
              resolve(data.data)
            }else {
              resolve(defineGeography)
            }
          },
          fail: function () { // 获取城市信息失败
            resolve(defineGeography)
          }
        })
      },
      fail: function () { // 用户取消地理定位
        resolve(defineGeography)
      }
    })
  })
}
/**
 * 根据城市id获取详细信息
 */
var getCityBusinessById = function (cityId) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'index',
      action: 'getCityBusinessById',
      data: {
        cityId: cityId
      },
      success: function (data) { // 获取城市信息成功
        console.log(data)
        if (data.status.toString() == '1' && data.data != null) {
          resolve(data.data)
        }else {
          // 使用地理定位的信息
          getGeography().then((data) => {
            resolve(data)
          })
        }
      },
      fail: function () { // 获取城市信息失败
        // 使用地理定位的信息
        getGeography().then((data) => {
          resolve(data)
        })
      }
    })
  })
}
/**
 * 获取经纪人列表
 */
var getAgentList = function (cityId, districtAndTown, orderType, selectLabel, pageIndex) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'index',
      action: 'searchAgentList',
      data: {
        'cityId': cityId, // 城市主键
        'districtAndTown': districtAndTown, // 选中区域拼音。区域选的如果是不限，就传当前城市
        'orderType': orderType, // 排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
        'selectLabel': selectLabel, // 1.好经纪人 2.客户热评 3.推荐房源数量多
        'pageIndex': pageIndex, // 起始条数 默认从0开始
        'pageSize': 20, // 每页数量 默认20条
        'device': wx.getStorageSync('device')
      },
      success: function (data) {
        if (data.status.toString() == '1' && data.data != null && data.data.agentList != null && data.data.agentList.length > 0) {
          resolve(data.data.agentList)
        }else {
          resolve([])
        }
      },
      fail: function () {
        resolve([])
      }
    })
  })
}

// 添加微信用户到公司数据库
var addOpenUser = function (encryptedData, iv, code) {
  return new Promise(function (resolve, reject) {
    request.fetch({
      mock: !true,
      module: 'logon',
      action: 'addOpenUser',
      data: {
        encryptedData: encryptedData,
        iv: iv,
        code: code
      },
      success: function (data) {
        if (data.status.toString() == '1') {
          resolve('添加用户信息成功')
        }else {
          resolve('添加用户信息失败')
        }
      },
      fail: function (params) {
        resolve('添加用户信息失败')
      }
    })
  })
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// 获取应用实例
let app = getApp()
let main = {
  data: {
    // 地理位置信息
    geography: {
      'cityId': 43,
      'cityName': '上海市',
      'districtId': 45,
      'townId': null,
      'cityPinyin': 'shanghaishi'
    },
    // 经纪人列表
    agentList: [],
    // 获取经纪人列表的筛选条件
    districtAndTown: '', // 选中区域拼音
    orderType: 1, // 排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
    selectLabel: -1, // 更多：-1.不限 1.好经纪人 2.客户热评 3.推荐房源数量多
    pageIndex: 0, // 起始条数 默认从0开始
    isScrollIng: true, // 是否可以滚动
    onAgentList: false // 是否有经纪人列表
  },
  onShareAppMessage: function () {},
  // 根据城市id获取区域信息
  getCityAreasInfo(cityId) {
    let _this = this
    // 根据城市id，获取区域数据
    request.fetch({
      mock: !true,
      module: 'index',
      action: 'getCityAreasInfo',
      data: {
        cityId: cityId,
        houseType: 0 // 0表示不区分新房和二手房1新房2二手房3租房
      },
      success: function (data) {
        // console.log(data)
        _this.filterAgentListInit(data.data)
        wx.setStorage({
          key: 'cityInfo',
          data: data.data
        })
      },
      fail: function (params) {
        _this.filterAgentListInit([])
        wx.setStorage({
          key: 'cityInfo',
          data: []
        })
      }
    })
  },
  // 获取用户信息
  getUserInfo() {
    var that = this
    wx.login({
      success: function (res) {
        let code = res.code
        console.log(code)
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            console.log(res)
            wx.setStorage({
              key: 'userAuthorizedInfo',
              data: res
            })
            addOpenUser(res.encryptedData, res.iv, code).then((data) => {
              console.log(data)
            })
          }
        })
      }
    })
  },
  getAgentList: getAgentList,
  onLoad(options) {
    let _this = this
    // 判断是否选择了城市
    if (options.cityid == undefined) { // 说明没有没选择城市，调用地理定位获取
      // 根据经纬度，获取地理定位信息
      getGeography().then((data) => {
        // 更新地理信息状态
        _this.setData({
          geography: data
        })
        // 把成功后的地理位置信息写入本地
        wx.setStorage({
          key: 'geography',
          data: data
        })
        // 根据定位的地理信息，获取区域信息
        _this.getCityAreasInfo(_this.data.geography.cityId)
        if (options.districtAndTown == undefined) {
          // 设置区域
          _this.setData({
            districtAndTown: ''
          })
        }else {
          // 设置区域
          _this.setData({
            districtAndTown: options.districtAndTown
          })
        }
        // 获取经纪人
        _this.getAgentList(
          _this.data.geography.cityId,
          _this.data.districtAndTown,
          _this.data.orderType,
          _this.data.selectLabel,
          0
        ).then((agentList) => {
          _this.setData({
            agentList: agentList,
            pageIndex: 20
          })
        })
      })
    }else { // 说明用户选择的是具体的城市
      // 根据城市id获取地理位置定位信息
      getCityBusinessById(options.cityid).then((data) => {
        // 更新地理信息状态
        _this.setData({
          geography: data
        })
        // 把成功后的地理位置信息写入本地
        wx.setStorage({
          key: 'geography',
          data: data
        })
        // 根据定位的地理信息，获取区域信息
        _this.getCityAreasInfo(_this.data.geography.cityId)
        // 设置区域
        _this.setData({
          districtAndTown: ''
        })
        // 获取经纪人
        _this.getAgentList(
          _this.data.geography.cityId,
          _this.data.districtAndTown,
          _this.data.orderType,
          _this.data.selectLabel,
          0
        ).then((agentList) => {
          _this.setData({
            agentList: agentList,
            pageIndex: 20
          })
        })
      })
    }
    // 获取用户信息
    _this.getUserInfo()
  },
  // 滚动到底部异步加载经纪人列表
  // onReachBottom(){
  scrolltolower() {
    let _this = this

    if (_this.data.isScrollIng) {
      _this.setData({
        isScrollIng: false
      })
      // 获取经纪人
      _this.getAgentList(
        _this.data.geography.cityId,
        _this.data.districtAndTown,
        _this.data.orderType,
        _this.data.selectLabel,
        _this.data.pageIndex
      ).then((agentList) => {
        if (agentList.length == 0) {
          wx.showToast({
            title: '没有数据啦',
            icon: 'success',
            duration: 1000
          })
        }else {
          let oldAgentList = _this.data.agentList
          for (let i = 0;i < agentList.length;i++) {
            oldAgentList.push(agentList[i])
          }
          _this.setData({
            agentList: oldAgentList,
            isScrollIng: true,
            pageIndex: _this.data.pageIndex + 20
          })
        }
      })
    }
  },
  goBuy(e) {
    let url = e.currentTarget.dataset.url

    // 未登录跳转至 /pages/buy/index
    if (!app.isLogin(false)) {
      wx.navigateTo({
        url: '/pages/buy/index'
      })
    }else {
      let cityId = wx.getStorageSync('geography').cityId
      let guestId = wx.getStorageSync('userInfo').guestId

      request.fetch({
        'module': 'buy',
        'action': 'getDetails',
        'data': {
          'guestId': guestId,
          'cityId': cityId
        },
        'showBarLoading': false,
        'showLoading': false,
        success: function (res) {
          if (res.data && res.data.orderAgentIdList && res.data.orderAgentIdList.length) {
            wx.navigateTo({
              url: '/pages/buy/recommend'
            })
          }else {
            wx.navigateTo({
              url: '/pages/buy/index'
            })
          }
        }
      })
    }
  }
}
Page(_.extend(true, main, filterAgentList))
