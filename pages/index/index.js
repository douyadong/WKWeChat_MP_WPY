//工具方法
let _ = require('../../utils/extend.js')
var request = require('../../utils/request.js');
//筛选区域脚本
let filterAgentList = require('./filterAgentList/filterAgentList.js')
let util = require('../../utils/util.js')
let bigData = require('../../utils/bigData');
//写入一个唯一标识符
if (wx.getStorageSync('device') == '') {
    wx.setStorageSync('device', util.guid());
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 根据经纬度获取地理定位
 */
var getGeography = function(fu) {
        var geography = wx.getStorageSync('geography');
        if (geography == '') {
            let defineGeography = {
                    "cityId": 43,
                    "cityName": "上海",
                    "districtId": 45,
                    "townId": null,
                    "cityPinyin": "shanghaishi"
                }
                //地理定位
            wx.getLocation({
                type: 'wgs84',
                success: function(res) { //地理定位成功，获取经纬度
                    var latitude = res.latitude
                    var longitude = res.longitude
                    var speed = res.speed
                    var accuracy = res.accuracy
                        //根据精度纬度，获取当前所在的城市信息
                    request.fetch({
                        mock: !true,
                        module: 'index',
                        action: 'findCityInfoByLonAndLat',
                        data: {
                            lon: longitude,
                            lat: latitude
                        },
                        success: function(data) { //获取城市信息成功
                            if (data.status.toString() == '1' && data.data != null) {
                                wx.setStorageSync('location', data.data); //本地城市
                                wx.setStorageSync('geography', data.data);
                                fu(data.data);
                            } else {
                                wx.setStorageSync('geography', defineGeography);
                                fu(defineGeography);
                            }
                        },
                        fail: function() { //获取城市信息失败
                            wx.setStorageSync('geography', defineGeography);
                            fu(defineGeography);
                        }
                    });
                },
                fail: function() { //用户取消地理定位
                    wx.setStorageSync('geography', defineGeography);
                    fu(defineGeography);
                }
            })
        } else {
            fu(wx.getStorageSync('geography'));
        }
    }
    /**
     * 根据城市id获取详细信息
     */
var getCityBusinessById = function(cityId, fn) {
        request.fetch({
            mock: !true,
            module: 'index',
            action: 'getCityBusinessById',
            data: {
                cityId: cityId
            },
            success: function(data) { //获取城市信息成功
                if (data.status.toString() == "1" && data.data != null) {
                    fn(data.data);
                } else {
                    //使用地理定位的信息
                    getGeography(function(data) {
                        fn(data);
                    });
                }
            },
            fail: function() { //获取城市信息失败
                //使用地理定位的信息
                getGeography(function(data) {
                    fn(data);
                });
            }
        });
    }
    /**
     * 获取经纪人列表
     */
var getAgentList = function(cityId, districtAndTown, orderType, selectLabel, pageIndex, fn) {
    request.fetch({
        mock: !true,
        module: 'index',
        action: 'searchAgentList',
        data: {
            "cityId": cityId, //城市主键
            "districtAndTown": districtAndTown, //选中区域拼音。区域选的如果是不限，就传当前城市
            "orderType": orderType, //排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
            "selectLabel": selectLabel, //1.好经纪人 2.客户热评 3.推荐房源数量多
            "pageIndex": pageIndex, //起始条数 默认从0开始
            "pageSize": 10, //每页数量 默认10条
            "device": wx.getStorageSync('device')
        },
        success: function(data) {
            if (data.status.toString() == "1" && data.data != null && data.data.agentList != null && data.data.agentList.length > 0) {
                fn(data.data.agentList);
            } else {
                fn([]);
            }
        },
        fail: function() {
            fn([]);
        }
    });
}

/**
 * 通过code获取openId
 */
var getOpenId = function(fn) {
    request.fetch({
        mock: !true,
        module: 'logon',
        action: 'getOpenIdByCode',
        showLoading: false,
        data: {
            code: wx.getStorageSync('code')
        },
        success: function(data) {
            if (data.status.toString() == '1' && data.data != null && data.data != '') {
                wx.setStorageSync('openid', data.data);
                fn(data.data)
            } else {
                fn('fail')
                    //console.log("openId获取失败为空");
            }
        },
        fail: function() {
            fn('fail')
                //console.log("openId获取失败");
        }
    })
}

/**
 * 获取用户授权信息
 */
var getUserAuthorizedInfo = function(fu) {
    wx.login({
        success: function(msg) {
            if (msg.code) {
                wx.setStorageSync('code', msg.code);
            }
            wx.getUserInfo({
                withCredentials: true,
                success: function(res) {
                    // 把用户授权信息写入到本地
                    wx.setStorageSync('userAuthorizedInfo', res);
                    fu(res);
                },
                fail: function(msg) {
                    fu("fail");
                }
            })
        }
    })
}

/**
 * 添加微信用户到公司数据库
 */
var addOpenUser = function(openId, avatarUrl, city, country, gender, language, nickName, province) {
        request.fetch({
            mock: !true,
            module: 'logon',
            action: 'addWeixinUser',
            //method:'POST',
            data: {
                openId: openId,
                avatarUrl: avatarUrl,
                city: city,
                country: country,
                gender: gender,
                language: language,
                nickName: nickName,
                province: province
            },
            success: function(data) {
                if (data.status.toString() == "1" && data.data != null) {
                    //console.log("添加微信用户到公司数据库 成功");
                } else {
                    //console.log("添加微信用户到公司数据库 失败");
                }
            },
            fail: function() {
                //console.log("添加微信用户到公司数据库 失败");
            }
        });
    }
    /**
     * 通过 openid 判断是否已经绑定过手机接口
     */
var isBind = function(openid, fn) {
    request.fetch({
        mock: !true,
        module: 'logon',
        action: 'getWechatBindGuestInfo',
        showLoading: false,
        data: {
            openId: openid
        },
        success: function(data) {
            if (data.status.toString() == '1' && data.data != null && data.data != "") {
                //console.log("通过 openid 判断是否已经绑定过手机接口 ------已绑定，保存用户绑定信息到本地，userInfo 有值");
                wx.setStorageSync('userInfo', data.data);
                fn(data.data)
            } else {
                //console.log("通过 openid 判断是否已经绑定过手机接口 -----  没绑定");
            }
        },
        fail: function() {
            //console.log("通过 openid 判断是否已经绑定过手机接口 失败");
        }
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取应用实例
let app = getApp()
let main = {
    data: {
        //地理位置信息
        geography: {
            "cityId": 43,
            "cityName": "上海",
            "districtId": 45,
            "townId": null,
            "cityPinyin": "shanghaishi"
        },
        //经纪人列表
        agentList: [],
        //获取经纪人列表的筛选条件
        districtAndTown: "", //选中区域拼音
        orderType: 1, //排序类型 1.综合排序 2.评价分数从高到低 3.成交量从高到低 默认综合排序
        selectLabel: -1, //更多：-1.不限 1.好经纪人 2.客户热评 3.推荐房源数量多
        pageIndex: 0, //起始条数 默认从0开始
        isScrollIng: true, //是否滚动中
        onAgentList: false, //是否有经纪人列表,
        searchText: '搜索小区或经纪人姓名'
    },
    //根据城市id获取区域信息
    getCityAreasInfo(cityId) {
        let _this = this;
        //根据城市id，获取区域数据
        request.fetch({
            mock: !true,
            module: 'index',
            action: 'getCityAreasInfo',
            data: {
                cityId: cityId,
                houseType: 0 //0表示不区分新房和二手房1新房2二手房3租房
            },
            success: function(data) {
                _this.filterAgentListInit(data.data);
                wx.setStorage({
                    key: "cityInfo",
                    data: data.data
                })
            },
            fail: function(params) {
                _this.filterAgentListInit([]);
                wx.setStorage({
                    key: "cityInfo",
                    data: []
                })
            }
        });
    },
    //获取用户信息
    getUserInfo(fu) {
        var that = this
            //判断是否授权
        var userAuthorizedInfo = wx.getStorageSync('userAuthorizedInfo');
        if (userAuthorizedInfo == '') { //没有授权过
            getUserAuthorizedInfo(function(userAuthorizedInfo) {
                //根据code，获取openid
                getOpenId(function(openid) {
                    if (openid != 'fail' && userAuthorizedInfo != "fail") {
                        //添加微信用户到本地
                        let userInfo = userAuthorizedInfo.userInfo;
                        addOpenUser(openid, userInfo.avatarUrl, userInfo.city, userInfo.country, userInfo.gender, userInfo.language, userInfo.nickName, userInfo.province);
                        isBind(openid, function() {});
                    }
                });
                fu();
            });
        } else { //授权过
            fu();
        }
    },
    getAgentList: getAgentList,
    onLoad(options) {
        let _this = this;
        //判断用户是否扫经纪人详情页的二维码进入，如果是，则跳转到经纪人详情页
        var scene = options.scene;
        if (scene && scene.indexOf("agentId_") != -1) {
            wx.navigateTo({
                url: "/pages/agent/detail?agentId=" + (scene.split("_")[1])
            })
        }
        //获取用户信息
        _this.getUserInfo(function() {
            //判断是否选择了城市
            if (options.cityid == undefined) { //说明没有没选择城市，调用地理定位获取
                //根据经纬度，获取地理定位信息
                getGeography(function(data) {
                    //更新地理信息状态
                    _this.setData({
                        geography: data
                    });
                    //根据定位的地理信息，获取区域信息
                    _this.getCityAreasInfo(_this.data.geography.cityId);
                    if (options.districtAndTown == undefined) {
                        //设置区域
                        _this.setData({
                            districtAndTown: ""
                        })
                    } else {
                        //设置区域
                        _this.setData({
                            districtAndTown: options.districtAndTown
                        })
                    }
                    //获取经纪人
                    _this.getAgentList(
                        _this.data.geography.cityId,
                        _this.data.districtAndTown,
                        _this.data.orderType,
                        _this.data.selectLabel,
                        0,
                        function(agentList) {
                            _this.setData({
                                agentList: agentList,
                                pageIndex: 10
                            })
                        }
                    );
                })
            } else { //说明用户选择的是具体的城市
                //根据城市id获取地理位置定位信息
                getCityBusinessById(options.cityid, function(data) {
                    //更新地理信息状态
                    _this.setData({
                        geography: data
                    });
                    //把成功后的地理位置信息写入本地
                    wx.setStorageSync('geography', data);
                    //根据定位的地理信息，获取区域信息
                    _this.getCityAreasInfo(_this.data.geography.cityId);
                    //设置区域
                    _this.setData({
                            districtAndTown: ""
                        })
                        //获取经纪人
                    _this.getAgentList(
                        _this.data.geography.cityId,
                        _this.data.districtAndTown,
                        _this.data.orderType,
                        _this.data.selectLabel,
                        0,
                        function(agentList) {
                            _this.setData({
                                agentList: agentList,
                                pageIndex: 10
                            })
                        }
                    );
                });
            }
            //设置搜索默认显示
            if (options.selectCity != undefined) {
                _this.setData({
                    searchText: options.selectCity
                });
            }
        });


    },
    //滚动到底部异步加载经纪人列表
    scrolltolower() {
        let _this = this;
        if (_this.data.isScrollIng) {
            _this.setData({
                    isScrollIng: false
                })
                //获取经纪人
            _this.getAgentList(
                _this.data.geography.cityId,
                _this.data.districtAndTown,
                _this.data.orderType,
                _this.data.selectLabel,
                _this.data.pageIndex,
                function(agentList) {
                    if (agentList.length == 0) {
                        wx.showToast({
                            title: '没有数据啦',
                            icon: 'success',
                            duration: 1000
                        })
                    } else {
                        let oldAgentList = _this.data.agentList;
                        for (let i = 0; i < agentList.length; i++) {
                            oldAgentList.push(agentList[i]);
                        }
                        _this.setData({
                            agentList: oldAgentList,
                            isScrollIng: true,
                            pageIndex: _this.data.pageIndex + 10
                        })
                    }
                }
            );
        }
    },
    goBuy(e) {
        this.bigData(e);

        let url = e.currentTarget.dataset.url

        // 未登录跳转至 /pages/buy/index
        if (!app.isLogin(false)) {
            wx.navigateTo({
                url: '/pages/buy/index'
            })
        } else {
            let cityId = wx.getStorageSync('geography').cityId
            let guestId = wx.getStorageSync('userInfo').guestId

            request.fetch({
                'module': 'buy',
                'action': 'getDetails',
                'data': {
                    'guestId': guestId,
                    'cityId': cityId
                },
                'showBarLoading': false,
                'showLoading': false,
                success: function(res) {
                    if (res.data && res.data.orderAgentIdList && res.data.orderAgentIdList.length) {
                        wx.navigateTo({
                            url: '/pages/buy/recommend'
                        })
                    } else {
                        wx.navigateTo({
                            url: '/pages/buy/index'
                        })
                    }
                }
            })
        }
    },
    onShareAppMessage() {
        return {
            title: '买房卖房，找好经纪人就对了!',
            path: '/pages/index/index'
        }
    },
    goCity() {
        wx.navigateTo({
            url: '/pages/city/index'
        })
    },
    bigData: function(e) {
        bigData.send(e.currentTarget.dataset);
    }
}
Page(_.extend(true, main, filterAgentList))
