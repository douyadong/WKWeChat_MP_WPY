/**
 * @desc:统一定义请求接口地址
 */

const domain = "https://m.wkzf.com" ;

const url = {
  "agent" : {
    "rateList" : "/wxmpAgent/getAgentCustomerCommentList.rest",
    "getAgentInfo" : "/wxmpAgent/getSimpleAgent.rest",
    "writeRate" : "/wxmpAgent/commentAgent.rest",
    "detail" : "/wxmpAgent/getAgentDetail.rest"
  } ,
  "buy" : {
    "getDetails" : "/wxmpInterest/getCustomerHouseIntention.rest" ,
    "add" : "/addInterestRecord.rest" ,
    "edit" : "/updateInterestRecord.rest" ,
    "getAgentList" : ""
  } ,
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
    "uploadComment" : "/wxmpEstate/commentEstate.rest"
  },
  "report":{
    "write":"/wxmpOldHouseDetail/guestTipoffHouse.rest"
  }
}

module.exports = {
  get: function (module, action) {
    return `${domain}${url[module][action]}`
  }
}
