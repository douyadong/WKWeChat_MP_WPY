"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：悟空找房+微信小程序
2. 文件名：src -> confs -> api.js
3. 作者：zhaohuagang@lifang.com
4. 备注：api接口地址配置文件
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
exports.default = {
    "dataStageEnv": "test", //调用哪个阶段环境的数据接口，有 test | sim | prod 3种值
    "timeout": 60 * 1000, //超时请求时间，单位：毫秒
    "successStatusCode": "1",
    "prefix": {
        "test": "https://minapp-test.yfyk365.com",
        "sim": "https://minapp-sim.yfyk365.com",
        "prod": "https://minapp.yfyk365.com"
    },
    "suffix": { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
        "common": {},
        "index": {
            "index": "",
            "city": "",
            "search": ""
        },
        "agent": {
            "index": ""
        },
        "esf": {
            "list": "",
            "detail": ""
        },
        "estate": {
            "detail": "",
            "comment": ""
        },
        "market": {
            "index": ""
        },
        "store": {
            "index": ""
        }
    }
};