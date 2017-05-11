var util = require('../../utils/util.js')
var $ = require('../../utils/extend.js')
var detailfoot = require('../components/detailfoot.js')
var app = getApp();

var total = [],
    textareaValue = "";

var params = $.extend(true,{},{
    data: {
        "uploadImages":[],
        "uploadTextarea":""
    },
    onLoad: function() {
        app.isLogin();
    },
    bindblur: function(e){
        textareaValue = e.detail.value;
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
        console.log(e.currentTarget.dataset.id)
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
            url:'',
            filePath: file[i],//这里是多个不行tempFilePaths[0]这样可以
            name: 'file',
            success: function(res){
                var obj = new Object(),
                    data = res.data;
                obj.id = i;
                obj.src = data;

                if((i+1)!=file.length){
                    total.push(obj);
                    _this.uploadFile(file,i+1);
                }else{
                    total.push(obj);
                    wx.hideToast();  //隐藏Toast
                    _this.uploadFormSubmit();
                }
            },
            fail: function (e) {
                wx.showModal({
                    title: '提示',
                    content: '第'+i+'张图片上传失败',
                    showCancel: true
                })
            }
        })
    },
    uploadFormSubmit:function(){

    },
    bindFormSubmit: function(e) {
        if(this.data.currentFilePaths){
            this.uploadFile(this.data.currentFilePaths,0)
        }else{
            this.uploadFormSubmit()
        }
    }
},detailfoot)

Page(params)