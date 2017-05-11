Page({
    data: {
        comments: [],
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