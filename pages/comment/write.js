var util = require('../../utils/util.js')
var $ = require('../../utils/extend.js')
var detailfoot = require('../../utils/detailfoot.js')

var params = $.extend(true,{},{
    data: {
        "uploadImages":[]
    },
    onLoad: function() {

    },
    bindFormSubmit: function(e) {
        console.log(e.detail.value.textarea)
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
                    return;
                }else{
                }
                _this.setData({
                    "uploadImages":res.tempFilePaths
                })
            }
        })
    }
},detailfoot)

Page(params)