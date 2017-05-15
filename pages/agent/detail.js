import request from "../../utils/request" ;
import $ from "../../utils/extend" ;
import detailFoot from "../components/detailfoot" ;

let params = $.extend(true , {} , {
    data : {} ,
    render: function() {
        let _ = this ;       
        request.fetch({
            "module": "agent",
            "action": "detail",            
            "data": { "agentId" :  _.data.agentId } ,
            "showLoading": true ,
            "mock" : false ,
            success: function(res) {
                let result = res.data ;
                //给二手房和新房两个组件赋值
                result.xfSources = result.recommendNewHouseList ;
                if(result.xfSources) {
                    result.xfSources.forEach(function(element){
                        element.agentId = _.data.agentId ;
                    }) ; 
                }                    
                result.esfSources = result.recommendOldHouseList ;
                if(result.esfSources) {
                    result.esfSources.forEach(function(element){
                        element.agentId = _.data.agentId ;
                    }) ;
                }                
                //默认设置推荐房源停留在新房这个tab，等待切换
                result.currentSourcesTab = "xf" ;
                //判断成交故事后面是否需要出...更多
                let agentStory = result.simpleAgentDetail.agentStory || "" ;
                result.agentStoryExtendable = agentStory && agentStory.length > 34 ? true : false ;
                result.simpleAgentDetail.shortAgentStory = agentStory.substr(0, 34) + "..." ;
                //最后赋予模板变量
                _.setData(result) ;
            }
        });
    },
    //切换二手房新房tab的方法
    swapToTab: function(event) {
        this.setData({ "currentSourcesTab": event.currentTarget.dataset.tab }) ;
    },
    //展开成交故事的方法
    extendAgentStory: function() {
        this.setData({ "agentStoryExtendable": false }) ;
    } ,
    onLoad : function(options) {
        //把页面参数agentId保存
        this.setData({
            agentId : options.agentId
        }) ;
        this.render() ;
    }
} , detailFoot) ;


Page(params) ;
