import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})
export class IncidentsPage implements OnInit {

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  private async presentToast() {
    const toast = await this.toastController.create({message:"Incident could not be reported.",duration:3000});
    toast.present();}

}
