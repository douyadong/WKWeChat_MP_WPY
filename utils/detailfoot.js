module.exports ={
	data:{
		agentInfo: {
            "agentImage": "https://img.wkzf.com/a365d1ae298c453f914ca45f910aa175",
            "agentName": '陈元杰',
            "agentCompany": '志远地产',
            "agentPhoneNum":'13989890909',
            "agentWechatNum":'13989890909',
            "agentCodeImg":"https://imgwater.oss.aliyuncs.com/67d28c90288a43238d311f2942d4f029",
            'isShowWXCode':true,
            "hasWechatNum":true
        }
	},
	c_agentClick:function(e){
		wx.navigateTo({
	        url: '../agent/detail'
      	})
	},
	c_wechatClick:function(e){
		this.setData({
	      	'agentInfo.isShowWXCode':false
	    })
	},
	c_phoneClick:function(){
		var _this = this;
		wx.makePhoneCall({
		  	phoneNumber: _this.data.agentInfo.agentPhoneNum //仅为示例，并非真实的电话号码
		})
	},
	c_hideClick:function(e){
		if(e.currentTarget.id==="agentCodeShadow"){
			this.setData({
		      	'agentInfo.isShowWXCode':true
		    })
		}
	},
	c_stopEvent:function(){
		
	}
}
