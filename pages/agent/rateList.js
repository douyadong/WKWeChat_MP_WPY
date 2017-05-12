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
			"comment": "服务态度很好，感觉非常靠谱的一个经纪人！",
			"guestName": "王先生",
			"createTimeString": "2017-05-03",
			"score":4
		}, {
			"comment": "很热情，很了解房源信息 ",
			"guestName": "李先生",
			"createTimeString": "2017-04-28",
			"score":3
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":2
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":1
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":0
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":5
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"date": "2017-04-25",
			"score":0
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":4
		}, {
			"comment": "感觉专业技能还有待于提高啊！",
			"guestName": "张女士",
			"createTimeString": "2017-04-25",
			"score":5
		}],
		isLoading:false,
		isAllowLoading:false
	},
	onLoad: function() {

	},
	loadMore:function(){
		if(this.data.isLoading || !this.data.isAllowLoading)return;
		console.log(1)
	}
};
Page(params);