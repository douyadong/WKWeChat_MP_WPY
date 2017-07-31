/**
 * @desc:悟空找房小程序-大数据记录定义
 * @author:yuxiaochen@lifang.com
 */

const $ = require('./extend')
let request = require('./request');

/**
 * 大数据对象原型
 */
const params = {
  'pageName': '',
  'pageParam': {

  },
  'eventName': '',
  'eventParam': '',
  'nextPageName': {},
  'nextPageParam': {},
  'city': ''
}

/**
 * 统一定义大数据，便于维护
 */
const collections = {
  //-------------------经纪人详情页--------------------------
  "1002021": {//经纪人详情页-电话拨号点击
    eventName:"1002021",
    pageName:"1002",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },
  "1002001": {//经纪人详情页-底部浮钮电话点击
    eventName: "1002001",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },
  "1002007": {//经纪人详情页-微信按钮点击
    eventName: "1002007",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },
  "1002004": {//经纪人详情页-二手房源点击
    eventName: "1002004",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['house_id','boutique']
  },
  "1002010": {//经纪人详情页-新房楼盘点击
    eventName: "1002010",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['new_house_id']
  },
  "1002013": {//经纪人详情页-我来评价按钮点击
    eventName: "1002013",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },
  "1002020": {//经纪人详情页-经纪人名片二维码点击
    eventName: "1002020",
    pageName: "1002",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },

  //-------------------首页--------------------------------
  "1026005": {//首页-我要卖房点击
    eventName: "1026005",
    pageName: "1026",
    pageParams: [],
    eventParams: []
  },
  "1026026": {//首页-搜索输入框点击
    eventName: "1026026",
    pageName: "1026",
    pageParams: [],
    eventParams: []
  },
  "1026100": {//首页-我要买房点击
    eventName: "1026100",
    pageName: "1026",
    pageParams: [],
    eventParams: []
  },
  "1026101": {//首页-区域选择
    eventName: "1026101",
    pageName: "1026",
    pageParams: [],
    eventParams: ['town_id','region_id']
  },
  "1026102": {//首页-排序选择
    eventName: "1026102",
    pageName: "1026",
    pageParams: [],
    eventParams: ['sort_type']
  },
  "1026103": {//首页-筛选选择
    eventName: "1026103",
    pageName: "1026",
    pageParams: [],
    eventParams: ['filter_type']
  },
  "1026093": {//首页-经纪人列表点击
    eventName: "1026093",
    pageName: "1026",
    pageParams: [],
    eventParams: ['agent_id']
  },

  //------------------我的购房意向页------------------------
  "1040010": {//我的购房意向页
    eventName: "1040010",
    pageName: "1040",
    pageParams: [],
    eventParams: []
  },

  //-------------------新房详情页---------------------------
  "1045027": {//新房详情页-经纪人电话咨询
    eventName: "1045027",
    pageName: "1045",
    pageParams: ['new_house_id'],
    eventParams: ['agent_id','new_house_id']
  },
  "1045029": {//新房详情页- 添加微信
    eventName: "1045029",
    pageName: "1045",
    pageParams: ['new_house_id'],
    eventParams: ['agent_id', 'new_house_id']
  },
  "1045071": {//新房详情页- 经纪人点击（头像、名字）
    eventName: "1045071",
    pageName: "1045",
    pageParams: ['new_house_id'],
    eventParams: ['agent_id']
  },

  //------------------	二手房详情页--------------------------
  "1067032": {//	二手房详情页- 电话咨询按钮点击
    eventName: "1067032",
    pageName: "1067",
    pageParams: ['house_id','boutique'],
    eventParams: ['house_id', 'boutique','agent_id']
  },
  "1067030": {//	二手房详情页- 经纪人点击（头像、名字）
    eventName: "1067030",
    pageName: "1067",
    pageParams: ['house_id', 'boutique'],
    eventParams: ['agent_id']
  },
  "1067031": {//	二手房详情页- 加微信点击
    eventName: "1067031",
    pageName: "1067",
    pageParams: ['house_id', 'boutique'],
    eventParams: ['house_id', 'boutique', 'agent_id']
  },

  //----------------------为您推荐页--------------------------
  "1131001": {//	为您推荐页- 修改购房意向点击
    eventName: "1131001",
    pageName: "1131",
    pageParams: [],
    eventParams: []
  },
  "1131002": {//	为您推荐页- 经纪人电话咨询
    eventName: "1131002",
    pageName: "1131",
    pageParams: [],
    eventParams: ['agent_id']
  },
  "1131003": {//	为您推荐页- 底部400电话咨询
    eventName: "1131003",
    pageName: "1131",
    pageParams: [],
    eventParams: []
  },
  "1131005": {//	为您推荐页- 经纪人列表点击
    eventName: "1131005",
    pageName: "1131",
    pageParams: [],
    eventParams: ['agent_id']
  },

  //---------------------我要卖房页----------------------------
  "1132001": {//	为您推荐页- 经纪人列表点击
    eventName: "1132001",
    pageName: "1132",
    pageParams: [],
    eventParams: []
  },

  //-------------------经纪人添加微信页-------------------------
  "1117001": {// 名片二维码点击点击
    eventName: "1117001",
    pageName: "1117",
    pageParams: ['agent_id'],
    eventParams: ['agent_id']
  },


  //------------------pv--------------------------------------
   "1002":{//经纪人详情页
    type: 1,
    pageName:"1002",
    pageParams: ['agent_id'],
    eventParams: []
  },
   "1026": {//	首页
    type: 1,
    pageName: "1026",
    pageParams: [],
    eventParams: []
  },
   "1040": {//我的购房意向页
    type: 1,
    pageName: "1040",
    pageParams: [],
    eventParams: []
  },
   "1045": {//新房详情页
    type: 1,
    pageName: "1045",
    pageParams: ['new_house_id'],
    eventParams: []
  },
   "1067": {//二手房详情页
    type: 1,
    pageName: "1067",
    pageParams: ['house_id','boutique'],
    eventParams: []
  },
   "1131": {//为您推荐页
    type: 1,
    pageName: "1131",
    pageParams: [],
    eventParams: []
  },
   "1132": {//我要卖房页
    type: 1,
    pageName: "1132",
    pageParams: [],
    eventParams: []
  },
  "1117":{
    type: 1,
    pageName: "1117",
    pageParams: ['agent_id'],
    eventParams: []
  }
}

