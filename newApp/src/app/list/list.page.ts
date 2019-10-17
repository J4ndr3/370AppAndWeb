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
import { ERPService } from '..//erp.service';
import { NavController, Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

declare var google;
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  watchID;
  isTracking = false;
  trackedRoute: Array<object>;

  myroute = [];
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
  previousTracks: Array<object>;
  // private barcodeScanner: BarcodeScanner,
  constructor(public toastController: ToastController, private dataService: ERPService, private plt: Platform, private geolocation: Geolocation, private storage: Storage) {
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
      var self = this;
      self.previousTracks = [];
      var onSuccess = function (position) {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        self.map.setCenter(latLng);
        self.map.setZoom(16);

      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }


      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
        , timeout: 5000
      });
      self.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        self.map.setCenter(latLng);
        self.map.setZoom(16);
      }).catch((error) => {
        alert('Error getting location ' + error);
      });
    });
    this.loadHistoricRoutes();
  }
  public async presentToast() {
    const toast = await this.toastController.create({ message: "You have no claimed rewards to view.", duration: 3000 });
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
    var self = this;
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
      var locations = { lat: position.coords.latitude, lng: position.coords.longitude };
      var locationJ = JSON.parse(JSON.stringify(locations))
      self.trackedRoute.push(locationJ);
      self.redrawPath(self.trackedRoute);
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true
      , timeout: 50000
    });
  }

  redrawPath(path) {
    console.log(path);
    var self = this;
    if (self.currentMapTrack) {
      self.currentMapTrack.setMap(null);
    }
    // map should be your map class
    if (path.length > 1) {
      self.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: 'green',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      var bounds = new google.maps.LatLngBounds();
      for (var i in path) // your marker list here
      {
        console.log(path[i])
        bounds.extend(path[i])
      }
      // your marker position, must be a LatLng instance

      self.map.fitBounds(bounds);
      self.currentMapTrack.setMap(self.map);
      // var data = document.getElementById('contentToConvert');
      // html2canvas(data).then(canvas => {
      // //Few necessary setting options
      // var imgWidth = 50;
      // var pageHeight = 295;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      // var heightLeft = imgHeight;
       
      // const contentDataURL = canvas.toDataURL('image/png')
      // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      // var position = 0;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

      
      // pdf.save('QR.pdf'); // Generated PDF
      
      // });

    }
  }
  stopTracking() {
    var self = this;
    let newRoute = { finished: new Date().getTime(), path: self.trackedRoute };
    self.previousTracks.push(newRoute);
    self.storage.set('routes', this.previousTracks);

    self.isTracking = false;
    navigator.geolocation.clearWatch(this.watchID);
    self.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route1) {
    //var r;
    var self = this;
    self.myroute = [];
    route1.forEach(element => {
      self.myroute.push({ Longitude: element.lng, Lattitude: element.lat, Patrol_Log_ID: 1 })
    });
    this.dataService.PostRoute(self.myroute).subscribe();
    this.redrawPath(route1);
  }
}1
