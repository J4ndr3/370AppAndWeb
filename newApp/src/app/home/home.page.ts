import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FcmService } from '../fcm.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
Email=this.storage.get("user");

  constructor(private alertCtrl: AlertController,private login:LoginService,private storage:Storage, private navController: NavController, private router: Router, public toastController: ToastController, public fcm: FcmService) { }
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
  this.storage.clear();
  this.login.user = null;
  this.login.pass = null;
  const toast = await this.toastController.create({ message:  this.Email["__zone_symbol__value"], duration: 3000 });
      toast.present();
  this.fcm.getNot();
  
}
}
