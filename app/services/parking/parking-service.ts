'use strict';

import { Injectable } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let favorites = [],
    allParkingSpotsURL = 'https://gentle-inlet-96540.herokuapp.com/userInfo/api/allParkingSpots',
    addParkingSpotURL = 'https://gentle-inlet-96540.herokuapp.com/userInfo/api/addParkingSpot';
let headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': false,

});

@Injectable()
export class ParkingService {

    constructor(private http: Http) {
        this.http = http;
    }
    findAllSpots() {
        return this.http.get(allParkingSpotsURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    addSpot(property) {
        let body = JSON.stringify(property);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(addParkingSpotURL, body, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateSpot(property) {
        let body = JSON.stringify(property);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(addParkingSpotURL, JSON.stringify({ firstName: 'Joe', lastName: 'Smith' }), options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
