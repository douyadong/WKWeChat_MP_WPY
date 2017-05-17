var request = require('../../utils/request.js');
/**
 * 根据经纬度获取地理定位
 */
var getGeography = function() {
    let defineGeography = {
        "cityId": 43,
        "cityName": "上海市",
        "districtId": 45,
        "townId": null,
        "cityPinyin":"shanghaishi"
    }
    return new Promise(function (resolve, reject) {
      //地理定位
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {//地理定位成功，获取经纬度
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          //根据精度纬度，获取当前所在的城市信息
          request.fetch({
              mock:!true,
              module:'index',
              action:'findCityInfoByLonAndLat',
              data:{
                lon:longitude,
                lat:latitude
              },
              success:function(data){//获取城市信息成功
                if(data.status.toString() == '1' && data.data != null){
                    wx.setStorage({
                      key:"location",
                      data:data.data
                    });
                    resolve(data.data);
                }else{
                    resolve(defineGeography);
                }
              },
              fail:function() {//获取城市信息失败
                  resolve(defineGeography);
              }
          });
        },
        fail:function() {//用户取消地理定位
            resolve(defineGeography);
        }
      })
  })
}
let main = {
  data: {
      showCityIndex:0,
      locationCity:{"cityId":43, "cityName":"上海市", "districtId":45, "townId":null,"cityPinyin":"shanghaishi"},//定位的国内城市
      domesticCitys:[],
      //InternationalCity:{"cityId":43, "cityName":"上海市", "districtId":45, "townId":null,"cityPinyin":"shanghaishi"},//定位的国际城市
      InternationalCitys:[]
  },
  switchList(event){
    this.setData({
        showCityIndex:parseInt(event.currentTarget.dataset.index)
    })
  },
  selectedCity(event){
    console.log(event.currentTarget.dataset.cityid);
  },
  getCity(){
    let _this =this;
    let domesticCitys = [];//国内
    let InternationalCitys = [];//国际
    request.fetch({
        mock:!true,
        module:'city',
        action:'getAllCityBusiness',
        data:{},
        success:function(data){
            let cityList = data.data;
            for(let i=0;i<cityList.length;i++){
                if(cityList[i].china && cityList[i].oldBusiness){//国内
                  domesticCitys.push(cityList[i]);
                }else if(cityList[i].oldBusiness){//国际
                  InternationalCitys.push(cityList[i]);
                }
            }
            _this.setData({
              domesticCitys:domesticCitys,
              InternationalCitys:InternationalCitys
            });
        }
    });
  },
  setLocationCity(){
    //读取地理定位，判断是国内还是国外，设置不同的地理定位
    let _this =this;
    let location = wx.getStorageSync('location');
    if(location == ''){
      getGeography().then((data)=>{
        console.log(data);
        wx.setStorage({
          key:"location",
          data:data
        });
        _this.setData({
          locationCity:data,
        });
      });
    }else{
        _this.setData({
          locationCity:wx.getStorageSync('location'),
        });
    }
  },
  onLoad(){
    this.getCity();
    this.setLocationCity();
  }
}
Page(main)
