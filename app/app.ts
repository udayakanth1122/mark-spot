import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from './pages/home-page/home-page';
import {UserPage} from './pages/user-page/user-page';
import {HomeService} from './pages/home-page/home-page-service';


@Component({
  template: '<ion-nav [root]="rootPage">Uday</ion-nav>'
})
export class MyApp {

  private rootPage: any;
  private splashScreen: any;
  constructor(private platform: Platform) {
    this.rootPage = UserPage;
    this.platform = platform;
    this.splashScreen = Splashscreen;
    this.initializeApp();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  initializeApp() {
    this.splashScreen.show();
    this.platform.ready().then(() => {
      console.log('Platform ready');
      this.splashScreen.hide();
    });
  }
}

ionicBootstrap(MyApp, [HomeService]);
