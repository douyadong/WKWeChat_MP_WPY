import $ from "../../utils/extend.js" ;
import request from "../../utils/request" ;

let mock = true ;  //页面调取数据是mock还是接口数据，如果是接口数据这里写false就好了

let params = {
     data : {} ,
     render : function() {
          let  _ = this ;
          request.fetch({
              "module": "agent" ,
              "action" : "detail" ,
              "showLoading" :  true ,
              "mock" : mock ,
              success : function (res) {
                  let result = res.data ;
                  result.xfSources = result.recommendNewHouseList ;
                  delete result.recommendNewHouseList ;
                  result.esfSources = result.recommendOldHouseList ;
                  delete result.recommendOldHouseList ;
                  _.setData(result) ;
              }
          }) ;
     } ,
     onLoad : function () {
          this.render() ;    
    }
} ;

Page(params) ;