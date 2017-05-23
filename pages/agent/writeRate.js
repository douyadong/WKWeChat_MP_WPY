var $ = require('../../utils/extend.js');
var request = require('../../utils/request.js')


Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

var status = [{},{
        "score":1,
        "text":'非常不满意，指出不足'
    },{
        "score":2,
        "text":'不满意，指出不足'
    },{
        "score":3,
        "text":'服务一般，指出不足'
    },{
        "score":4,
        "text":'比较满意，指出不足'
    },{
        "score":5,
        "text":'非常满意，夸夸经纪人吧'
    }
];
var labels = [],
    guestId = 0,
    isSending = false;

var params = {
    data: {
        "agentInfo":{
        },
        "status":{
            "score":0,
            "text":'',
            "labels":[],
            "content":'',
            'nameless':0
        },
        "tagList":{
        }
    },
    onLoad: function(option) {
        var initData = $.extend(true,{},option);
        guestId = wx.getStorageSync('userInfo').guestId;
        request.fetch({
            data:initData,
            module:'agent',
            action:'getAgentInfo',
            success:function(data){
                if(data.status ===1){
                    this.setData({
                        "agentInfo.agentId":data.data.agentId,
                        "agentInfo.agentName":data.data.agentName,
                        "agentInfo.headRoundImgUrl":data.data.headRoundImgUrl,
                        "agentInfo.isWellAgent":data.data.isWellAgent
                    })
                }
            }.bind(this),
            fail:function(){
                console.log('获取经纪人id失败')
            }
        })
        request.fetch({
            data:{},
            module:'agent',
            action:'getCommentTag',
            success:function(data){
                if(data.status ===1){
                    var goods = data.data.goodComments,
                        bads = data.data.badComments;
                    goods.forEach(function(item,index){
                        item['isActive']=false;
                    })
                    bads.forEach(function(item,index){
                        item['isActive']=false;
                    })
                    this.setData({
                        "tagList.good":data.data.goodComments,
                        "tagList.bad":data.data.badComments
                    })
                }
            }.bind(this),
            fail:function(){
                console.log('获取经纪人id失败')
            }
        })
    },
    bindStarClick:function(e){
        var index = e.currentTarget.dataset.id;
        this.setData({
            "status.score":status[index].score,
            "status.text":status[index].text,
        })
        labels= [];
        this.setLabels();
    },
    bindLabelClick:function(e){
        var _this=this,
            id = e.currentTarget.dataset.id,
            type = this.data.status.score==5?"good":"bad",
            arr = [];
        this.data.tagList[type].forEach(function(item,index){
            if(item.id == id){
                var key = "tagList."+type+"["+index+"].isActive",
                    value = _this.data.tagList[type][index].isActive?false:true;
                _this.setData({
                    [key]:value
                })
            }
        })
        if(labels.indexOf(id)!=-1){
            labels.splice(labels.indexOf(id),1)
        }else{
            labels.push(id);  
        }
        _this.setData({
            "status.labels":labels
        })
        console.log(labels)
    },
    setLabels:function(){
        var _this= this;
        this.data.tagList.good.forEach(function(item,index){
            var key = "tagList.good["+index+"].isActive",
                value =false;
            _this.setData({
                [key]:value,
                "status.labels":[]
            })
        })
        this.data.tagList.bad.forEach(function(item,index){
            var key = "tagList.bad["+index+"].isActive",
                value =false;
            _this.setData({
                [key]:value,
                "status.labels":[]
            })
        })
    },
    bindinput:function(e){
        this.setData({
            "status.content":e.detail.value
        })
    },
    bindSwitchChange:function(e){
        var value =  e.detail.value;
        this.setData({
            "status.nameless":value==value?1:0
        })
    },
    switchLabel:function(arr){
        var newArr = arr;
        for(var i=0;i<newArr.length;i++){
            newArr.splice(i,1,{labelId:newArr[i]})
        }
        return newArr;
    },
    bindSubmitClick:function(){
        var data = this.data.status;
        if(data.score === 0){
            wx.showModal({
                title: '提示',
                content: '请选择评分星级',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
        }else if(data.content == ''){
            wx.showModal({
                title: '提示',
                content: '请填写评论内容',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
        }else{
            if(isSending) return;
            isSending = true;
            var requestData = {
                agentId:this.data.agentInfo.agentId,
                commentType:3,
                guestId:guestId,
                score:data.score,
                nameless:data.nameless,
                content:data.content,
                labels:this.switchLabel(labels)
            }
            
            request.fetch({
                data:requestData,
                module:'agent',
                action:'writeRate',
                method:'POST',
                showLoading:true,
                showTitle:'提交中',
                success:function(data){
                    if(data.status === 1){
                        isSending = false;
                        wx.navigateBack()
                    }
                }.bind(this),
                fail:function(){
                    isSending = false;
                    wx.showModal({
                        title: '提示',
                        content: '评论失败，稍后再试',
                        showCancel: false
                    })
                }.bind(this)
            })
        }
    }
};
params = $.extend(true, {}, params);

Page(params);