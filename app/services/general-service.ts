'use strict';

import { Injectable } from '@angular/core';
import {Loading, NavController, Alert} from 'ionic-angular';

@Injectable()
export class GeneralService {
  currentPositionCoords: any;

  constructor() {
  }

  setCurrentPosition(coords: any) {
    this.currentPositionCoords = coords;
  }

  getCurrentPosition() {
    return this.currentPositionCoords;
  }

  presentLoading(value: number) {
    let loading = Loading.create({
      content: 'Please Wait...',
      duration: value
    });
    return loading;
  }

  errorAlert(message: string) {
    let alert = Alert.create({
      title: 'Failure',
      subTitle: message,
      buttons: ['Dismiss']
    });
    return alert;
  }

  greetingAlert(message: string) {
    let alert = Alert.create({
      title: 'Thank You!',
      subTitle: message,
      buttons: ['Ok']
    });
    return alert;
  }

  confirmAlert(message: string) {
    let confirm = Alert.create({
      title: 'Mark-Spot',
      message: 'Is the parking spot still available?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    return confirm;
  }

}
