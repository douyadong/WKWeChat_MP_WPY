var $ = require('../../utils/extend.js');
var detailfoot = require('../../utils/detailfoot.js');
var params = {
  data: {
    "imgUrls": [{
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
    "xfSources": [
      {
        "thumbnail": "https://img.wkzf.com/e13cc00ccbb547f9b7e63454535cabb0.ML",
        "title": "翠湖天地御园",
        "area": "78㎡-120㎡",
        "location": "浦东 花木",
        "price": "45800"
      },
      {
        "thumbnail": "https://img.wkzf.com/1841a25ec70b499e99f1745dae82ff40.ML",
        "title": "翠湖天地御园",
        "area": "78㎡-120㎡",
        "location": "浦东 花木",
        "price": "45800"
      }
    ]
  },  
  onLoad: function () {

  }
};
params = $.extend(true, {}, params, detailfoot);
Page(params);