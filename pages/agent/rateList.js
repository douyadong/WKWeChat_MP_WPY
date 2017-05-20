var request = require('../../utils/request.js');
var $ = require('../../utils/extend.js');

var params = {
	data: {
		isLoading:false,
        loadError:false,
        isNoData:false,
        simpleAgentCommentTag:{},
        simpleAgentCommentList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
	},
    pageIndex:0,
	onLoad: function(option) {
        var _this = this;
		this.initData = $.extend(true,{},{
            pageIndex:this.pageIndex,
            pageSize:20
        },option);
        
        request.fetch({
            data:this.initData,
            module:'agent',
            action:'rateList',
            success:function(data){
            	if(data.status === 1){
                    if(data.data.simpleAgentCommentList.length<20){
                        this.setData({
                            "isNoData":true,
                            "simpleAgentCommentList":data.data.simpleAgentCommentList,
                            "simpleAgentCommentTag":data.data.simpleAgentCommentTag
                        }) 
                    }else{
                        this.setData({
                            "simpleAgentCommentList":data.data.simpleAgentCommentList,
                            "simpleAgentCommentTag":data.data.simpleAgentCommentTag
                        }) 
                    }
            	}
            }.bind(this),
            fail:function(){

            }
        })
	},
	loadMore:function(){
		if(this.isLoading || this.data.isNoData){
            return
        };
        this.isLoading = true;

        this.pageIndex++;

        this.initData.pageIndex = this.pageIndex*20;
        
        request.fetch({
            data:this.initData,
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
                        this.isLoading= false;
                    }.bind(this),200)
                }
            }.bind(this),
            fail:function(){
                this.pageIndex--;
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
    },
    onShareAppMessage() {
        return {
            title: '买房卖房，找好经纪人就对了',
            path: '/pages/agent/rateList?agentId='+this.initData.agentId
        }
    }
};
Page(params);