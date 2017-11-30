/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：悟空找房+微信小程序
2. 文件名：src -> libraries -> trace.js
3. 作者：zhaohuagang@lifang.com
4. 备注：页面访问及事件追溯，也就是大数据埋点
    @如果发送数据失败，将数据存储在缓存的队列中，下次发请求的时候再次发送，成功的时候不需要视图去移除队列中已经发送的数据，因为是pop出来一个一个执行的
    @pv埋点参数格式：
    @uv埋点参数格式：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import adf from "./apiDataFilter" ;
import apiConf from "../confs/api" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Trace的定义，在构造器里面去清除发送失败的埋点数据队列
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class Trace {
    constructor() {
        let city = wx.getStorageSync("city") || {} ;
        this.cityId = city.cityId || 43 ;  //默认上海
        this.clearStorage() ; 
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    生成GUID的辅助函数
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    s4() {
        return ((( 1 + Math.random() ) * 0x10000) | 0 ).toString(16).substring(1) ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    生成GUID的方法
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    uuid() {
        return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4() ; 
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    页面埋点追踪
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    pv({ pageName , pageParam }) {        
        let traceData = {
            "pageName" : pageName ,
            "pageParam" : pageParam ,
            "city" : this.cityId ,
            "deviceId" : this.uuid() ,
            "type" : 1
        } ;        
        adf.request({
            apiPath : "common.trace" ,
            method : "post" ,
            data : traceData ,
            showLoading : false ,
            tips : false ,
            successCallback : ()=> { } ,
            errorCallback : ()=> {
                console.log("发送页面埋点大数据失败！已经缓存起来，下次再发！") ;
                /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                将埋点信息存储到缓存中，下次请求时试着再发
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
                let badPageTraces = wx.getStorageSync("badPageTraces") || [] ;                
                badPageTraces.push(traceData) ;
                wx.setStorageSync( "badPageTraces" , badPageTraces ) ;
            }
        }) ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    事件埋点追踪
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    uv({ eventName , eventParam }) {
        let traceData = {
            "eventName" : eventName ,
            "eventParam" : eventParam ,
            "city" : this.cityId ,
            "deviceId" : this.uuid() ,
            "type" : 2
        } ;        
        adf.request({
            apiPath : "common.trace" ,
            method : "post" ,
            data : traceData ,
            showLoading : false ,
            tips : false ,
            successCallback : ()=> {} ,
            errorCallback : ()=> {
                console.log("发送事件埋点大数据失败！已经缓存起来，下次再发！") ;
                /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                将埋点信息存储到缓存中，下次请求时试着再发
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
                let badEventTraces = wx.getStorageSync("badEventTraces") || [] ;               
                badEventTraces.push(traceData) ;
                wx.setStorageSync( "badEventTraces" , badEventTraces ) ;
            }
        }) ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    清除缓存中未成功的数据埋点，注意用shift()的用意，而且只执行已获取的长度次数，就是后添加的都不执行，等到下个onLoad执行
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    clearStorage() {
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        清除pv缓存
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        let badPageTraces = wx.getStorageSync("badPageTraces") || [] ;         
        let bptl = badPageTraces.length ;        
        for( let n = 1 ; n <= bptl ; n ++ ) {
            let bptd = badPageTraces.shift() ;
            this.pv(bptd) ;
        }
        wx.setStorageSync( "badPageTraces" , badPageTraces ) ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        清除uv缓存
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        let badEventTraces = wx.getStorageSync("badEventTraces") || [] ;
        let betl = badEventTraces.length ;
        for( let n = 1 ; n <= betl ; n ++ ) {
            let betd = badEventTraces.shift() ;
            this.uv(betd) ;
        }
        wx.setStorageSync( "badEventTraces" , badEventTraces ) ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    整个工具定义结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
}

export default Trace ;