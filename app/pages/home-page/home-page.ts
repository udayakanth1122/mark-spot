import {Component} from '@angular/core';
import {Loading, NavController} from 'ionic-angular';
import {UserPage} from '../user-page/user-page';
import {Geolocation} from 'ionic-native';
import {GeneralService} from '../../services/general-service';
import {AuthService} from '../../services/auth/auth';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {

  navigate: any;
  map: any;
  private generalService: GeneralService;

  constructor(nav: NavController, generalService: GeneralService, private auth: AuthService) {
    this.navigate = nav;
    this.map = null;
    this.generalService = generalService;
  }
  // function call when the user wants to find a parking spot.
  public park() {
    this.navigate.push(UserPage);
  }
  // function call when the user wants to leave from the parking spot.
  public leave() {
    this.getCurrentParkingLocation();
  }

  getCurrentParkingLocation() {
    let options = { timeout: 10000, enableHighAccuracy: true };
    var presentLoading = this.generalService.presentLoading(3000);
    var confirmAlert = this.generalService.greetingAlert("You registered a free parking spot.")
    this.navigate.present(presentLoading);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let arrayCoords = [];
        arrayCoords.push(position.coords.latitude);
        arrayCoords.push(position.coords.longitude);
        this.generalService.setCurrentPosition(arrayCoords);
        console.log(this.generalService.getCurrentPosition());
        this.navigate.present(confirmAlert);
      },
      (error) => {
        console.log(error);
      }, options
    );
  }
}
