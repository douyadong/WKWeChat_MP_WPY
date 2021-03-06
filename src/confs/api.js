/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：悟空找房+微信小程序
2. 文件名：src -> confs -> api.js
3. 作者：zhaohuagang@lifang.com
4. 备注：api接口地址配置文件
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "dataStageEnv" : "sim" ,  //调用哪个阶段环境的数据接口，有 test | sim | prod 3种值
    "timeout" : 60 * 1000 ,  //超时请求时间，单位：毫秒
    "successStatusCode" : "1" ,
    "prefix" : {        
        "test" : "https://minapp-test.yfyk365.com" ,        
        "sim" : "https://minapp-sim1.yfyk365.com" ,
        "prod" : "https://minapp.yfyk365.com"
    } ,
    "suffix" : { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
        "common" : {
            "businessCity" : "wxmpCommon/getAllCityBusiness.rest" ,  //获取所有业务涵盖城市
            "city" : "wxmpCommon/getCityBusinessById.rest" ,  //通过城市id获取城市信息
            "region" : "houseMap/getCityAreasInfo.rest" ,  //通过城市id获取行政区域信息
            "cityBylalo" : "wxmpCommon/findCityInfoByLonAndLat.rest" ,  //通过经纬度获取城市信息
            "dial" : "wxmpCall/getAgentDial.rest" , //通过agentId和houseId获取经纪人短接号
            "trace" : "buriedPoint/sendData.rest"  //大数据埋点接口
        } ,
        "index" : {
            "index" : "" ,  //请调用esf.list             
            "search" : "",  //请调用esf.list
            "getAllCityBusiness" : "wxmpCommon/getAllCityBusiness.rest",//获取开通业务的城市
            "findCityInfoByLonAndLat": "wxmpCommon/findCityInfoByLonAndLat.rest",//根据经纬度获取城市信息
            "getCitySubwayLines": "houseMap/getCitySubwayLines.rest",//获取地铁数据
            "getCityAreasInfo": "houseMap/getCityAreasInfo.rest",//获取区域板块信息
            "acWord": "wxmpIndex/wordAssociation.rest",//模糊查询小区
            "secondHouseList": "wxmpIndex/secondHouseList.rest",
            "getAreaPriceInfo": "housePrice/getAreaPriceInfo.rest"
        } ,
        "agent" : {
            "index" : "wxmpAgent/getAgentInfo.rest" ,
            "house" : "wxmpAgent/getAgentHouseList.rest"
        } ,
        "esf" : {
            "list" : "wxmpIndex/secondHouseList.rest" ,
            "detail" : "wxmpOldHouseDetail/getOldHouseDetail.rest" ,
            "similar" : "wxmpOldHouseDetail/getSimilarList.rest"
        } ,
        "estate": {
            "detail" : "wxmpEstate/estateDetail.rest" ,   // 小区详情
            "comment" : "estate/queryEstateCommentList.rest" ,// 小区评论
            "onSale" : "wxmpEstate/estateSellingHouseList.rest"
        } ,
        "market" : {
           "index" : "housePrice/getAreaPriceList.rest"
        } ,
        "store": {
            "index" : "housePrice/getAreaPriceInfo.rest" , // 门店周边房价
            "house" : "wxmpStore/getHouseList.rest" ,// 房源列表
            "agent" : "wxmpStore/getAgentList.rest" , // 经纪人列表
            "location": "wxmpStore/getPosition.rest"  // 获取经纬度
        }
    }
} ;