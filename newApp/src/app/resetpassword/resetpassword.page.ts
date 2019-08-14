import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  constructor(private alertCtrl: AlertController, public toastController: ToastController) { }

  ngOnInit() {
  }

  private async err() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'Email not found. Please try again.',
      buttons: [{text:'OK'}] 
    });
    alert.present();
  }

  private async presentToast() {
    const toast = await this.toastController.create({ message: "Email could not be sent.", duration: 3000 });
    toast.present();
  }

  private async err1() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'OTP does not match the sent OTP.',
      buttons: [{text:'OK'}] 
    });
    alert.present();
  }

  private async showToast1() {
    const toast = await this.toastController.create({ message: "Password changed successfully.", duration: 3000 });
    toast.present();
  }
}
