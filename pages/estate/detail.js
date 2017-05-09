var util = require('../../utils/util.js');
var $ = require('../../utils/extend.js');
var houseComment = require('../components/house-comment.js');
var request = require('../../utils/request.js');

var params = $.extend(true,{},{
     data: {
        now: "",
        imgUrls: [{
            url: "https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL",
            "type": "video"
        }, {
            url: "https://img.wkzf.com/05f0f10e3b714350acaf0785cdf83f06.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/d3cb48985d2b47949a6ce982d1bf1ca3.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/7490de2c618c4e129572accad3adc51e.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/3410510d92b84f3798bed69c494e0e22.DL",
            "type": "img"
        }, {
            url: "https://img.wkzf.com/1580f8be571d4c3d88c77839cd73d38a.DL",
            "type": "img"
        }],
        estateExpert: { //小区专家
            name: "",
            id: "",
            cellphone: "18856693"
        },
        info: {
            town: "", //所属板块
            propertyYear: "", //产权年限
            finishYear: "", //竣工年代
            totalHouse: "", //房屋总数
            propertyType: "", //物业类型
            proertyFee: "", //物业费
            greenRatio: "", //绿化率
            plotRatio: "", //容积率
            propertyCompany: "", //物业公司
            developer: "", //开发商
        },
        comments: [
            /*{
                  photo:"http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                  cellphone:"133*****2365",
                  labels:["",""],
                  content:"南北通透，黄金楼层，满五唯一，精装修。",
                  createDate:""+(new Date()),
                  upCount:"20",
                  downCount:"11"
                }*/
        ],
        loadingCount: 0
    },
      callEstateExpert: function() { //打电话给小区专家    
        wx.makePhoneCall({
            phoneNumber: this.data.estateExpert && this.data.estateExpert.cellphone
        })
    } ,
    preview: function(event) {
        console.log(event);
        wx.previewImage({
            current: event.target.dataset.imgUrl, // 当前显示图片的http链接
            urls: this.data.imgUrls.filter(function(item){return item.type==='img'}).map(function(item){return item.url})// 需要预览的图片http链接列表
        })
    },
    callExport:function(){  
        console.log(this.url);      
        wx.makePhoneCall({
          phoneNumber: this.data.estateExpert.cellphone,
          success: function(res) {
            // success
          }
        })
    },
    onLoad: function() {
              
    },
    onShow: function() {
        var v = [{
            commentId:"1",
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2016-03-01 12:02",
            upCount: "20",
            downCount: "11",
            isActive:false
        },{
            commentId:"2",
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2016-03-01 12:02",
            upCount: "20",
            downCount: "11",
            isActive:false
        },{
            commentId:"3",
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2016-03-01 12:02",
            upCount: "20",
            downCount: "11",
            isActive:false
        },{
            commentId:"4",
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2016-03-01 12:02",
            upCount: "20",
            downCount: "11",
            isActive:false
        },{
            commentId:"5",
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2016-03-01 12:02",
            upCount: "20",
            downCount: "11",
            isActive:false
        }];
        this.setData({
            comments: v
        })
    },
    onShareAppMessage: function() {

    },
    getEstateInfo: function() { //获取小区详情
        var that = this;
        wx.showLoading();
        wx.request({
            url: app.urls.estateInfoUrl,
            data: { //todo:此处需要根据接口定义提供调用参数

            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                // success
                //todo:此处需要把接口返回的数据转换成需要的格式，并调用that.setData()...

            },
            fail: function(res) {
                // fail
                //todo:错误提示
            },
            complete: function(res) {
                // complete        
                wx.hideLoading();
            }
        })
    }
},houseComment)

Page(params)