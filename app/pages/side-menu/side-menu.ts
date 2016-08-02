import {Component} from '@angular/core';
import {Loading, NavController} from 'ionic-angular';
import {UserPage} from '../user-page/user-page';
import {Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/side-menu/side-menu.html'
})
export class SideMenu {

  navigate: any;

  constructor(nav: NavController) {
    this.navigate = nav;
  }

}
