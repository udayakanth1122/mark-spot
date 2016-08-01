'use strict';

import { Injectable } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let favorites = [],
    propertiesURL = 'https://gentle-inlet-96540.herokuapp.com' + '/userInfo/parkingSpots';

@Injectable()
export class ParkingService {

    constructor(private http: Http) {
        this.http = http;
    }
    findAll() {
        return this.http.get(propertiesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // favorite(property) {
    //     let body = JSON.stringify(property);
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(favoritesURL, body, options)
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
