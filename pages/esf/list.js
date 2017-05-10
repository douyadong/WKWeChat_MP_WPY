//logs.js
var util = require('../../utils/util.js');
var request = require('../../utils/request.js');
Page({
  data: {
    "esfSources":[
      {
        "thumbnail":"https://img.wkzf.com/e13cc00ccbb547f9b7e63454535cabb0.ML",
        "title":"精装修 随时可以看房子",
        "layout":"2室2厅2卫",
        "area":136,
        "money":453,
        "location":"浦东 花木",
        "price":"45800"
      }
    ]
  },
  onLoad: function (options) {
    //按照h5做法，相似房源不分页，在售房源分页
    //todo:接口没有提供分页功能，暂且跳过
    this.data.type = options.type;//1:相似房源，2:在售房源  
    this.data.subEstateId = options.subEstateId;
    this.data.houseId = options.houseId;  
  },
  reachBottom:function(){

  },
  onShow:function(){
    var that = this;
    var moduleName,action,data;
    switch(this.data.type){
      case 1:
        moduleName="esf";
        action="similar";
        data={
          houseId:this.data.houseId
        };
      break;
      case 2:
        moduleName="estate";
        action="sellingList";
        data={
          subEstateId:this.data.subEstateId
        };
      break;
    }

    request.fetch({
      module:moduleName,
      action,
      data,
      success:function(data){
        var esfSources = data.data.map(function(item){
          return {
            thumbnail:item.houseImgUrl,
            title:item.houseTitle,
            layout:item.houseChild,
            area:item.areaStr,
            money:item.totalPrice,
            location:item.district+" "+item.town,
            price:item.unitPrice
          }
        });

        that.setData({
          esfSources
        });
      }
    });
  }
})
