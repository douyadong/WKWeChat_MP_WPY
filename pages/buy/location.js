/**
 * @desc 我要买房-位置选择页
 * @author:yuxiaochen@lifang.com
 */
let res = require('./mock').areaInfo
let interestInfo = require('./mock').interestInfo

Page({
  data: {
    currentArea: {},
    areaList: [],
    blockList: [],
    superAreaObject: null
  },
  onLoad: function (options) {
    let that = this
    let matchIndexArray = []

    wx.setStorageSync('buy_location', interestInfo.data.townIdLists)

    // todo:请求接口获取接口地址
    this.convertData(res.data)

    // selectedBlockList.forEach(oBlock1 => {
    //   that.data.blockList.forEach(oBlock2 => {
    //     if (oBlock1.id == oBlock2.id) {
    //       if (!matchIndexArray.includes(oBlock2.pIndex)) {
    //         matchIndexArray.push(oBlock2.pIndex)
    //       }
    //       oBlock2.selected = true
    //     superAreaObject[oBlock2.pid + '_blocks'].push(oBlock2.id)
    //     superAreaObject[oBlock2.pid]++
    //     if (superAreaObject[oBlock2.pid + '_count'] == superAreaObject[oBlock2.pid]) {
    //       district_array.push({ id: oBlock2.pid, townName: oBlock2.pName })
    //     }
    //     }
    //   })
    // })
    matchIndexArray = this.getMatchIndexArray()
    this.setArea(matchIndexArray)
    this.setBlock()

    console.log(matchIndexArray)
    console.log(that.data.currentArea)
    console.log(this.data.areaList)
    console.log(this.data.blockList)
    console.log(this.data.superAreaObject)
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

    blockList.push({
      pid: '0',
      pIndex: '',
      pName: '',
      id: '0',
      name: '不限'
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
  getMatchIndexArray: function () {
    let that = this
    let matchIndexArray = []
    let selectedBlockList = wx.getStorageSync('buy_location')
    let superAreaObject = this.data.superAreaObject

    selectedBlockList.forEach(oBlock1 => {
      that.data.blockList.forEach(oBlock2 => {
        if (oBlock1.id == oBlock2.id) {
          if (!matchIndexArray.includes(oBlock2.pIndex)) {
            matchIndexArray.push(oBlock2.pIndex)
          }
          oBlock2.selected = true
          superAreaObject[oBlock2.pid]++
        }else {
          oBlock2.selected = false
        }
      })
    })

    return matchIndexArray
  },
  setArea: function (indexArray) {
    let that = this
    let matchIndexArray = indexArray.sort()
    let activeIndex = matchIndexArray[0]
    this.data.areaList.forEach(oArea => {
      indexArray.forEach(item => {
        if (oArea.index == item) {
          oArea.selected = true
        }

        if (oArea.index == activeIndex) {
          oArea.active = true
          that.data.currentArea = oArea
        }
      })
    })

    this.setData({'areaList': this.data.areaList})
  },
  setBlock: function () {
    let that = this
    let currentArea = this.data.currentArea
    let unlimitedBlock = this.data.blockList[0]
    let filtered = []

    filtered = this.data.blockList.filter(item => {
      return item.pid == currentArea.id && item.selected
    })

    that.data.blockList.forEach(item => {
      if (item.id != '0' /*不限*/) {
        if (item.pid == that.data.currentArea.id) {
          item.hidden = false
        }else {
          item.hidden = true
        }
      }else {
        item.hidden = false
      }
    })

    if (filtered.length == currentArea.subList.length) {
      unlimitedBlock.selected = true
      filtered.forEach(item => {
        item.selected = false
      })
    }

    this.setData({blockList: this.data.blockList})
  },
  chooseBlock: function (e) {
    let count = 0,filtered = []
    let currentArea = this.data.currentArea
    let currentBlock = this.data.blockList[e.currentTarget.dataset.index]
    let unlimitedBlock = this.data.blockList[0]

    currentBlock.selected = !currentBlock.selected
    if (currentBlock.id != '0' /*不限*/) {
      // 获取已选中的block
      filtered = this.data.blockList.filter(item => {
        return item.pid == currentArea.id && item.selected
      })

      if (currentBlock.selected) {
        if (filtered.length == currentArea.subList.length) {
          filtered.forEach(item => {
            item.selected = false
          })
          unlimitedBlock.selected = true
        }else {
          unlimitedBlock.selected = false
        }
        this.data.areaList[currentArea.index].selected = true
      }else {
        if (filtered.length == 0) {
          this.data.areaList[currentArea.index].selected = false
        }
      }
    }else {
      if (currentBlock.selected) {
        this.data.blockList.forEach(item => {
          if (currentArea.id == item.pid) {
            item.selected = false
          }
        })
        this.data.areaList[currentArea.index].selected = true
      }else {
        this.data.areaList[currentArea.index].selected = false
      }
    }

    this.setData({'areaList': this.data.areaList})
    this.setData({'blockList': this.data.blockList})
  },
  chooseArea: function (e) {
    let that = this
    let pid = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index

    this.data.areaList.forEach(item => {
      if (item.index == index) {
        that.data.currentArea = item
        item.active = true
      }else {
        item.active = false
      }
    })

    this.setData({'areaList': this.data.areaList})

    this.setBlock()

    console.log(this.data.blockList[17].selected)
  },
  submit: function (e) {
    let id=e.currentTarget.dataset.id;

    wx.navigateTo({url: '/pages/buy/features'})
  }
})
