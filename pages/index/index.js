//index.js
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





//获取应用实例
var app = getApp()
Page({
  data: {
    newList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../login/index'
    })
  },
  onLoad: function () {
    var that = this;
    //后台返回的数据
    let list = [
        {
          text:"微信小程序开发中,不知道小程序好不好",
          key:"小程序"
        },
        {
          text:"2017小程序火了",
          key:"小程序"
        }
    ];

    this.setData({
      newList:HighlightTransform(list)
    })
  },
  developLink:function(e){
    if(e.target.id==="1"){
      wx.navigateTo({
        url: '../comment/write'
      })
    }else if(e.target.id==="2"){
      wx.navigateTo({
        url: '../comment/list'
      })
    }else if(e.target.id==="3"){

    }
  }
})
