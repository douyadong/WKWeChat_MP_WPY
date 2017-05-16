/**
 * @desc 我要买房-提交成功页
 * @author:yuxiaochen@lifang.com
 */

Page({
  handleRedirect: function () {
     wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})
