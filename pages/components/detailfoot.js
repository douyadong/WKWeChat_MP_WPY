module.exports ={
	data:{
		agentInfo: {
            "headRoundImgUrl": "https://img.wkzf.com/a365d1ae298c453f914ca45f910aa175",
            "agentName": '陈元杰',
            "abbreviation": '志远地产',
            "agentMobile":'13989890909',
            "weChatQRImgKey":'13989890909',
            "agentWChartQRImgUrl":"https://imgwater.oss.aliyuncs.com/67d28c90288a43238d311f2942d4f029",
            'isShowWXCode':true,
            "agentWChatId":''
        }
	},
	c_df_agentClick:function(e){
		var _this = this;
		if(true){
			wx.redirectTo({
		        url: '../agent/detail'
	      	})
		}else{
			wx.makePhoneCall({
			  	phoneNumber: _this.data.agentInfo.mobild //仅为示例，并非真实的电话号码
			})
		}
	},
	c_df_wechatClick:function(e){
		wx.navigateTo({
	        url: '../agent/qrcode'
      	})
		/*this.setData({
	      	'agentInfo.isShowWXCode':false
	    })*/
	},
	c_df_phoneClick:function(){
		var _this = this;
		wx.makePhoneCall({
		  	phoneNumber: _this.data.agentInfo.mobild //仅为示例，并非真实的电话号码
		})
	},
	c_df_hideClick:function(e){
		if(e.currentTarget.id==="agentCodeShadow"){
			this.setData({
		      	'agentInfo.isShowWXCode':true
		    })
		}
	},
	c_df_stopEvent:function(){
		
	}
}
