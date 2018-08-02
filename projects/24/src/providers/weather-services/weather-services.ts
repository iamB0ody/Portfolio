import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the WeatherServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherServicesProvider {

  weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?";
  appid: string = "&appid=fabe0aa76733fe6ca2d2dc234844c01f";

  constructor(
    public http: HttpClient,
    private geo: Geolocation,
    private network: Network,
    private toastMessage: ToastController,
    public loadingCtrl: LoadingController
  ) {

  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

  alertMessage(mess, dur) {
    this.toastMessage.create({
      message: mess,
      duration: dur
    }).present();
  }

  checkNetwork() {
    this.network.onchange().subscribe(change => {
      let message = "Network is " + change.type;
      this.alertMessage(message, 5000);
    })
  }

  getWeatherData(country?, lat?, lng?) {
    // console.log(country, lat, lng)
    if (lat && lng && country == '') {
      let url = this.weatherApiUrl + "lat=" + lat + "&lon=" + lng + this.appid;
      return this.http.get(url);
    } else if (country != '') {
      let url = this.weatherApiUrl + "q=" + country + this.appid;
      return this.http.get(url);
    }
  }

  // get current location
  getCureentLocation() {
    return this.geo.getCurrentPosition();
  }

  // get list of countries
  getCountriesList() {
    let url = "https://restcountries.eu/rest/v2/all";
    return this.http.get(url);
  }

  // get weather data
  // getData() {
  //   var url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=" + this.appid;
  //   this.weatherData = this.http.get(url);
  //   this.weatherData.subscribe(data => {
  //     console.log(data);
  //   })
  // }

}
