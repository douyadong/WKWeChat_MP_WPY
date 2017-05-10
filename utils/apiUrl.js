/**
 * @desc:统一定义请求接口地址
 */

const domain = 'https://m.wkzf.com'

const url = {
  'buy': {
    'getDetails': '/esf/moreList.rest?offset=10&pinyin=shanghai&_=14943219'
  },
  'estate':{
    'zan':'/wxmpEstate/upOrDownEstateComment.rest',
    'detail':'/wxmpEstate/estateDetail.rest'
  }
}

module.exports = {
  get: function (module, action) {
    return `${domain}${url[module][action]}`
  }
}
