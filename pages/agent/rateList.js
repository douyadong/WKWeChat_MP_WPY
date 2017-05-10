var params = {
	data: {
		"simpleAgentCommentTag":{
			"objScore":3.7,
			"shi":3,
			"kong":1,
			"hasSmall":true,
			"tags":[{
				"label":'礼貌热情',
				"count":18,
				"type":1
			},{
				"label":'礼貌热情',
				"count":18,
				"type":1
			},{
				"label":'不够专业',
				"count":1,
				"type":2
			},{
				"label":'不够热情',
				"count":1,
				"type":2
			}]
		},
		"simpleAgentCommentList": [{
			"content": "服务态度很好，感觉非常靠谱的一个经纪人！",
			"client": "王先生",
			"date": "2017-05-03",
			"score":4
		}, {
			"content": "很热情，很了解房源信息 ",
			"client": "李先生",
			"date": "2017-04-28",
			"score":3
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":2
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":1
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":0
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":5
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":0
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":4
		}, {
			"content": "感觉专业技能还有待于提高啊！",
			"client": "张女士",
			"date": "2017-04-25",
			"score":5
		}]
	},
	onLoad: function() {

	},
	loadMore:function(){
		console.log(1)
	}
};
Page(params);