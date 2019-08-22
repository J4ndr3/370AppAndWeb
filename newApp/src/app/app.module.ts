import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as $ from 'jquery';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import {BarcodeScanner} from '@ionic-native/barcode-scanner'; // QR scanning attempt
import { RangerprofilePageModule } from './rangerprofile/rangerprofile.module';

const firebaseConfig = {
  apiKey: "AIzaSyDPkIMLCVqfgX48Vyx9xl6HpPvs4UfiOnQ",
  authDomain: "jandre-17a91.firebaseapp.com",
  databaseURL: "https://jandre-17a91.firebaseio.com",
  projectId: "jandre-17a91",
  storageBucket: "",
  messagingSenderId: "733797340390",
  appId: "1:733797340390:web:9b1c2b75ca0ff08d"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NgCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RangerprofilePageModule,
    StatusBar,
    SplashScreen,
    Firebase,
        QRScanner,
        Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
