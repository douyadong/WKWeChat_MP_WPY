//工具方法
let _ = require('../../utils/extend.js')
var request = require('../../utils/request.js');
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


/**
 * 获取经纪人列表
 */
var getAgentList = function(associationalWord,pageIndex,pageSize) {
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
              if(data.status.toString() == "1" && data.data != null && data.data.length > 0){
                resolve(data.data);
              }else{
                resolve([]);
              }
          },
          fail:function() {
            resolve([]);
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
              if(data.status.toString() == "1" && data.data != null && data.data.length > 0){
                resolve(data.data);
              }else{
                resolve([]);
              }
          },
          fail:function() {
            resolve([]);
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
    pageIndex:0,//从第0条开始
    isFocus:true,
    isMore:false
  },
  //时时输入
  inputEvent(event){
      let _this = this;
      _this.setData({
          key:event.detail.value,
          pageIndex:3
      });
     getAgentList(_this.data.key,0,10).then((agentList)=>{
         let newAgentList = [];
         if(agentList.length>3){
                _this.setData({
                    isMore:true
                });
                let oldAgentList = HighlightTransform( _this.conversionAgent(agentList));
                for(let i=0;i<3;i++){
                   newAgentList.push(oldAgentList[i]); 
                }
         }else{
             _this.setData({
                isMore:false
            });
            newAgentList = HighlightTransform( _this.conversionAgent(agentList));
         }
         _this.setData({
            agentList:newAgentList
        })
     });
     getRegionList(_this.data.key).then((list)=>{
         _this.conversionRegion(list);
     });
     _this.setData({
         isFocus:true
     });
  },
  //点击完成触发
  completeEvent(event){
      let _this = this;
        _this.setData({
          key:event.detail.value,
          pageIndex:3
      });
      getAgentList(_this.data.key,0,10).then((agentList)=>{
         let newAgentList = [];
         if(agentList.length>3){
                _this.setData({
                    isMore:true
                });
                let oldAgentList = HighlightTransform( _this.conversionAgent(agentList));
                for(let i=0;i<3;i++){
                   newAgentList.push(oldAgentList[i]); 
                }
         }else{
             _this.setData({
                isMore:false
            });
            newAgentList = HighlightTransform( _this.conversionAgent(agentList));
         }
         _this.setData({
            agentList:newAgentList
        })
     });
     getRegionList(_this.data.key).then((list)=>{
         _this.conversionRegion(list);
     });
      _this.setData({
         isFocus:false
     });
  },
  //把经纪人列表转化成能使用的列表
  conversionAgent(agentList){
        let _this = this;
        let newAgentList = [];
        for(var i=0;i<agentList.length;i++){
            newAgentList.push({
                vipType:agentList[i].vipType,
                cityName:agentList[i].abbreviation,
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
      let _this = this;
      let newList = [];
      for(let i=0;i<list.length;i++){
          newList.push({
                pinyin:list[i].pinyin,
                text:list[i].displayStr,
                key:_this.data.key,
                describe:list[i].associationOrder,
                cityId:list[i].value
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
    getAgentList(_this.data.key,_this.data.pageIndex,10).then((agentList)=>{
         let newAgentList = HighlightTransform( _this.conversionAgent(agentList));
         for(let i=0;i<newAgentList.length;i++){
             oldAgentList.push(newAgentList[i]);
         }
         _this.setData({
            agentList:oldAgentList,
            pageIndex:_this.data.pageIndex+10
        });
    });
  },
  onLoad(){    
  }
}
Page(_.extend(true,main))
