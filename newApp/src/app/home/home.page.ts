import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl: AlertController, private navController: NavController, private router: Router, public toastController: ToastController) { }
  openNote() {
    this.navController.navigateRoot('/registerform')
  }
  private async presentToast() {
    const toast = await this.toastController.create({ message: "Patrol could not be logged.", duration: 3000 });
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
      header: "Login Error",
      message: 'Username or password is incorrect. Please try again.',
      buttons: ['Ok']
    });
    alert.present();
  }
  private async err2() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'The record will be permanently deleted.  Are you sure you want to continue?',
      buttons: [{text:'Cancel'},{text:'Delete'}] 
    });
    alert.present();
  }
  private async changeText()
{
  const toast = await this.toastController.create({ message: "Record added successful.", duration: 3000 });
  toast.present();
}
}
