var util = require('../../utils/util.js')
var $ = require('../../utils/extend.js')
var request = require('../../utils/request.js')
var apiUrl = require('../../utils/apiUrl.js')

var total = [],
    textareaValue = "",
    userInfo = '',
    initData = {},
    isSending = false;

var params = $.extend(true,{},{
    data: {
        "uploadImages":[],
        "uploadTextarea":""
    },
    onLoad: function(option) {
        initData = $.extend(true,{},option);
        userInfo = wx.getStorageSync('userInfo');
    },
    bindblur: function(e){
        textareaValue = e.detail.value;
        this.setData({
            "uploadTextarea":textareaValue
        })
    },
    chooseImg: function(e) {
        var _this = this;
        wx.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths,
                    currentFilePaths = _this.data.uploadImages;
                if(tempFilePaths.length+currentFilePaths.length > 3){
                    wx.showToast({
                        title: '只能上传3张图片'
                    })
                }else{
                    currentFilePaths=currentFilePaths.concat(tempFilePaths);
                    _this.setData({
                        "uploadImages":currentFilePaths
                    })
                }
            }
        })
    },
    deletImageItem:function(e){
        var currentFilePaths = this.data.uploadImages,
            index = e.currentTarget.dataset && e.currentTarget.dataset.id;
        currentFilePaths.splice(index,1);
        this.setData({
            "uploadImages":currentFilePaths
        })
    },
    uploadFile:function(file,i){
        var _this = this;
        wx.uploadFile({
            url:apiUrl.get('comment','uploadImg'),
            filePath: file[i],//这里是多个不行tempFilePaths[0]这样可以
            name: 'file',
            success: function(res){
                var data = res.data;

                if((i+1)!=file.length){
                    total.push(data);
                    _this.uploadFile(file,i+1);
                }else{
                    total.push(data);
                    wx.hideToast();  //隐藏Toast
                    _this.uploadFormSubmit();
                }
            },
            fail: function (e) {
                var n = i+1;
                wx.showModal({
                    title: '提示',
                    content: '第'+n+'张图片上传失败',
                    showCancel: true
                })
            }
        })
    },
    uploadFormSubmit:function(){
        if(isSending) return;
            isSending = true;
        var requestData = {
            guestPhoneNum:userInfo.mobile,
            subEstateId:parseFloat(initData.subEstateId),
            comment:textareaValue,
            commentLocation:initData.commentLocation,
            imageKeys:total.join(',')
        }
        wx.hideLoading()
        request.fetch({
            data:requestData,
            module:'comment',
            action:'write',
            method:'POST',
            showTitle:'提交中',
            success:function(data){
                if(data.status === 1){
                    isSending = false;
                    wx.showModal({
                        title: '成功',
                        content: '评价成功',
                        success: function(res) {
                            if (res.confirm) {
                                wx.navigateBack()
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            }.bind(this),
            fail:function(data){
                isSending = false;
                wx.showModal({
                    title: '提示',
                    content: data.message || '评价失败，稍后重试',
                    showCancel: false
                })
            }.bind(this)
        })
    },
    bindFormSubmit: function(e) {
        if(this.data.uploadTextarea===""){
            wx.showModal({
                title: '提示',
                content: '请填写评论',
                showCancel: false
            })
        }else{
            if(this.data.uploadImages.length>0){
                wx.showLoading({
                    title: '图片上传中'
                })
                this.uploadFile(this.data.uploadImages,0)
            }else{
                this.uploadFormSubmit()
            }
        }
    }
})

Page(params)