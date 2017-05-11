import $ from "../../utils/extend.js" ;
//import detailfoot from "../components/detailfoot.js" ;
import request from "../../utils/request" ;
let params = {
  data : {} ,
  onLoad : function () {
    
  } ,
  onShow : function(){
    request.fetch({
      "module": "agent" ,
      "action" : "detail" ,
      "showLoading" :  true ,
      "mock" : true ,
      success : function (res) {
        console.log(res)
      }
    }) ;
  }
} ;
//params = $.extend( true , {} , params , detailfoot ) ;
Page(params) ;