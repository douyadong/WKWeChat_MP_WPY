var request = require('../../utils/request.js')

module.exports ={
	data:{
	} ,
	c_df_agentClick:function(e){
		var _this = this,
			scene = wx.getStorageSync('scene');
		if(scene === (1007 || 1008 || 1011 || 1012 || 1047 || 1048) ){
			wx.redirectTo({
		        url: '/pages/agent/detail?agentId='+this.data.agentInfo.agentId
	      	})
		}else{
			this.c_df_phoneClick();
		}
	},
	c_df_wechatClick:function(e){
		wx.navigateTo({
	        url: '/pages/agent/qrcode?agentId='+this.data.agentInfo.agentId
      	})
	},
	c_df_phoneClick:function(){
		var _this = this,
			agentInfo = this.data.agentInfo,			
			requestData ={
				agentMobile:agentInfo.agentMobile,
				agentId:agentInfo.agentId,
				workType:2,
				guid:wx.getStorageSync('userInfo').guestId || ''
			};			
		request.fetch({
            data:requestData,
            module:'components',
            action:'callAgent',
            showTitle:'电话拨打中',
            success:function(data){
            	if(data.status == 1){
            		wx.makePhoneCall({
					  	phoneNumber: data.data.dial + "," + data.data.digits //仅为示例，并非真实的电话号码
					})
            	}
            },
            fail:function(data){
            	wx.showModal({
                    title: '提示',
                    content: data.message || '拨打失败，稍后重试',
                    showCancel: false
                })
            }
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
