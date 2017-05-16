var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');

var requestData = {},
    isLoading = false,
    offset = 0;

var params = $.extend(true,{},{
    data: {
        comments: [],
        isLoading:false,
    },
    onLoad: function(option) {

        var mobile =  wx.getStorageSync('userInfo');
            mobile = mobile && mobile.mobile || '';
            
        requestData = $.extend(true,{},{
            offset:offset,
            guestPhoneNum:mobile
        },option);

        request.fetch({
            data:requestData,
            module:'comment',
            action:'list',
            success:function(data){
                this.setData({
                    "comments":data.data.commentList
                })
                if(data.data.commentList.length<20){
                    this.setData({
                        "isNoData":true
                    })
                }
            }.bind(this)
        })
    },
    loadMore:function() {
        if(isLoading)return;
        isLoading = true;
        offset++;
        requestData.offset = offset;
        
        request.fetch({
            data:requestData,
            module:'comment',
            action:'list',
            showLoading:true,
            //mock:true,
            success:function(data){
                if(data.status === 1){
                    this.setData({
                        "comments":this.data.comments.concat(data.data.commentList)
                    })
                    setTimeout(function(){
                        isLoading= false;
                    }.bind(this),200)
                }
            }.bind(this),
            error:function(){
                pageIndex--;
                this.setData({
                    "loadError":true
                })
                console.log('加载失败')
            }.bind(this)
        })
    }
},houseComment);

Page(params);