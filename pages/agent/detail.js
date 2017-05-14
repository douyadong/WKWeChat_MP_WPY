import request from "../../utils/request";

let params = {
    data: {},
    render: function(options) {
        let _ = this;
        let agentId = options.agentId;
        request.fetch({
            "module": "agent",
            "action": "detail",
            "data": { "agentId": agentId },
            "showLoading": true,
            "mock": true,
            success: function(res) {
                let result = res.data;
                //给二手房和新房两个组件赋值
                result.xfSources = result.recommendNewHouseList;
                delete result.recommendNewHouseList;
                result.esfSources = result.recommendOldHouseList;
                delete result.recommendOldHouseList;
                //默认设置推荐房源停留在新房这个tab，等待切换
                result.currentSourcesTab = "esf";
                //判断成交故事后面是否需要出...更多
                result.agentStoryExtendable = result.simpleAgentDetail.agentStory.length > 34 ? true : false;
                result.simpleAgentDetail.shortAgentStory = result.simpleAgentDetail.agentStory.substr(0, 34) + "...";
                //最后赋予模板变量
                _.setData(result);
            }
        });
    },
    //切换二手房新房tab的方法
    swapToTab: function(event) {
        this.setData({ "currentSourcesTab": event.currentTarget.dataset.tab });
    },
    //展开成交故事的方法
    extendAgentStory: function() {
        this.setData({ "agentStoryExtendable": false });
    },
    onLoad: function(options) {
        this.setData({
            agentId: options.agentId
        });
        this.render(options);
    }
};

Page(params);
