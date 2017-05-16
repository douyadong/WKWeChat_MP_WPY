import request from "../../utils/request" ;
import $ from "../../utils/extend" ;
import detailFoot from "../components/detailfoot" ;

let isLoading = false ;  //用来标识页面当前是否正在下拉加载数据
let pullLoadRequestData =  { "agentId" : null , "pageIndex" : 0 , "pageSize" : 10 } ;  //上拉加载请求数据对象，赋予初始值

let params = $.extend(true , {} , {
    data : {
        "pageParams" : {} ,  //页面参数对象
        "isNoData" : false ,  //用来标识页面数据是否加载完毕
        "loadError" : false ,  //是否存在加载错误
        "currentSourcesTab" : "xf"  //默认设置推荐房源停留在新房这个tab，等待切换
    } ,
    render : function() {
        let _ = this ;       
        request.fetch({
            "module": "agent",
            "action": "detail",            
            "data": { "agentId" :  _.data.pageParams.agentId } ,
            "showLoading": true ,
            "mock" : false ,
            success: function(res) {
                let result = res.data ;
                //给二手房和新房两个组件赋值，并将agentId带进去
                result.xfSources = _.addAgentId(result.recommendNewHouseList) ;                 
                result.esfSources = _.addAgentId(result.recommendOldHouseList) ; 
                //判断成交故事后面是否需要出...更多
                let agentStory = result.simpleAgentDetail.agentStory || "" ;
                result.agentStoryExtendable = agentStory && agentStory.length > 34 ? true : false ;
                result.simpleAgentDetail.shortAgentStory = agentStory.substr(0, 34) + "..." ;
                //最后赋予模板变量
                _.setData(result) ;
            }
        }) ;
    },
    //切换二手房新房tab的方法
    swapToTab : function(event) {
        this.setData({ "currentSourcesTab": event.currentTarget.dataset.tab }) ;
    } ,
    //展开成交故事的方法
    extendAgentStory : function() {
        this.setData({ "agentStoryExtendable": false }) ;
    } ,
    //二手房源下拉加载方法
    loadMoreEsf : function() {
        let _ = this ;
        if(isLoading || isNoData) return ;  //如果正在加载数据或者已经没有了数据就直接返回
        isLoading = true ;  //开始加载
        pullLoadRequestData.agentId = this.data.pageParams.agentId ;
        pullLoadRequestData.agentId.pageIndex ++ ;
        request.fetch({
            "module" : "agent",
            "action" : "getMoreEsf",            
            "data" : pullLoadRequestData ,
            "showLoading" : false ,
            "mock" : false ,
            success : function(res) {
                if(res.status.toString() !== "1") {
                    wx.showModal({ "title" : "错误提示" , "content" : res.message , "showCancel" : false , "confirmText" : "我知道了"}) ;
                    return ;
                }
                let result = _.data.esfSources ;
                if(res.data && res.data.length) {
                    result = result.concat(_.addAgentId(res.data)) ;  
                     _.setData({ "esfSources" : result , "loadError" : false }) ;     
                }
                else _.setData({ "isNoData" : true }) ;                    
            }
        }) ;
    } ,
    //新房房源下拉加载方法
    loadMoreXf : function() {

    } ,
    //把agentId加到房源数据中去
    addAgentId : function(sources) {
        if(!sources) return sources ;
        let _ = this ;        
        sources.forEach(function(element){
            element.agentId = _.data.agentId ;
        }) ;
        return sources ;
    } ,
    //页面loaded的时候触发的方法
    onLoad : function(options) {        
        //把页面参数保存到页面数据中
        this.setData({ "pageParams" : options }) ;
        //渲染页面
        this.render() ;
    }
} , detailFoot) ;


Page(params) ;
