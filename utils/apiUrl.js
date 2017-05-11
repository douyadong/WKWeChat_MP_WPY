/**
 * @desc:统一定义请求接口地址
 */

const domain = 'https://m.wkzf.com'

const url = {
  'agent':{
    'rateList':'/wxmpAgent/getAgentCustomerCommentList.rest',
    'getAgentInfo':'/wxmpAgent/getSimpleAgent.rest',
    'writeRate':'/wxmpAgent/commentAgent.rest',
  },
  'buy': {
    'getDetails': '/esf/moreList.rest?offset=10&pinyin=shanghai&_=14943219',
    'add':"/addInterestRecord.rest",
    'edit':'/updateInterestRecord.rest',
    'getAgentList':''
  },
  'estate':{
    'zan':'/wxmpEstate/upOrDownEstateComment.rest',
    'detail':'/wxmpEstate/estateDetail.rest',
    'sellingList':'/wxmpEstate/estateSellingHouseList.rest'
  },
  'esf':{
  	'getDetails':'/wxmpOldHouseDetail/getOldHouseDetail.rest',
    'similar':'/wxmpOldHouseDetail/getSimilarList.rest',
    'agentInfo':'/wxmpAgent/getSimpleAgent.rest'
  },
  'comment':{
    'list':'/estate/queryEstateCommentList.rest',
    'uploadImg':'/wxmpEstate/uploadPic.rest',
    'uploadComment':'/wxmpEstate/commentEstate.rest'
  }
}

module.exports = {
  get: function (module, action) {
    return `${domain}${url[module][action]}`
  }
}
