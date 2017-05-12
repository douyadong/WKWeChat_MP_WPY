var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');

var requestData = {};

var params = $.extend(true,{},{
    data: {
        comments: [],
        isLoading:false,
    },
    onLoad: function(option) {
        requestData = $.extend(true,{},{offset:0},option);
        request.fetch({
            data:requestData,
            module:'comment',
            action:'list',
            mock:true,
            success:function(data){
                this.setData({
                    "comments":data.data.commentList
                })
            }.bind(this)
        })
    },
    loadMore:function() {
        if(this.data.isLoading)return;
        this.setData({
            "isLoading":true
        });
        requestData.offset = requestData.offset++;
        request.fetch({
            data:requestData,
            module:'comment',
            action:'list',
            showLoading:true,
            mock:true,
            success:function(data){
                if(data.status === 1){
                    this.setData({
                        "comments":this.data.comments.concat(data.data.commentList),
                        "isLoading":false
                    })
                }
            }.bind(this),
            error:function(){
                
                
            }.bind(this)
        })
    }
},houseComment);

Page(params);