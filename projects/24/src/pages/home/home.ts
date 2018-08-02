import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { WeatherServicesProvider } from '../../providers/weather-services/weather-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: any;
  lng: any;
  list: any;
  theCountry: string = "Egypt";
  theWeather: any;

  constructor(
    public navCtrl: NavController,
    private weatherServices: WeatherServicesProvider,
    private platform: Platform,
  ) {

    this.platform.ready().then(() => {

      this.getWeather(this.theCountry);

      weatherServices.presentLoadingCustom();

      weatherServices.checkNetwork();

      weatherServices.getCureentLocation().then(pos => {
        // console.log(pos)
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.theCountry = "";
        this.getWeather(this.theCountry);
      }).catch(err => {
        console.log(err);
      })

      weatherServices.getCountriesList().subscribe(data => {
        this.list = data;
      })

    });

  }

  // get the Weather
  getWeather(country) {
    if (country == '') {
      this.weatherServices.getWeatherData(country, this.lat, this.lng).subscribe(data => {
        this.theWeather = data;
        // console.log(data);
      }, err => {
        // console.log(err);
        this.theWeather = "err";
      })
    } else if (country != '') {
      let Selectedcountry = country.split(' ');
      Selectedcountry = Selectedcountry[0];
      this.weatherServices.getWeatherData(Selectedcountry).subscribe(data => {
        this.theWeather = data;
        // console.log(data);
      }, err => {
        console.log(err);
        this.theWeather = "err";
      })
    }
  }

}
