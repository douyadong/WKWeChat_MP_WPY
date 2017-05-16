import request from "../../utils/request" ;

let params = {
     data : {         
     } ,
     render : function() {
          let  _ = this ;          
          request.fetch({
              "module" : "xf" ,
              "action" : "layouts" ,
              "showLoading" :  true , 
              "mock" : false ,
              "data" : {
                "subEstateId" : _.data.subEstateId
              } ,             
              success : function (res) {                                 
                  //最后赋予模板变量
                  _.setData({ "layouts" : res.data,"current" : _.data.current }) ;
                  //设置导航栏标题，格式为："户型名称 index / count"
                  wx.setNavigationBarTitle({
                      title : _.data.layouts[_.data.current].name + " " + (_.data.current + 1).toString() + " / " + _.data.layouts.length.toString()
                  }) ;
              }
          }) ;
     } ,
     setNavigatorTitle : function(event) {        
         //设置导航栏标题，格式为："户型名称 index / count"
        wx.setNavigationBarTitle({
            title : this.data.layouts[event.detail.current].name + " " + (event.detail.current + 1).toString() + " / " + this.data.layouts.length.toString()
        }) ;
     } ,
     onLoad : function (options) {
         //将页面传递过来的经纪人ID和新房ID保存起来供其他地方使用       
        this.setData({            
            subEstateId : options.subEstateId ,
            current : parseInt( options.current , 10 )
        }) ;    
        this.render() ;        
    }
} ;

Page(params) ;