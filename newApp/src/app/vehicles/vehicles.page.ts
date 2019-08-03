import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  constructor(private alertCtrl: AlertController,public toastController: ToastController) { }

  ngOnInit() {
  }

  private async successToast() {
    const toast = await this.toastController.create({ message: "Vehicle modified successfully.", duration: 3000 });
    toast.present();
  }
  private async failedToast() {
    const toast = await this.toastController.create({ message: "Vehicle could not be modified.", duration: 3000 });
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
