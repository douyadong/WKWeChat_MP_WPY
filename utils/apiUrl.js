/**
 * @desc:统一定义请求接口地址
 */

//const domain = "https://minapp-sim.yfyk365.com" ;
const domain = "https://minapp-test.yfyk365.com";

const url = {
  "agent" : {
    "rateList" : "/wxmpAgent/getAgentCustomerCommentList.rest",
    "getAgentInfo" : "/wxmpAgent/getSimpleAgent.rest",
    "writeRate" : "/wxmpAgent/commentAgent.rest",
    "detail" : "/wxmpAgent/getAgentDetail.rest",
    "moreList": "/moreAgentCommentList.rest" ,
    "getMoreEsf" : "/moreAgentOldHouseList.rest" ,
    "getMoreXf" : "/moreAgentNewHouseList.rest"
  } ,
  "buy" : {
    "getDetails" : "/wxmpInterest/getCustomerHouseIntention.rest" ,
    "add" : "/addInterestRecord.rest" ,
    "edit" : "/wxmpInterest/addOrUpdateIntentionAndGetAgentList.rest" 
  } ,
  "components":{
    "callAgent":"/wxmpCall/getAgentDial.rest"
  },
  "estate" : {
    "zan" : "/wxmpEstate/upOrDownEstateComment.rest" ,
    "detail" : "/wxmpEstate/estateDetail.rest" ,
    "sellingList" : "/wxmpEstate/estateSellingHouseList.rest"
  } ,
  "esf" : {
  	"getDetails" : "/wxmpOldHouseDetail/getOldHouseDetail.rest" ,
    "similar" : "/wxmpOldHouseDetail/getSimilarList.rest" ,
    "agentInfo" : "/wxmpAgent/getSimpleAgent.rest"
  } ,
  "comment" : {
    "list" : "/estate/queryEstateCommentList.rest" ,
    "uploadImg" : "/wxmpEstate/uploadPic.rest" ,
    "uploadComment" : "/wxmpEstate/commentEstate.rest",
    "write":"/wxmpEstate/commentEstate.rest"
  },
  "city":{
    "getAllCityBusiness":"/wxmpCommon/getAllCityBusiness.rest"
  },
  "index":{
    "getCityAreasInfo":"/houseMap/getCityAreasInfo.rest",
    "findCityInfoByLonAndLat":"/wxmpCommon/findCityInfoByLonAndLat.rest",
    "searchAgentList":"/wxmpAgent/searchAgentList.rest",
    "getCityBusinessById":"/wxmpCommon/getCityBusinessById.rest"
  },
  "logon":{
    "generateIdentifyCode":"/wxmpLogin/generateIdentifyCode.rest",
    "loginFromMobilePhone":"/wxmpLogin/loginFromMobilePhone.rest",
    "getCityAreasInfo":"/houseMap/getCityAreasInfo.rest",
    "getWechatBindGuestInfo":"/wxmpLogin/getWechatBindGuestInfo.rest",//判断是否已经绑定过手机接口
    "getOpenIdByCode":"/wxmpLogin/getOpenIdByCode.rest",
    "addOpenUser":"/wxmpLogin/addOpenUser.rest"
  },
  "screen":{
      "associationalAgentList":"/wxmpAgent/associationalAgentList.rest",
      "acWord":"/wxmpIndex/acWord.rest"
  },
  "report":{
    "write":"/wxmpOldHouseDetail/guestTipoffHouse.rest"
  } ,
  "xf" : {
    "detail" : "/wxmpNewHouseDetail/getNewHouseDetail.rest" ,
    "infos" : "/wxmpNewHouseDetail/getNewHouseBasicInfo.rest" ,
    "presses" : "/wxmpNewHouseDetail/getDynamicList.rest" ,
    "posters" : "/wxmpNewHouseDetail/getMagazineList.rest" ,
    "layouts" : "/wxmpNewHouseDetail/getHouseTypeDetail.rest" ,
    "promotions" : "/wxmpNewHouseDetail/getNewHouseActivityInfo.rest" ,
    "poster-preview" : "/wxmpNewHouseDetail/getMagazineList.rest"
  }
}

module.exports = {
  get: function (module, action) {
    return `${domain}${url[module][action]}`
  }
}
