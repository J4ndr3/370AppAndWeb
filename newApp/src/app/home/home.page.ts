import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FcmService } from '../fcm.service';
import { LoginService } from '../login.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';      
declare var google;
import { ERPService } from '../erp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
Email;

  constructor(private alertCtrl: AlertController,private login:LoginService,private storage:Storage, private navController: NavController, private router: Router, public toastController: ToastController, public fcm: FcmService, private geolocation: Geolocation, private data:ERPService) {
    this.data.GetRanger(this.ID).subscribe(res=>{
      this.Ranger=res;
      console.log(res);
    })
   }

  NewIncident:object;
  newPatrol:object;
  ID=3;
  Ranger:any;

 // constructor(private alertCtrl: AlertController, private navController: NavController, private router: Router, public toastController: ToastController, public fcm: FcmService, private geolocation: Geolocation, private data:ERPService) {
    
   //}
  

  openNote() {
    
    this.navController.navigateRoot('/registerform')
  }
 
  private async presentToast() {
    const toast = await this.toastController.create({ message: "Check-in successful", duration: 3000 });
    toast.present();
  }
  private async err() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'The input provided is incorrect. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

  private async err1() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'OTP does not match the sent OTP',
      buttons: ['OK']
    });
    alert.present();
  }
  private async err2() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to modify this record?',
      buttons: [{text:'Modify'},{text:'OK'}] 
    });
    alert.present();
  }
  private async changeText()
{
  const toast = await this.toastController.create({ message: "Record added successful.", duration: 3000 });
  toast.present();
}
private async hallo(){
  //this.storage.clear();
  //this.login.user = null;
  //this.login.pass = null;
   this.storage.get("Ranger").then(res=>{
    this.Email = res;
   })
  const toast = await this.toastController.create({ message:  this.Email, duration: 3000 });
      toast.present();
  this.fcm.getNot();
  
}

PoachingIncident(){
  let latLng;
      var onSuccess = function (position) {
         latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
      };
      
      function onError(error) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
        , timeout: 5000
      });
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      }).catch((error) => {
        alert('Error getting location ' + error);
      });

  let self = this;
  this.NewIncident = {
    "Incident_Type_ID": '1', // Names for your input
    "Incident_Status_ID": '2',
    "Description":"Poaching"
    
  };
  this.data.sendNotif("Poaching","There has been a poaching");
  this.data.PostIncident(this.NewIncident).subscribe(res => {
    console.log();
    this.newPatrol = {
      "Incident_ID": res["Incident_ID"],
      "Patrol_Log_ID": 1,
      "Lat": latLng.lat(),
      "Lng": latLng.lng(),
      "Time": new Date().toLocaleTimeString(),
      "Date": new Date().toDateString()
    }

    this.data.PostIncident_Patrol(this.newPatrol).subscribe(res=>{
      console.log(res);
    });
    this.router.navigateByUrl("/home");
    this.IncidentToast();
    });
}

IntruderIncident(){
  let latLng;
      var onSuccess = function (position) {
         latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
      };
      
      function onError(error) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
        , timeout: 5000
      });
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      }).catch((error) => {
        alert('Error getting location ' + error);
      });

  let self = this;
  this.NewIncident = {
    "Incident_Type_ID": '3', // Names for your input
    "Incident_Status_ID": '2',
    "Description":"Intruder"
    
  };
  this.data.sendNotif("Poaching","There is an intruder in the reserve");
  this.data.PostIncident(this.NewIncident).subscribe(res => {
    console.log();
    this.newPatrol = {
      "Incident_ID": res["Incident_ID"],
      "Patrol_Log_ID": 1,
      "Lat": latLng.lat(),
      "Lng": latLng.lng(),
      "Time": new Date().toLocaleTimeString(),
      "Date": new Date().toDateString()
    }

    this.data.PostIncident_Patrol(this.newPatrol).subscribe(res=>{
      console.log(res);
    });
    this.router.navigateByUrl("/home");
    this.IncidentToast();
    });
}


private async IncidentToast() {
  const toast = await this.toastController.create({message:"Incident successfully reported.",duration:3000});
  toast.present();
}

}

