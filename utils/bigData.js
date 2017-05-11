/**
 * @desc:悟空找房小程序-大数据记录定义
 * @author:yuxiaochen@lifang.com
 */

const $ = require('./extend')

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
  '1067': {
    'pageParams': ['house_id', 'boutique'],
    'events': [
      {
        eventName: '1045027',
        eventParams: ['agent_id', 'new_house_id']
      },
      {
        eventName: '1045029',
        eventParams: ['agent_id', 'new_house_id']
      },
      {
        eventName: '1045071',
        eventParams: ['agent_id']
      }
    ]
  }
}

module.exports = {
  send: function ({page_id, event_id, page_params, event_params}) {
      let pa=$.extend(true,{},params);

      pa.pageName=page_id;

      if(page_params&&page_params.length){
          
      }

      pa.eventName=event_id;
  }
}