const deviceId = wx.getStorageSync("device");

module.exports = {
  send:function(params){
    try{
      let eventName = params.eventName || params.pageName;
      let eventConfig = collections[eventName];
      let copyConfig = $.extend(true,{},eventConfig);      
      if(copyConfig.type===1){//pv埋点
        copyConfig.page_time = Date.now();
      }else{
        copyConfig.type = 2;
      }
      //解析页面参数
      if(copyConfig.pageParams && copyConfig.pageParams.length){
        copyConfig.pageParam = {};
        copyConfig.pageParams.forEach(function(item,index){
          copyConfig.pageParam[item] = params[item];
        });
      }

      //解析事件参数
      if (copyConfig.eventParams && copyConfig.eventParams.length) {
        copyConfig.eventParam = {};
        copyConfig.eventParams.forEach(function (item, index) {
          copyConfig.eventParam[item] = params[item];
        });
      }

      //删除参数设置
      delete copyConfig.pageParams;
      delete copyConfig.eventParams;

      copyConfig.deviceId = deviceId;
      //console.log(copyConfig);
      //console.log(JSON.stringify(copyConfig));
      //发送请求
      request.fetch({
        module:"bigData",
        action:"bigData",
        data:copyConfig,
        method:"POST",
        success:function(){

        },
        fail:function(res){
          //console.log('调用埋点接口失败');
          //console.log(res);
        }
      });
    }catch(ex){

    }
  }
}
