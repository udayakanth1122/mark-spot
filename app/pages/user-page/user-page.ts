import {Component, enableProdMode, OnInit} from '@angular/core';
import {Loading, NavController, Alert} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {LaunchNavigator, LaunchNavigatorOptions} from 'ionic-native';
import {HomeService} from '../home-page/home-page-service';
import {HomePage} from '../home-page/home-page';

enableProdMode();

@Component({
  templateUrl: 'build/pages/user-page/user-page.html'
})
export class UserPage {

  map: any;
  navigate: any;
  coordsArr: any;
  addressArr: Array<any> = new Array<any>();
  currentLocation: any;
  private homeService: HomeService

  constructor(private nav: NavController, homeService: HomeService) {
    console.log('calling constructor...')
    this.navigate = nav;
    this.addressArr = new Array<any>();
    this.homeService = homeService;
    this.currentLocation = null;
    this.coordsArr = [
      {
        id: 'A',
        lat: 37.406060176588674,
        lng: -121.93370676190186
      },
      {
        id: 'B',
        lat: 37.404594300000056,
        lng: -121.94340562969971
      }
    ];
    this.loadMap();
  }
  getCurrentPosition() {
    this.loadMap();
  }


  loadMap() {
    var loading = this.homeService.presentLoading(4000);
    this.navigate.present(loading);

    this.addressArr = new Array<any>();
    let options = { timeout: 10000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
        this.addMarker(true, this.map.getCenter(), "You are here.", '#1D2B64');
        for (var key in this.coordsArr) {
          console.log("test 2");
          this.addMarker(false, this.coordsArr[key], this.coordsArr[key].id, '#753192');
          var addressRequest = {
            latLng: new google.maps.LatLng(this.coordsArr[key].lat, this.coordsArr[key].lng)
          };
          this.getAddressAndDistance(addressRequest, this.currentLocation, key);
        }
      },

      (error) => {
        this.homeService.errorAlert("Loading Map Error: " + error);
      }, options);
  }


  getAddressAndDistance(addressRequest: any, currentLocation, key: string) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode(addressRequest, (data, status) => {
      let distance = (google.maps.geometry.spherical.computeDistanceBetween(currentLocation, addressRequest.latLng) / 1000).toFixed(2);
      if (status == google.maps.GeocoderStatus.OK) {
        if (data[0] != null) {
          this.addressArr.push({
            'id': this.coordsArr[key].id,
            'address': data[0].formatted_address,
            'distance': distance,
            'destinationCoords': [this.coordsArr[key].lat, this.coordsArr[key].lng]
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
    var loading = this.homeService.presentLoading(4000);
    this.navigate.present(loading);
    LaunchNavigator.navigate([this.currentLocation.lat(), this.currentLocation.lng()], destination, options)
      .then(
      success => console.log("launched navigation"),
      error => this.homeService.errorAlert("Launching Navigation Error: " + error)
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
