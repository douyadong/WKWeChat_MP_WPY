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
          newList.push(list);
      }
      return  newList;
}




//工具方法
let _ = require('../../utils/extend.js')

//获取应用实例
let app = getApp()
let main = {
  data: {
    agentList:[],//经纪人列表
    regionList:[]//地区列表
  },
  //时时输入
  inputEvent(event){
      console.log(event.detail);
  },
  //点击完成触发
  completeEvent(event){
      console.log(event.detail);
  },
  //点击更多经纪人
  moreAgent(event){
    let oldList = this.data.agentList;
    let newList = [
        {
            text:"徐平",
            key:"徐"
        },
        {
            text:"徐莉",
            key:"徐"
        },
        {
            text:"徐娟",
            key:"徐"
        }
    ];
    let arr = HighlightTransform(newList)
    for(let i =0;i<arr.length;i++){
        oldList.push(arr[i]);
    }
    this.setData({
        agentList:oldList
    })
  },
  onLoad(){    
    //后台返回的数据
    let list1 = [
        {
            text:"徐平",
            key:"徐"
        },
        {
            text:"徐莉",
            key:"徐"
        },
        {
            text:"徐娟",
            key:"徐"
        }
    ];
    this.setData({
        agentList:HighlightTransform(list1)
    })

    let list2 = [
        {
            text:"徐家汇",
            key:"徐"
        },
        {
            text:"徐泾",
            key:"徐"
        },
        {
            text:"徐泾",
            key:"徐"
        },
        {
            text:"徐家汇",
            key:"徐"
        },
        {
            text:"徐家汇",
            key:"徐"
        },
        {
            text:"徐家汇",
            key:"徐"
        }
    ];
    this.setData({
        regionList:HighlightTransform(list2)
    })
  }
}
Page(_.extend(true,main))
