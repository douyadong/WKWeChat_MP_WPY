/**
 * @desc:悟空找房小程序-请求方法定义
 * @author:yuxiaochen@lifang.com
 */

const apiUrl = require('./apiUrl')
const appInstance=getApp();

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
  fetch: function ({module, action, showBarLoading=true, showLoading=false, showTitle='加载中...', showMask=false, method='GET', data,dataType='json', success, fail, complete,mock=false}) {
    let url = apiUrl.get(module, action)

    showBarLoading && wx.showNavigationBarLoading()
    
    if (showLoading) {
      wx.showToast({
        icon:'loading',
        title:showTitle,
        duration:100000
      })
    }

    if(mock){
      var data = require(`../mock/${module}/${action}.js`);
      success(data);
      showBarLoading && wx.hideNavigationBarLoading()
      showLoading && wx.hideToast();
      return;
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
          showLoading && wx.hideToast();
          typeof complete == 'function' && complete()
        }
      })
  }
}
