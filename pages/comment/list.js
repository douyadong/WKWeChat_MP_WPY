Page({
    data: {
        comments: [{
            photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
            cellphone: "133*****2365",
            labels: ["", ""],
            content: "南北通透，黄金楼层，满五唯一，精装修。",
            createDate: "2015-10-06 12:10",
            upCount: "20",
            downCount: "11",
            isActive: false
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: false
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: true
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: false
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: true
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: false
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: true
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: false
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: true
            }, {
                photo: "http://img.wkzf.com/5cbf79533866496bbec1cb60b28dce75.DL",
                cellphone: "133*****2365",
                labels: ["", ""],
                content: "南北通透，黄金楼层，满五唯一，精装修。",
                createDate: "2015-10-06 12:10",
                upCount: "20",
                downCount: "11",
                isActive: false
        }],
        isLoading:false,
    },
    onLoad: function() {

    },
    loadMore:function() {
        if(this.data.isLoading)return;
        this.setData({
            isLoading:true
        });
        console.log(1)
    }
})