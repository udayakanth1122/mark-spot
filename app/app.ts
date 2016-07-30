import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from './pages/home-page/home-page';
import {UserPage} from './pages/user-page/user-page';
import {HomeService} from './pages/home-page/home-page-service';
import {AuthService} from './services/auth/auth';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';


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

ionicBootstrap(MyApp, [HomeService, provide(AuthHttp, {
    useFactory: (http) => {
        return new AuthHttp(new AuthConfig({ noJwtError: true }), http);
    },
    deps: [Http]
}), AuthService]);
