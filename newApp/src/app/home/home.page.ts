import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navController: NavController, private router: Router,public toastController: ToastController) {}
openNote(){
  this.navController.navigateRoot('/registerform')
}
private async presentToast() {
  const toast = await this.toastController.create({message:"Patrol could not be logged.",duration:3000});
  toast.present();}

}
