var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');

var initData = {},
	isLoading = false,
    pageIndex = 0;

var params = {
	data: {
		isLoading:false,//是否正在加载中
        isNoData:false,//是否没有数据了
        loadError:false
	},
	onLoad: function(option) {
		initData = $.extend(true,{},{pageIndex:pageIndex,pageSize:20},option);
        request.fetch({
            data:initData,
            module:'agent',
            action:'rateList',
            success:function(data){
            	if(data.status === 1){
            		this.setData({
	                    "simpleAgentCommentTag":data.data.simpleAgentCommentTag,
	                    "simpleAgentCommentList":data.data.simpleAgentCommentList
	                })
	                if(data.data.simpleAgentCommentList.length<20){
	                    this.setData({
	                        "isNoData":true
	                    })
	                }
            	}
            }.bind(this),
            fail:function(){

            }
        })
	},
	loadMore:function(){
		if(isLoading || this.data.isNoData)return;
        isLoading = true;

        pageIndex++;

        initData.pageIndex = pageIndex*20;
        
        request.fetch({
            data:initData,
            module:'agent',
            action:'moreList',
            showLoading:true,
            success:function(data){
                if(data.status === 1){
                    this.setData({
                        "simpleAgentCommentList":this.data.simpleAgentCommentList.concat(data.data),
                        "loadError":false
                    })
                    if(data.data.length<20){
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
                pageIndex--;
                this.setData({
                    "loadError":true
                })
                console.log('加载失败')
            }.bind(this)
        })
	},
    bindErrorBtn:function(){
        isLoading=false;
        this.loadMore();
    }
};
Page(params);