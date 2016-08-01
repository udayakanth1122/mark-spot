import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from './pages/home-page/home-page';
import {UserPage} from './pages/user-page/user-page';
import {ParkingService} from './services/parking/parking-service';
import {GeneralService} from './services/general-service';

import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';


@Component({
    template: '<ion-nav [root]="rootPage">Uday</ion-nav>'
})
export class MyApp {

    private rootPage: any;
    private splashScreen: any;
    constructor(private platform: Platform, private auth: AuthService) {
        this.rootPage = UserPage;
        this.platform = platform;
        this.splashScreen = Splashscreen;
        this.initializeApp();

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            this.auth.startupTokenRefresh();
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

ionicBootstrap(MyApp, [GeneralService, ParkingService, AuthService, provide(AuthHttp, {
    useFactory: (http) => {
        return new AuthHttp(new AuthConfig({ noJwtError: true }), http);
    },
    deps: [Http]
})]);
