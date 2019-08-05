import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  private async err1() {
    const alert = await this.alertCtrl.create({
      header: "Login Error",
      message: 'Username or Password incorrect. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }
}
