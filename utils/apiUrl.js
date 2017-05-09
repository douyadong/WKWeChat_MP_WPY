/**
 * @desc:统一定义请求接口地址
 */

const domain = 'https://m.wkzf.com'

const url = {
  'buy': {
    'getDetails': '/esf/moreList.rest?offset=10&pinyin=shanghai&_=14943219'
  }
}

module.exports = {
  get: function (module, action) {
    return `${domain}${url[module][action]}`
  }
}
