"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./../confs/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
apiDataFilter的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
var apiDataFilter = {
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求数据 , successCallback的唯一参数为：response，返回的json数据应该这样取得：response.body
    @apiPath : 接口路径
    @data : 同步发送的参数
    @method : get | post | jsonp
    @showCustomLoading : 是否开启自定义的加载动画
    @showNavigationBarLoading : 是否开启小程序导航头loading
    @tips : 当请求结果异常时 是否开启message的提示
    @successCallback : 请求成功的回调处理
    @errorCallback : 请求异常的回调处理
    @completeCallback : 清酒完成就执行的回调
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    request: function request(_ref) {
        var apiPath = _ref.apiPath,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? {} : _ref$data,
            _ref$method = _ref.method,
            method = _ref$method === undefined ? "get" : _ref$method,
            _ref$dataType = _ref.dataType,
            dataType = _ref$dataType === undefined ? "json" : _ref$dataType,
            contentType = _ref.contentType,
            _ref$showNavigationBa = _ref.showNavigationBarLoading,
            showNavigationBarLoading = _ref$showNavigationBa === undefined ? false : _ref$showNavigationBa,
            _ref$showCustomLoadin = _ref.showCustomLoading,
            showCustomLoading = _ref$showCustomLoadin === undefined ? true : _ref$showCustomLoadin,
            _ref$tips = _ref.tips,
            tips = _ref$tips === undefined ? true : _ref$tips,
            successCallback = _ref.successCallback,
            errorCallback = _ref.errorCallback,
            completeCallback = _ref.completeCallback;

        var requestMethod = method.toLowerCase();
        var errorProcesser = errorCallback !== undefined && typeof errorCallback === "function" ? errorCallback : undefined.errorCallback;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        首先根据showNavigationBarLoading参数决定是否需要开启小程序导航栏的加载提示
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        showNavigationBarLoading && wx.showNavigationBarLoading();
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        首先根据showCustomLoading参数决定是否需要开启自定义的加载提示
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        if (showCustomLoading) {}
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        请求参数拼装
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        var params = {
            url: undefined.pathToUrl(apiPath),
            method: requestMethod,
            data: data,
            dataType: dataType,
            success: function success(res) {
                showNavigationBarLoading && wx.hideNavigationBarLoading();
                if (showCustomLoading) {}
                if (res.statusCode.toString() === "200" && res.data.status.toString() == _api2.default.successStatusCode) {
                    typeof successCallback == "function" && successCallback(res.data);
                } else {
                    if (tips) {}
                    errorProcesser(res.data.message);
                }
            },
            fail: function (_fail) {
                function fail(_x) {
                    return _fail.apply(this, arguments);
                }

                fail.toString = function () {
                    return _fail.toString();
                };

                return fail;
            }(function (error) {
                showNavigationBarLoading && wx.hideNavigationBarLoading();
                typeof fail == "function" && errorProcesser(error);
            }),
            complete: function (_complete) {
                function complete() {
                    return _complete.apply(this, arguments);
                }

                complete.toString = function () {
                    return _complete.toString();
                };

                return complete;
            }(function () {
                typeof complete == "function" && completeCallback();
            })
        };

        if (requestMethod == "post") {
            params.header = {
                "Content-Type": contenType
            };
        }
        wx.request(params);
    },
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求错误处理方法
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    errorCallback: function errorCallback(error) {
        console.log(error);
    },
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    根据apiPath返回apiUrl
    @apiPath：从api配置中suffix往下层写如："example.rent.detail"
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    pathToUrl: function pathToUrl(apiPath) {
        var pathArray = apiPath.split(".");
        var suffix = _api2.default.suffix;
        for (var n = 0; n < pathArray.length; n++) {
            suffix = suffix[pathArray[n]];
        }
        if (suffix === undefined) suffix = "";
        return _api2.default.prefix + "/" + suffix;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    整个工具定义结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

}; /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   1. 项目名称：悟空找房+微信小程序
   2. 文件名：src -> libraries -> apiDataFilter.js
   3. 作者：zhaohuagang@lifang.com
   4. 备注：请求api接口获取数据
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
exports.default = apiDataFilter;