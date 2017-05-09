/**
 * @desc:悟空找房-请求帮助类
 * @author:yuxiaochen@lifang.com
 */

const apiUrl = require('./apiUrl')

module.exports = {
  /**
   * @param  {} module 模块名
   * @param  {} action 功能名
   * @param  {} showBarLoading 页面顶部是否显示导航条加载动画
   * @param  {} showLoading=false 是否显示加载中动画
   * @param  {} showTitle 加载中提示文案
   * @param  {} showMask  加载是否显示遮罩层
   * @param  {} method  请求方法，默认为'GET'
   * @param  {} dataType='json' 默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
   * @param  {} success 请求成功的回调函数
   * @param  {} fail 请求失败的回调函数
   * @param  {} complete  请求执行的finally 函数
   */
  fetch: function ({module, action, showBarLoading=true, showLoading=false, showTitle='数据加载中...', showMask=false, method='GET', data,dataType='json', success, fail, complete}) {
    let url = apiUrl.get(module, action)

    showBarLoading && wx.showNavigationBarLoading()

    if (showLoading) {
      wx.showLoading({
        title: showTitle,
        mask: showMask
      })
    }

    wx.request(
      {
        url,
        method,
        data,
        dataType,
        success: function (res) {
          if (res.statusCode == '200' && res.data.status == '1') {
            typeof success == 'function' && success(res.data)
          }else {
            typeof fail == 'function' && fail(res.data)
          }
        },
        fail: function (error) {
          console.error(error)
        },
        complete: function () {
          showBarLoading && wx.hideNavigationBarLoading()
          showLoading && wx.hideLoading()
          typeof complete == 'function' && complete()
        }
      })
  }
}
