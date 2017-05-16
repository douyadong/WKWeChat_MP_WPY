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
var labels = [];

var params = {
    data: {
        "agentInfo":{
            agentId:100321,
            agentName:'王大明',
            headRoundImgUrl:'https://imgwater.oss.aliyuncs.com/748c4f4b1fbc449d8c98b9027d851e2e',
            isWellAgent:0
        },
        "status":{
            "score":0,
            "text":'',
            "labels":[],
            "content":''
        },
        "tagList":{
            'good':[
                {
                    id:0,
                    text:'礼貌热情',
                    isActive:false
                },{
                    id:1,
                    text:'仪表整洁',
                    isActive:false
                },{
                    id:2,
                    text:'比较专业',
                    isActive:false
                },{
                    id:3,
                    text:'诚实可靠',
                    isActive:false
                },{
                    id:4,
                    text:'熟悉房源',
                    isActive:false
                },{
                    id:5,
                    text:'勤于联系',
                    isActive:false
                }
            ],
            'bad':[
                {
                    id:10,
                    text:'不够热情',
                    isActive:true
                },{
                    id:11,
                    text:'仪表不整',
                    isActive:false
                },{
                    id:12,
                    text:'不够专业',
                    isActive:false
                },{
                    id:13,
                    text:'不够诚信',
                    isActive:false
                },{
                    id:14,
                    text:'房源不熟',
                    isActive:true
                },{
                    id:15,
                    text:'不给回音',
                    isActive:true
                }
            ]
        }
    },
    onLoad: function(option) {
        var initData = $.extend(true,{},option);
        request.fetch({
            data:initData,
            module:'agent',
            action:'getAgentInfo',
            success:function(data){
                if(data.status ===1){
                    this.setData({
                        "agentInfo.agentId":data.agentId,
                        "agentInfo.agentName":data.agentName,
                        "agentInfo.headRoundImgUrl":data.headRoundImgUrl,
                        "agentInfo.isWellAgent":data.isWellAgent
                    })
                }
            }.bind(this),
            fail:function(){

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
        console.log(this.data.status.labels)
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
            "status.nameless":value=='checked'?1:0
        })
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
            request.fetch({
                data:data,
                module:'agent',
                action:'writeRate',
                showLoading:true,
                showTitle:'提交中',
                success:function(data){
                    if(data.status === 1){
                        wx.navigateBack()
                    }
                }.bind(this),
                fail:function(){
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