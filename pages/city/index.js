var request = require('../../utils/request.js');
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
                if(cityList[i].china){//国内
                  domesticCitys.push(cityList[i]);
                }else{//国际
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
    //console.log( wx.getStorageSync('geography') );
    _this.setData({
      locationCity:wx.getStorageSync('location'),
      //InternationalCity:wx.getStorageSync('geography')
    });
  },
  onLoad(){
    this.getCity();
    this.setLocationCity();
  }
}
Page(main)
