import {Component, provide} from '@angular/core';
import {App, Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from './pages/home-page/home-page';
import {UserPage} from './pages/user-page/user-page';
import {ParkingService} from './services/parking/parking-service';
import {GeneralService} from './services/general-service';
import {Utils} from './services/utils';

import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';


@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {

    private rootPage: any;
    private splashScreen: any;
    private pages: any;
    constructor(private platform: Platform, private auth: AuthService, private sideMenu: MenuController, private app: App) {
        this.app = app;
        this.rootPage = UserPage;
        this.platform = platform;
        this.splashScreen = Splashscreen;
        this.sideMenu = sideMenu;
        this.pages = [
            {
                title: 'Show Spots',
                component: UserPage
            },
            {
                title: 'Profile',
                component: HomePage
            }
        ];
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

    openPage(page) {
        this.sideMenu.close()
        let nav = this.app.getComponent('nav');
        this.rootPage = page.component;
    }

}

ionicBootstrap(MyApp, [GeneralService, ParkingService, AuthService, Utils,  provide(AuthHttp, {
    useFactory: (http) => {
        return new AuthHttp(new AuthConfig({ noJwtError: true }), http);
    },
    deps: [Http]
})]);
