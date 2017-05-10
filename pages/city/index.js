let main = {
  data: {
      showCityIndex:0,
      locationCity:"上海",//定位城市
      domesticCitys:[{cityId:"001",cityName:"上海"},{cityId:"002",cityName:"北京"},{cityId:"003",cityName:"天津"},{cityId:"004",cityName:"南京"}],
      InternationalCity:"纽约",
      InternationalCitys:[{cityId:"001",cityName:"纽约"},{cityId:"002",cityName:"华盛顿"},{cityId:"003",cityName:"硅谷"},{cityId:"004",cityName:"拉斯维加斯"}],
  },
  switchList(event){
    this.setData({
        showCityIndex:parseInt(event.currentTarget.dataset.index)
    })
  },
  selectedCity(event){
    console.log(event.currentTarget.dataset.cityid);
  },
  onLoad(){
    
  }
}
Page(main)
