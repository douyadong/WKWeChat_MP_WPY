var util = require('../../utils/util.js');
var request = require('../../utils/request.js');
Page({
    data: {
        offset: 0,
        pageSize: 10,
        totalCount: 0,
        loading: false,
        sourceType:'esfList',
        openType:'redirect'
    },
    onLoad: function(options) {
        /**
         * options中需要type,subEstateId,houseId和agentId
         * type -- 1:相似房源，2:在售房源
         */

        //按照h5做法，相似房源不分页，在售房源分页    
        this.setData(options);

        //设置导航条中的标题
        let title = "";
        switch (options.type) {
            case "1":
                title = "相似房源列表";
                break;
            case "2":
                title = "在售房源列表";
                break;
        }

        wx.setNavigationBarTitle({
            title: title,
        });
        this.getHouses();
    },
    onReachBottom: function() {
        if (this.data.type == 2 && this.data.offset < this.data.totalCount) {
            this.getHouses();
        }
    },
    onShow: function() {

    },
     onShareAppMessage: function() {
        return {
            title: '买房卖房，找好经纪人就对了！'
        }
    },
    getHouses: function() {
        if (this.data.loading) {
            return;
        }
        this.setData({ loading: true });
        var that = this;
        var moduleName, action, data;
        switch (this.data.type) {
            case "1":
                moduleName = "esf";
                action = "similar";
                data = {
                    houseId: this.data.houseId
                };
                break;
            case "2":
                moduleName = "estate";
                action = "sellingList";
                data = {
                    subEstateId: this.data.subEstateId,
                    offset: this.data.offset,
                    pageSize: this.data.pageSize
                };
                break;
        }

        request.fetch({
            //mock:true,
            showLoading: true,
            module: moduleName,
            action,
            data,
            success: function(data) {
                var esfSources = that.data.esfSources || [];
                if (!data.data) {
                    return false;
                }
                data.data.map(function(item) {
                    return esfSources.push(item);
                });

                that.data.totalCount = data.count;
                that.data.offset = that.data.offset + data.data.length;
                that.setData({
                    esfSources
                });
            },
            complete: function() {
                that.setData({ loading: false });
            }
        });
    }
})
