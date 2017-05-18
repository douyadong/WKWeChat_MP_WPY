var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');

var params = $.extend(true,{},{
    data: {
        comments: [],
        isLoading:false,
        isNoData:false
    },
    offset:0,
    isLoading:false,
    requestData:{},
    onLoad: function(option) {

        var mobile =  wx.getStorageSync('userInfo');
            mobile = mobile && mobile.mobile || '';
            
        this.requestData = $.extend(true,{},{
            offset:this.offset,
            guestPhoneNum:mobile
        },option);

        request.fetch({
            data:this.requestData,
            module:'comment',
            action:'list',
            success:function(data){
                this.setData({
                    "comments":data.data.commentList
                })
                if(data.data.commentList.length<10){
                    this.setData({
                        "isNoData":true
                    })
                }
            }.bind(this)
        })
    },
    loadMore:function() {
        if(this.isLoading || this.data.isNoData)return;
        this.isLoading = true;
        this.offset++;
        this.requestData.offset = this.offset*10;
        
        request.fetch({
            data:this.requestData,
            module:'comment',
            action:'list',
            showLoading:true,
            //mock:true,
            success:function(data){
                if(data.status === 1 && data.data){
                    this.setData({
                        "comments":this.data.comments.concat(data.data.commentList)
                    })
                    if(data.data.commentList.length < 10){
                        this.setData({
                            "isNoData":true
                        })
                    }
                    setTimeout(function(){
                        this.isLoading= false;
                    }.bind(this),200)
                }
            }.bind(this),
            error:function(){
                this.offset--;
                this.setData({
                    "loadError":true
                })
                console.log('加载失败')
            }.bind(this)
        })
    },
    bindErrorBtn:function(){
        this.isLoading=false;
        this.loadMore();
    }
},houseComment);

Page(params);