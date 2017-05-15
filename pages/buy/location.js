/**
 * @desc 我要买房-位置选择页
 * @author:yuxiaochen@lifang.com
 */

const appInstance = getApp()

Page({
  data: {
    currentArea: {},
    areaList: [],
    blockList: [],
    superAreaObject: null,
    tips: {
      show: false
    }
  },
  onShow: function (options) {
    let that = this
    let matchIndexArray = []
    
    let areaInfo=wx.getStorageSync('cityInfo');

    this.convertData(areaInfo)

    matchIndexArray = this.getMatchIndexArray()
    this.setArea(matchIndexArray)
    this.setBlock()
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
    let matchIndexArray = [],allCheckedAreas = []
    let selectedBlockList = wx.getStorageSync('buy_location')
    let superAreaObject = this.data.superAreaObject

    if (!selectedBlockList || !selectedBlockList.length) {
      return null
    }

    this.data.blockList.forEach(oBlock1 => {
      selectedBlockList.forEach(oBlock2 => {
        if (oBlock1.id == oBlock2.townId) {
          if (!matchIndexArray.includes(oBlock1.pIndex)) {
            matchIndexArray.push(oBlock1.pIndex)
          }
          oBlock1.selected = true
          superAreaObject[oBlock1.pid]++
          if (superAreaObject[oBlock1.pid + '_count'] == superAreaObject[oBlock1.pid]) {
            allCheckedAreas.push(oBlock1.pIndex)
          }
        }
      })
    })

    allCheckedAreas.forEach(item => {
      that.data.areaList[item].allChecked = true
    })

    return matchIndexArray
  },
  setArea: function (indexArray) {
    let that = this

    if (indexArray) {
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
    }else {
      that.data.currentArea = this.data.areaList[0]
      this.data.areaList[0].active = true
    }

    this.setData({'areaList': this.data.areaList})
  },
  setBlock: function () {
    let that = this
    let currentArea = this.data.currentArea
    let unlimitedBlock = this.data.blockList[0]
    let filtered = []
    let selectedBlockList = wx.getStorageSync('buy_location')

    filtered = this.data.blockList.filter(item => {
      return item.pid == currentArea.id && (item.selected || item.active)
    })

    this.data.blockList.forEach(oBlock1 => {
      if (oBlock1.id != '0' /*不限*/) {
        if (oBlock1.pid == that.data.currentArea.id) {
          oBlock1.hidden = false
        }else {
          oBlock1.hidden = true
        }
      }else {
        oBlock1.hidden = false
      }
    })

    if (currentArea.allChecked) {
      unlimitedBlock.selected = true
      filtered.forEach(item => {
        item.selected = false
      })
    }else {
      unlimitedBlock.selected = false
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
          this.data.areaList[currentArea.index].allChecked = true
        }else {
          unlimitedBlock.selected = false
          this.data.areaList[currentArea.index].allChecked = false
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
        this.data.areaList[currentArea.index].allChecked = true
        this.data.areaList[currentArea.index].selected = true
      }else {
        this.data.areaList[currentArea.index].allChecked = false
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
  },
  submit: function (e) {
    let towns = []
    let areaList = this.data.areaList
    let blockList = this.data.blockList

    let allCheckedAreas = areaList.map(item => {
      if (item.allChecked) {
        return item.id
      }else {
        return ''
      }
    })

    areaList.forEach(item => {
      if (item.allChecked) {
        item.subList.forEach(oTown => {
          towns.push({
            id: oTown.id,
            townName: oTown.name
          })
        })
      }
    })

    blockList.forEach(oBlock => {
      if (!allCheckedAreas.includes(oBlock.pid) && oBlock.selected) {
        towns.push({
          townId:oBlock.id,
          id: oBlock.id,
          townName: oBlock.name
        })
      }
    })

    if (!towns.length) {
      appInstance.showTips('请选择位置')
      return false
    }

    wx.setStorageSync('buy_location', towns)

    wx.navigateBack({url: '/pages/buy/index'})
  }
})
