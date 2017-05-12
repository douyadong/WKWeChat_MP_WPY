var request = require('../../utils/request.js');
let main = {
  data: {
      showCityIndex:0,
      locationCity:{cityId:"001",cityName:"上海"},//定位的国内城市
      domesticCitys:[],
      InternationalCity:{cityId:"001",cityName:"纽约"},//定位的国际城市
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
    let domesticCitys = [];//国内
    let InternationalCitys = [];//国际
    request.fetch({
        mock:true,
        module:'city',
        action:'list',
        data:{},
        success:function(data){
            let cityList = data.data;
            for(let i=0;i<cityList.length;i++){
              if(cityList[i].china){//是国内城市
                domesticCitys.push({
                  cityId:cityList[i].cityId,
                  cityName:cityList[i].cityName
                });
              }else{
                InternationalCitys.push({
                  cityId:cityList[i].cityId,
                  cityName:cityList[i].cityName
                });
              }
            }
        }
    });
    //console.log(domesticCitys);
    //console.log(InternationalCitys);
    this.setData({
        domesticCitys:domesticCitys,
        InternationalCitys:InternationalCitys
    })
  },
  setLocationCity(){
    //读取地理定位，判断是国内还是国外，设置不同的地理定位

  },
  onLoad(){
    this.getCity();
  }
}
Page(main)
