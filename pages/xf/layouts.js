import request from "../../utils/request" ;

let params = {
     data : {         
     } ,
     render : function(options) {
          let  _ = this ;
          let subEstateId = options.subEstateId ;
          request.fetch({
              "module": "xf" ,
              "action" : "layouts" ,
              "showLoading" :  true , 
              "data":{
                "subEstateId":subEstateId
              },             
              success : function (res) {                                 
                  //最后赋予模板变量
                  _.setData({ "layouts" : res.data,"current":options.current }) ;
              }
          }) ;
     } ,
     
     onLoad : function (options) {          
          this.render(options) ;    
    }
} ;

Page(params) ;