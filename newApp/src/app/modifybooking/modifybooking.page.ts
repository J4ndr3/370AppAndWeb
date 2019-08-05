import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modifybooking',
  templateUrl: './modifybooking.page.html',
  styleUrls: ['./modifybooking.page.scss'],
})
export class ModifybookingPage implements OnInit {

  constructor(private alertCtrl: AlertController,public toastController: ToastController) { }

  ngOnInit() {
  }

  private async successToast() {
    const toast = await this.toastController.create({ message: "Booking modified successfully.", duration: 3000 });
    toast.present();
  }
  private async failedToast() {
    const toast = await this.toastController.create({ message: "Booking could not be modified.", duration: 3000 });
    toast.present();
  }
  private async modifyyesorno() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to modify this record?',
      buttons: ['Cancel','OK']
    });
    alert.present();
  }
}
