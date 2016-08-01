import {Component, enableProdMode, OnInit} from '@angular/core';
import {Loading, NavController, Alert} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {LaunchNavigator, LaunchNavigatorOptions} from 'ionic-native';

import {GeneralService} from '../../services/general-service';
import {HomePage} from '../home-page/home-page';
import {ParkingService} from '../../services/parking/parking-service';

enableProdMode();
var $main_color = '#2d313f',
    $saturation = -20,
    $brightness = 5;
var style = [
    {
        //set saturation for the labels on the map
        elementType: "labels",
        stylers: [
            { saturation: $saturation }
        ]
    },
    {	//poi stands for point of interest - don't show these lables on the map
        featureType: "poi",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },
    {
        //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
            { visibility: "off" }
        ]
    },
    {
        //don't show local road lables on the map
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [
            { visibility: "off" }
        ]
    },
    {
        //don't show arterial road lables on the map
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            { visibility: "off" }
        ]
    },
    {
        //don't show road lables on the map
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            { visibility: "off" }
        ]
    },
    //style different elements on the map
    {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "poi.sport_complex",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "landscape",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]

    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
        ]
    }
];

@Component({
    templateUrl: 'build/pages/user-page/user-page.html'
})
export class UserPage {

    map: any;
    navigate: any;
    coordsArr: any;
    addressArr: Array<any> = new Array<any>();
    currentLocation: any;
    spots: any;

    constructor(private nav: NavController, private generalService: GeneralService, private parkingService: ParkingService) {
        console.log('calling constructor...')
        this.navigate = nav;
        this.addressArr = new Array<any>();
        this.generalService = generalService;
        this.parkingService = parkingService;
        this.currentLocation = null;
        this.coordsArr = null;
        this.loadMap();
    }
    getCurrentPosition() {
        this.loadMap();
    }

    loadMap() {

        var loading = this.generalService.presentLoading(4000);
        this.navigate.present(loading);
        let options = { timeout: 10000, enableHighAccuracy: true };
        this.addressArr = new Array<any>();
        this.parkingService.findAll().subscribe(
            data => {
                this.coordsArr = data
                console.log(data);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                        let mapOptions = {
                            center: this.currentLocation,
                            zoom: 15,
                            panControl: false,
                            zoomControl: false,
                            mapTypeControl: false,
                            streetViewControl: true,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            scrollwheel: false,
                            styles: style,
                        };
                        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                        //get current position coordinates.
                        this.addMarker(true, this.map.getCenter(), "You are here.", '#1D2B64');

                        // get all available spots coordinates.
                        for (var key in this.coordsArr[0].parkingInfo) {
                            if (this.coordsArr[0].parkingInfo[key].isEmpty == true) {
                                this.addMarker(false, this.coordsArr[0].parkingInfo[key], this.coordsArr[0].id, '#753192');
                                var addressRequest = {
                                    latLng: new google.maps.LatLng(this.coordsArr[0].parkingInfo[key].lat, this.coordsArr[0].parkingInfo[key].lng)
                                };
                                this.getAddressAndDistance(addressRequest, this.currentLocation, key);
                            }
                        }
                    },
                    (error) => {
                        this.generalService.errorAlert("Loading Map Error: " + error);
                    }, options);
            },
            err => {
                this.generalService.errorAlert("Service Error: " + err);
            });

    }


    getAddressAndDistance(addressRequest: any, currentLocation, key: string) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode(addressRequest, (data, status) => {
            let distance = (google.maps.geometry.spherical.computeDistanceBetween(currentLocation, addressRequest.latLng) / 1000).toFixed(2);
            if (status == google.maps.GeocoderStatus.OK) {
                if (data[0] != null) {
                    this.addressArr.push({
                        'id': this.coordsArr[0].parkingInfo[key].id,
                        'address': data[0].formatted_address,
                        'distance': distance,
                        'destinationCoords': [this.coordsArr[0].parkingInfo[key].lat, this.coordsArr[0].parkingInfo[key].lng]
                    });
                } else {
                    console.log("No Spots Available");
                }
            }
        });
    }

    startNavigation(destination: any) {
        console.log('destCoords: ' + destination);
        let options: LaunchNavigatorOptions = {
            preferGoogleMaps: false,
            navigationMode: "maps"
        };
        var loading = this.generalService.presentLoading(4000);
        this.navigate.present(loading);
        LaunchNavigator.navigate([this.currentLocation.lat(), this.currentLocation.lng()], destination, options)
            .then(
            success => console.log("launched navigation"),
            error => this.generalService.errorAlert("Launching Navigation Error: " + error)
            );
    }

    addMarker(flag: boolean, coords: any, id: string, color: string) {
        console.log(coords);
        let markerOptions = {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: '#cccccc',
            strokeOpacity: 0.8,
            strokeWeight: 5,
            fillColor: color,
            fillOpacity: 0.8,
            scale: 10
        };
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: coords,
            icon: markerOptions
        });
        this.addInfoWindow(marker, id);
    }

    addInfoWindow(marker: any, content: string) {
        let infoWindow = new google.maps.InfoWindow({ content: content });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(this.map, marker);
        });
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

    login() {
        console.log('login...');
        this.navigate.push(HomePage);
    }
}
