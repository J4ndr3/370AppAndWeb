import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-rangerprofile',
  templateUrl: './rangerprofile.page.html',
  styleUrls: ['./rangerprofile.page.scss'],
})
export class RangerprofilePage implements OnInit {

  constructor(private alertCtrl: AlertController,public toastController: ToastController) { }

  ngOnInit() {
  }
  private async Successtoast() {
    const toast = await this.toastController.create({message:"Profile Successfully updated",duration:3000});
    toast.present();
  }
  private async failedtoast() {
    const toast = await this.toastController.create({message:"Failed to update. Retry.",duration:3000});
    toast.present();
  }

  private async containsmodifications() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to apply these changes?',
      buttons: [{text:'Cancel'},{text:'Apply'}] 
    });
    alert.present();
  }
}
