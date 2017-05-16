module.exports ={
	data:{
	} ,
	c_df_agentClick:function(e){
		var _this = this,
			scene = wx.getStorageSync('scene');
		if(scene!= 1001){
			wx.redirectTo({
		        url: '../agent/detail?agentId='+this.data.agentInfo.agentId
	      	})
		}else{
			wx.makePhoneCall({
			  	phoneNumber: _this.data.agentInfo.agentMobile //仅为示例，并非真实的电话号码
			})
		}
	},
	c_df_wechatClick:function(e){
		wx.navigateTo({
	        url: '../agent/qrcode?agentId='+this.data.agentInfo.agentId
      	})
	},
	c_df_phoneClick:function(){
		var _this = this;
		wx.makePhoneCall({
		  	phoneNumber: _this.data.agentInfo.agentMobile //仅为示例，并非真实的电话号码
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
