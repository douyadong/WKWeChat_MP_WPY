/**
 * @desc: 统一定义跳转页面方法，规避小程序对于5级页面跳转的限制
 * @author: yuxiaochen@lifang.com
 */

const app = getApp()

module.exports = function go2Page (opts) {
  if (!opts) return
  if (!opts.url) return
  let url = opts.url
  // 拿到当前的页面栈
  const history = getCurrentPages()
  let path = url.split('?')
  let params

  //获取URL参数
  if (path.length === 2) {
    params = path[1]
  }
  let page = path[0].split('/').pop()
  let index = -1
  for (var i = 0; i < history.length; i++) {
    let hPath = history[i].__route__
    let hPage = hPath.split('/').pop()
    if (page == hPage) {
      index = i
      break
    }
  }
  if (index === -1) {
    // 如果不存在这个页面，直接跳转
    wx.navigateTo({
      url: url
    })
  } else {
    // 如果存在这个页面，就回退回去
    if (params) {
      // query是处理下url参数的自己定义的函数
      params = query(params)
    }
    // 将跳转的页面的参数保存到全局数据中，然后在页面中可以去拿取，store是自己申明的
    app.store(page, params)
    wx.navigateBack({
      delta: history.length - (index + 1)
    })
  }
}
