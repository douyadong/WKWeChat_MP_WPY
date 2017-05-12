var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');

var params = $.extend(true,{},{
    data: {
        comments: [],
        isLoading:false,
    },
    onLoad: function(option) {
        console.log(option.subEstateId)
        var data = $.extend(true,{},option);
        request.fetch({
            data:data,
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
            isLoading:true
        });
        console.log(1)
    }
},houseComment);

Page(params);