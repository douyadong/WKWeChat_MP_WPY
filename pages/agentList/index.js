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

Page({
    data:{
        agentList:[1],
        associationalWord:'',
        pageIndex:0,
        isLoadIng:true
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
    onLoad(options){
        let _this = this;
        _this.setData({
          key:options.key
        });
        getAgentList(_this.data.key,_this.data.pageIndex,20).then((agentList)=>{
          _this.setData({
            agentList:HighlightTransform(_this.conversionAgent(agentList)),
            pageIndex:20
          });
        });
    },
    bindscrolltolower(event){
        let _this = this;
        if(_this.data.isLoadIng){
            _this.setData({
              isLoadIng:false
            });
            getAgentList(_this.data.key,_this.data.pageIndex,20).then((agentList)=>{
                if(agentList.length == 0){
                  wx.showToast({
                    title: '没有数据拉',
                    icon: 'success',
                    duration: 1000
                  })
                  return
                }
                let oldAgentList = _this.data.agentList;
                let newAgentList = HighlightTransform(_this.conversionAgent(agentList));
                for(let i=0;i<newAgentList.length;i++){
                  oldAgentList.push(newAgentList[i]);
                }
                _this.setData({
                  agentList:oldAgentList,
                  pageIndex:_this.data.pageIndex+20,
                  isLoadIng:true
                });
            });
        }
    }
})
