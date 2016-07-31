import {Component} from '@angular/core';
import {Loading, NavController} from 'ionic-angular';
import {UserPage} from '../user-page/user-page';
import {Geolocation} from 'ionic-native';
import {HomeService} from './home-page-service';
import {AuthService} from '../../services/auth/auth';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {

  navigate: any;
  map: any;
  private homeService: HomeService;

  constructor(nav: NavController, homeService: HomeService, private auth: AuthService) {
    this.navigate = nav;
    this.map = null;
    this.homeService = homeService;
  }
  // function call when the user wants to find a parking spot.
  park() {
    this.navigate.push(UserPage);
  }
  // function call when the user wants to leave from the parking spot.
  leave() {
    this.getCurrentParkingLocation();
  }

  getCurrentParkingLocation() {
    let options = { timeout: 10000, enableHighAccuracy: true };
    var presentLoading = this.homeService.presentLoading(3000);
    var confirmAlert = this.homeService.greetingAlert("You registered a free parking spot.")
    this.navigate.present(presentLoading);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let arrayCoords = [];
        arrayCoords.push(position.coords.latitude);
        arrayCoords.push(position.coords.longitude);
        this.homeService.setCurrentPosition(arrayCoords);
        console.log(this.homeService.getCurrentPosition());
        this.navigate.present(confirmAlert);
      },
      (error) => {
        console.log(error);
      }, options
    );
  }
}
