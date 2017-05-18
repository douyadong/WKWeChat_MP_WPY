const region = '区域';
const sort = '综合排序';
const more = '筛选';
wx.setStorageSync('regionname', '不限')
wx.setStorageSync('defineDistrictAndTown', '');




let state = {
    
}
module.exports = {
  data: {
    screen_region:region,
    screen_sort:sort,
    screen_more:more,
    //设置页面默认可以滚动
    isScroll:true,
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
    sortContentList:[{orderType:1,content:"综合排序"},{orderType:2,content:"评价分数从高到低"},{orderType:3,content:"成交量从高到低"}],//1.综合排序 2.评价分数从高到低 3.成交量从高到低
    //综合排序点击高亮id
    sortActionId:-1,
    //更多列表
    moreContentList:[{selectLabel:0,content:"不限"},{selectLabel:1,content:"好经纪人"},{selectLabel:2,content:"客户热评"},{selectLabel:3,content:"推荐房源数量多"}],//1.好经纪人 2.客户热评 3.推荐房源数量多
    //更多点击高亮
    moreActionId:-1
  },
  //组件初始化
  filterAgentListInit(regionList){
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
      //把板块往上提一层
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
  },
  //显示不同的筛选列表
  showScreenList(event){
    let actionIndex = parseInt(event.currentTarget.dataset.index);
    //this.actionIndex = actionIndex;
    this.setData({
      isScroll:false
    })
    if(actionIndex == 0){//区域
      this.setData({
        isRotate0:true,
        blue0:true,
        isShowMask:true,
        showIndex:actionIndex
      })

      //判断是否选择了综合排序筛选条件
      if(this.data.screen_sort == sort){//说明没有旋转
        this.setData({
            isRotate1:false,
            blue1:false
        })
      }
      //判断是否选择了更多筛选条件
      if(this.data.screen_more == more){//说明没有旋转
        this.setData({
            isRotate2:false,
            blue2:false
        })
      }
    }else if(actionIndex == 1){//综合排序
      this.setData({
        isRotate1:true,
        blue1:true,
        isShowMask:true,
        showIndex:actionIndex
      })
      //判断是否选择了区域筛选条件
      if(this.data.screen_region == region){//说明没有旋转
        this.setData({
            isRotate0:false,
            blue0:false
        })
      }
      //判断是否选择了更多筛选条件
      if(this.data.screen_more == more){//说明没有旋转
        this.setData({
            isRotate2:false,
            blue2:false
        })
      }
    }else if(actionIndex == 2){//更多
      this.setData({
        isRotate2:true,
        blue2:true,
        isShowMask:true,
        showIndex:actionIndex
      })
      //判断是否选择了区域筛选条件
      if(this.data.screen_region == region){//说明没有旋转
        this.setData({
            isRotate0:false,
            blue0:false
        })
      }
      //判断是否选择了综合排序筛选条件
      if(this.data.screen_sort == sort){//说明没有旋转
        this.setData({
            isRotate1:false,
            blue1:false
        })
      }
    }
  },
  //消失遮罩
  hideMaskBox(event){
    this.setData({
        isShowMask:false,
        isScroll:true,
        showIndex:-1,
        isRotate0:false,
        isRotate1:false,
        isRotate3:false
    })
    //判断是否选择了区域筛选条件
    if(this.data.screen_region == region){//说明没有旋转
      this.setData({
          isRotate0:false,
          blue0:false
      })
    }
    //判断是否选择了综合排序筛选条件
    if(this.data.screen_sort == sort){//说明没有旋转
      this.setData({
          isRotate1:false,
          blue1:false
      })
    }
    //判断是否选择了更多筛选条件
    if(this.data.screen_more == more){//说明没有旋转
      this.setData({
          isRotate2:false,
          blue2:false
      })
    }
  },
  //点击左边区域
  tapRegionList(event){
    let _this = this;
    let plateList = _this.data.plateList;//板块数据
    let id = parseInt(event.target.id);//当前点击id
    //设置点击背景变白
    _this.setData({
        regionActionId:id
    })
    //点击的是“不限”，towns：设置显现的板块
    if(id == -1){
      _this.setData({
          screen_region:"不限",
          towns:[],//点击的左侧的“不限”，没有板块，就是空数组
          //districtAndTown:_this.data.geography.cityPinyin,//修改获取经纪人列表筛选条件 “区域” 状态
          districtAndTown:"",
          showIndex:-1,
          isScroll:true,
          isShowMask:false,//遮罩消失
          isRotate0:false
      })
      //获取经纪人
      _this.getAgentList(
          _this.data.geography.cityId,
          _this.data.districtAndTown,
          _this.data.orderType,
          _this.data.selectLabel,
          0
      ).then((agentList)=>{
          _this.setData({
              agentList:agentList,
              pageIndex:20
          })
      });
    }else{
    //不是不限
        _this.setData({
              districtAndTown:event.currentTarget.dataset.pinyin
        })
        wx.setStorageSync('defineDistrictAndTown', event.currentTarget.dataset.pinyin)
        wx.setStorageSync('regionname', event.currentTarget.dataset.regionname)
    }
    for(let i=0;i<plateList.length;i++){
      if(plateList[i].id == id){//点击的不是“不限”，是区域
          _this.setData({
              towns:plateList[i].towns//不是空数组，修改右侧板块状态
          })
      }
    }
  },
  //点击右边板块
  plateList(event){
    let _this = this;
    let id = parseInt(event.target.id);//当前点击id
    let districtAndTown = '';
    if(id == -1){//不限
         districtAndTown = wx.getStorageSync('defineDistrictAndTown');
         _this.setData({
            screen_region:wx.getStorageSync('regionname')
        })
    }else{
        districtAndTown =  wx.getStorageSync('defineDistrictAndTown')+'-'+event.currentTarget.dataset.pinyin;
        _this.setData({
            screen_region:event.currentTarget.dataset.platename
        })
    }
    _this.setData({
      plateActionId:id,
      districtAndTown:districtAndTown//修改筛选经纪人列表状态
    })
    //获取经纪人
    _this.getAgentList(
        _this.data.geography.cityId,
        _this.data.districtAndTown,
        _this.data.orderType,
        _this.data.selectLabel,
        0
    ).then((agentList)=>{
        _this.setData({
            agentList:agentList,
            pageIndex:20
        })
    });
    _this.setData({
        showIndex:-1,
        isShowMask:false,//遮罩消失
        isScroll:true,
        isRotate0:false
    });
  },
  //点击综合排序
  tapSort(event){
    let _this = this;
    _this.setData({
         sortActionId:parseInt(event.currentTarget.dataset.index),//排序的点击id
         screen_sort:event.currentTarget.dataset.content, //设置点击的值回显
         orderType:parseInt(event.currentTarget.dataset.ordertype)
    })
    //获取经纪人
    _this.getAgentList(
        _this.data.geography.cityId,
        _this.data.districtAndTown,
        _this.data.orderType,
        _this.data.selectLabel,
        0
    ).then((agentList)=>{
        _this.setData({
            agentList:agentList,
            pageIndex:20
        })
    });
    _this.setData({
        showIndex:-1,
        isShowMask:false,//遮罩消失
        isScroll:true,
        isRotate1:false
    });
  },
  //点击筛选更多
  tapMore(event){
    let _this = this;
    _this.setData({
        moreActionId:parseInt(event.currentTarget.dataset.index),//设置当前点击高亮
        screen_more:event.currentTarget.dataset.content//设置点击的值回显
    })
    //console.log(event.currentTarget.dataset.selectlabel);
    if(parseInt(event.currentTarget.dataset.selectlabel) != 0){
      _this.setData({
          selectLabel:parseInt(event.currentTarget.dataset.selectlabel)
      })
      //获取经纪人
      _this.getAgentList(
          _this.data.geography.cityId,
          _this.data.districtAndTown,
          _this.data.orderType,
          _this.data.selectLabel,
          0
      ).then((agentList)=>{
          _this.setData({
              agentList:agentList,
              pageIndex:20
          })
      });
    }else{
      _this.setData({
          selectLabel:-1
      })
      //获取经纪人
      _this.getAgentList(
          _this.data.geography.cityId,
          _this.data.districtAndTown,
          _this.data.orderType,
          _this.data.selectLabel,
          0
      ).then((agentList)=>{
          _this.setData({
              agentList:agentList,
              pageIndex:20
          })
      });
    }
    _this.setData({
        showIndex:-1,
        isShowMask:false,//遮罩消失
        isScroll:true,
        isRotate2:false
    });
  },
  empty(){
      let _this = this;
      _this.setData({
            screen_region:region,
            screen_sort:sort,
            screen_more:more,
            //设置页面默认可以滚动
            isScroll:true,
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
            //regionList:[],
            //区域id和板块列表数据
            //plateList:[],
            //点击板块高亮状态
            plateActionId:-1,
            //具体板块数据
            //towns:[],
            //点击左边区域，默认选中的id
            regionActionId:-1,
            //综合排序列表
            sortContentList:[{orderType:1,content:"综合排序"},{orderType:2,content:"评价分数从高到低"},{orderType:3,content:"成交量从高到低"}],//1.综合排序 2.评价分数从高到低 3.成交量从高到低
            //综合排序点击高亮id
            sortActionId:-1,
            //更多列表
            moreContentList:[{selectLabel:0,content:"不限"},{selectLabel:1,content:"好经纪人"},{selectLabel:2,content:"客户热评"},{selectLabel:3,content:"推荐房源数量多"}],//1.好经纪人 2.客户热评 3.推荐房源数量多
            //更多点击高亮
            moreActionId:-1
      });
      _this.setData({
        //经纪人列表
        agentList:[],
        //获取经纪人列表的筛选条件
        districtAndTown:"",//选中区域拼音
        orderType:1,//排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
        selectLabel:-1,//更多：-1.不限 1.好经纪人 2.客户热评 3.推荐房源数量多
        pageIndex:0,//起始条数 默认从0开始
        isScrollIng:true,//是否可以滚动
        onAgentList:false//是否有经纪人列表
      });
      //获取经纪人
      _this.getAgentList(
          _this.data.geography.cityId,
          "",
          _this.data.orderType,
          _this.data.selectLabel,
          0
      ).then((agentList)=>{
          _this.setData({
              agentList:agentList,
              pageIndex:20
          })
     });
  }
}