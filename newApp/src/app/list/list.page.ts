import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit{
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  watchID;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  // private barcodeScanner: BarcodeScanner,
  constructor(public toastController: ToastController,private plt: Platform, private geolocation: Geolocation, private storage: Storage) {
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  // qr() {
  //   this.barcodeScanner
  //     .scan()
  //     .then(barcodeData => {
  //       alert("Barcode data " + JSON.stringify(barcodeData));
  //       this.scannedData = barcodeData;
  //     })
  //     .catch(err => {
  //       console.log("Error", err);
  //     });
  // }
 
  // encodedText() {
  //   this.barcodeScanner
  //     .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
  //     .then(
  //       encodedData => {
  //         console.log(encodedData);
  //         this.encodeData = encodedData;
  //       },
  //       err => {
  //         console.log("Error occured : " + err);
  //       }
  //     );
  // }

  ngOnInit() {
    this.plt.ready().then(() => {
      alert("ready");
      

      var onSuccess = function(position) {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        alert(position.coords.latitude)
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

  
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
             ,timeout : 5000
   });
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        alert(pos.coords.latitude)
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        alert('Error getting location '+error);
      });
     });
     this.loadHistoricRoutes();
  }
  private async presentToast() {
    const toast = await this.toastController.create({message:"You have no claimed rewards to view.",duration:3000});
    toast.present();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }
  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
  // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
      this.trackedRoute.push({ lat: position.coords.latitude, lng: position.coords.longitude });
      this.redrawPath(this.trackedRoute);
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  // Options: throw an error if no update is received every 30 seconds.
  //
 this.watchID= navigator.geolocation.watchPosition(onSuccess, onError,{
    enableHighAccuracy: true
         ,timeout : 50000
});
  }
 
  redrawPath(path) {
    alert("hit")
    if (this.currentMapTrack) {
      alert("Noo")
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      alert("Hallo")
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);
   
    this.isTracking = false;
    navigator.geolocation.clearWatch(this.watchID);
    this.currentMapTrack.setMap(null);
  }
   
  showHistoryRoute(route) {
    this.redrawPath(route);
    alert(route);
  }
}
