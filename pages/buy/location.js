/**
 * @desc 我要买房-位置选择页
 * @author:yuxiaochen@lifang.com
 */
let res = require('./mock').areaInfo

Page({
  data: {
    currentArea: null,
    areaList: [],
    blockList: [],
    superAreaObject: null
  },
  onLoad: function (options) {
    let that = this
    let index = 0,superAreaObject = {},district_array = [],selectedBlockList = []

    // todo:请求接口获取接口地址
    this.convertData(res.data)

    // 获取已选择的位置信息
    selectedBlockList = wx.getStorageSync('buy_location')
    superAreaObject = this.data.superAreaObject

    selectedBlockList.forEach(oBlock1 => {
      that.data.blockList.forEach(oBlock2 => {
        if (oBlock1.id == oBlock2.id) {
          superAreaObject[oBlock2.pid + '_blocks'].push(oBlock2.id)
          superAreaObject[oBlock2.pid]++
          if (superAreaObject[oBlock2.pid + '_count'] == superAreaObject[oBlock2.pid]) {
            district_array.push({ id: oBlock2.pid, townName: oBlock2.pName })
          }
        }
      })
    })

    

    // this.data.areaInfo.forEach(oArea => {
    //   oArea.selectedBlocks=superAreaObject[oArea.id + '_blocks'];

    // })

    console.log(district_array)
    console.log(this.data.areaList)
    console.log(this.data.blockList)
    console.log(this.data.superAreaObject)
  },
  choose: function (e) {},
  convertData: function (data) {
    let that = this
    let superAreaObject = {}
    let areaList = [],blockList = []

    data.forEach(oData => {
      let oArea = {}
      oArea.id = oData.id
      oArea.name = oData.name
      oArea.subList = that.genBlockList(oData.subList, oData.id, oData.name)
      oArea.count = oArea.subList.length
      areaList.push(oArea)
    })

    // get all block list and make superAreaObject
    areaList.forEach(oData => {
      superAreaObject[oData.id] = 0
      superAreaObject[oData.id + '_count'] = oData.count
      superAreaObject[oData.id + '_blocks'] = []
      oData.subList.forEach(oBlock => {
        blockList.push(oBlock)
      })
    })

    this.data.areaList = areaList
    this.data.blockList = blockList
    this.data.superAreaObject = superAreaObject
  },
  genBlockList: function (originData, pid, pName) {
    let blockList = [],tmpList = []

    originData.forEach(oBlock => {
      if (oBlock.towns && oBlock.towns.length) {
        oBlock.towns.forEach(oTown => {
          tmpList.push(oTown)
        })
      }
    })

    tmpList.forEach(oData => {
      let oBlock = {}
      oBlock.pid = pid
      oBlock.pName = pName
      oBlock.id = oData.id
      oBlock.name = oData.name
      blockList.push(oBlock)
    })

    return blockList
  },
  submit: function () {
    wx.navigateTo({url: '/pages/buy/features'})
  }
})
