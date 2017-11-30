Page({
    data : { } ,
    onLoad : function (options) {
        console.log(options) ;
        var redirectUrl = "/pages/index/index" ;  //默认会跳转到首页
        //我们现在暂时只实现对门店首页地址的兼容：https://m.wkzf.com/shanghai/store/23434.html
        if(options.q)  {
            console.log(options.q) ;
            var urlArray = decodeURIComponent(options.q).split("m.wkzf.com") ; 
            console.log(urlArray) ;
            if(urlArray.length > 1) {
                //说明域名后面还有东西，先去掉第一个/
                var pagePath = urlArray[1].substr(1) ;
                console.log(pagePath) ;
                var pathArray = pagePath.split("/") ;
                console.log(pathArray) ;
                if( pathArray.length > 2 && pathArray[1].toLowerCase() === "store") {
                    //说明是门店详情页面
                    var storeId = pathArray[2].replace(".html" , "") ;
                    redirectUrl = "/pages/store/index?storeId=" + storeId ;
                }
            }
        }
        wx.redirectTo({ "url" : redirectUrl }) ;
    }    
}) ;