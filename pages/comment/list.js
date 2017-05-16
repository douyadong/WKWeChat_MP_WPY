var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');

var initData = {};
var isLoading = false;

var params = $.extend(true,{},{
    data: {
        comments: [],
        isLoading:false,//是否正在加载中
        isNoData:false,//是否没有数据了
        loadError:false
    },
    onLoad: function(option) {
        var mobile =  wx.getStorageSync('userInfo').mobile;
        initData = $.extend(true,{},{
            offset:0,
            guestPhoneNum:mobile
        },option);
        request.fetch({
            data:initData,
            module:'comment',
            action:'list',
            mock:true,
            success:function(data){
                this.setData({
                    "comments":data.data.commentList
                })
                if(data.data.commentList.length<10){
                    this.setData({
                        "isNoData":true
                    })
                }
            }.bind(this),
            fail:function(){

            }
        })
    },
    loadMore:function() {
        if(isLoading || this.data.isNoData)return;
        isLoading = true;
        initData.offset = initData.offset++;
        
        request.fetch({
            data:initData,
            module:'comment',
            action:'list',
            showLoading:true,
            success:function(data){
                if(data.status === 1){
                    this.setData({
                        "comments":this.data.comments.concat(data.data.commentList),
                        "loadError":false
                    })
                    if(data.data.commentList.length<10){
                        this.setData({
                            "isNoData":true
                        })
                    }
                    setTimeout(function(){
                        isLoading= false;
                    }.bind(this),200)
                }
            }.bind(this),
            fail:function(){
                initData.offset = initData.offset--;
                this.setData({
                    "loadError":true
                })
                console.log(111)
            }.bind(this)
        })
    },
    bindErrorBtn:function(){
        isLoading=false;
        this.loadMore();
    }
},houseComment);

Page(params);