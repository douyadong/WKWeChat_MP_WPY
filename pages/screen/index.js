//关键字高亮
function HighlightTransform(data) {
    let newList = [];
      for(let i=0;i<data.length;i++){
          let texts = data[i].text.split(data[i].key);
          let t = '';
          for(let j=0;j<texts.length;j++){
            if(j<texts.length-1){
              t+=texts[j]+'@'+data[i].key+'@';
            }else{
              t+=texts[j]
            }
          }
          let arr = t.split('@');
          let list = [];
          for(let k=0;k<arr.length;k++){
          	list.push({
              text:arr[k],
              isgl:(arr[k] == data[i].key)
            });
          }
          newList.push({
              row:data[i],//原始数据
              glList:list//高亮数据
          });
      }
      return  newList;
}

var request = require('../../utils/request.js');
//工具方法
let _ = require('../../utils/extend.js')
/**
 * 获取经纪人列表
 */
var getAgentList = function(associationalWord,pageIndex,pageSize) {
    console.log(associationalWord,pageIndex,pageSize);
    return new Promise(function (resolve, reject) {
        request.fetch({
          mock:!true,
          module:'screen',
          action:'associationalAgentList',
          data:{
            "associationalWord": associationalWord,
            "device": wx.getStorageSync('device'),
            "pageIndex": pageIndex,
            "pageSize": pageSize,
            "cityId":  wx.getStorageSync('geography').cityId
          },
          success:function(data){
              if(data.status.toString() == "1"){
                resolve(data.data);
              }else{
                reject([]);
              }
          },
          fail:function() {
            reject([]);
          }
      });
    });
}

/**
 * 获取地区列表
 */
var getRegionList = function(associationalWord) {
    return new Promise(function (resolve, reject) {
        request.fetch({
          mock:!true,
          module:'screen',
          action:'acWord',
          data:{
            "associationalWord": associationalWord,
            "cityId":wx.getStorageSync('geography').cityId
          },
          success:function(data){
              if(data.status.toString() == "1"){
                resolve(data.data);
              }else{
                reject([]);
              }
          },
          fail:function() {
            reject([]);
          }
      });
    })
}






//获取应用实例
let app = getApp()
let main = {
  data: {
    key:'',
    agentList:[],//经纪人列表
    regionList:[],//地区列表
    pageIndex:0
  },
  //时时输入
  inputEvent(event){
      let _this = this;
      _this.setData({
          key:event.detail.value,
          pageIndex:0
      });
     getAgentList(_this.data.key,_this.data.pageIndex,3).then((agentList)=>{
         _this.setData({
            agentList:HighlightTransform( _this.conversionAgent(agentList))
        })
     });
     getRegionList(_this.data.key).then((list)=>{
         _this.conversionRegion(list);
     });
  },
  //点击完成触发
  completeEvent(event){
      let _this = this;
      _this.setData({
          key:event.detail.value,
          pageIndex:0
      });
      getAgentList(_this.data.key,_this.data.pageIndex,3).then((agentList)=>{
         _this.setData({
            agentList:HighlightTransform( _this.conversionAgent(agentList))
        })
     });
     getRegionList(_this.data.key).then((list)=>{
         _this.conversionRegion(list);
     });
  },
  //把经纪人列表转化成能使用的列表
  conversionAgent(agentList){
        let _this = this;
        let newAgentList = [];
        for(var i=0;i<agentList.length;i++){
            newAgentList.push({
                agentId:agentList[i].agentId,
                text:agentList[i].agentName,
                key:_this.data.key,
                isVip: !!parseInt(agentList[i].vipType),
                phone:agentList[i].agentMobile,
                portrait:agentList[i].headRoundImgUrl
            });
        }
        return newAgentList;
  },
  //把地区转换为想要的格式
  conversionRegion(list){
      console.log(list);
      let _this = this;
      let newList = [];
      for(let i=0;i<list.length;i++){
          newList.push({
                text:list[i].displayStr,
                key:_this.data.key,
                describe:list[i].associationOrder
          });
      }
      
      _this.setData({
        regionList:HighlightTransform(newList)
      })
  },
  //点击更多经纪人
  moreAgent(event){
    let _this = this; 
    let oldAgentList = _this.data.agentList;
    let pageIndex = ++_this.data.pageIndex;
    _this.setData({
        pageIndex:pageIndex
    });
    getAgentList(_this.data.key,_this.data.pageIndex,10).then((agentList)=>{
         let newAgentList = HighlightTransform( _this.conversionAgent(agentList));
         for(let i=0;i<newAgentList.length;i++){
             oldAgentList.push(newAgentList[i]);
         }
         _this.setData({
            agentList:oldAgentList
        });
    });
  },
  onLoad(){    
    /*
    let list2 = [
        {
            text:"徐家汇",
            key:"徐",
            describe:"行政"
        }
    ];
    console.log(HighlightTransform(list2));
    this.setData({
        regionList:HighlightTransform(list2)
    })
    */
  }
}
Page(_.extend(true,main))
