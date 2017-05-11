//区域模拟数据 
let mock = require('./../../buy/mock.js')
module.exports = {
  data: {
    screen_region:'区域',
    screen_sort:'综合排序',
    screen_more:'更多',
    //设置页面默认可以滚动
    isScroll:false,
    //点击筛选，设置三角行旋转
    isRotate0:false,
    isRotate1:false,
    isRotate2:false,
    //点击筛选，设置文本变色
    blue0:false,
    blue1:false,
    blue2:false,
    //控制区域是否显示
    isShowMask:false,
    //显示区域的索引值
    showIndex:-1,
    //区域列表数据
    regionList:[],
    //区域id和板块列表数据
    plateList:[],
    //点击板块高亮状态
    plateActionId:-1,
    //具体板块数据
    towns:[],
    //点击左边区域，默认选中的id
    regionActionId:-1,
    //综合排序列表
    sortContentList:[{content:"综合排序"},{content:"评价分数从高到低"},{content:"成交量从高到低"}],
    //综合排序点击高亮id
    sortActionId:-1,
    //更多列表
    moreContentList:[{content:"好经纪人"},{content:"客户热评"},{content:"推荐房源数量多"}],
    //更多点击高亮
    moreActionId:-1
  },
  //组件初始化
  templateInit(){
    //获取区域模块数据
    //模拟数据-获取区域列表
    setTimeout(()=>{
        let regionList = mock.areaInfo.data;
        this.setData({
          regionList:regionList
        })
        //板块列表
        let plateList = [];
        //遍历区
        for(let i=0;i<regionList.length;i++){
            plateList.push({
              id:regionList[i].id,
              towns:[]
            });
        }
        for(let i=0;i<regionList.length;i++){
            if(parseInt(regionList[i].id) ==  parseInt(plateList[i].id)){
              let subLists = regionList[i].subList;
              for(let j=0;j<subLists.length;j++){
                let towns = subLists[j].towns;
                for(let k=0;k<towns.length;k++){
                  plateList[i].towns.push(towns[k]);
                }
              }
            }
        }
        this.setData({
          plateList:plateList
        })
    },1000);
  },
  //显示不同的筛选列表
  showScreenList(event){
    let index = parseInt(event.currentTarget.dataset.index);
    this.setData({
      isScroll:true
    })
    if(index == 0){//区域
      this.setData({
        isRotate0:true,
        blue0:true,
        isShowMask:true,
        showIndex:index
      })
    }else if(index == 1){//综合排序
      this.setData({
        isRotate1:true,
        blue1:true,
        isShowMask:true,
        showIndex:index
      })

    }else if(index == 2){//更多
      this.setData({
        isRotate2:true,
        blue2:true,
        isShowMask:true,
        showIndex:index
      })
    }
  },
  //消失遮罩
  hideMaskBox(event){
    this.setData({
        isShowMask:false,
        isScroll:false,
        showIndex:-1
    })
  },
  //点击左边区域
  tapRegionList(event){
    let plateList = this.data.plateList;//板块数据
    let id = parseInt(event.target.id);//当前点击id
    //设置点击背景变白
    this.setData({
        regionActionId:id
    })
    //点击的是“不限”
    if(id == -1){
      this.setData({
          screen_region:"不限",
          towns:[]
      })
    }
    for(let i=0;i<plateList.length;i++){
      if(plateList[i].id == id){
          this.setData({
              towns:plateList[i].towns
          })
      }
    }
  },
  //点击右边板块
  plateList(event){
    this.setData({
      plateActionId:event.target.id,
      screen_region:event.currentTarget.dataset.platename
    })
  },
  //点击综合排序
  tapSort(event){
    this.setData({
        sortActionId:parseInt(event.currentTarget.dataset.index)
    })
    //设置点击的值回显
    this.setData({
        screen_sort:event.currentTarget.dataset.content
    })
  },
  //点击筛选更多
  tapMore(event){
    //设置当前点击高亮
    this.setData({
        moreActionId:parseInt(event.currentTarget.dataset.index)
    })
    //设置点击的值回显
    this.setData({
        screen_more:event.currentTarget.dataset.content
    })
  }
}