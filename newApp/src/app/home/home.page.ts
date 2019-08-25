import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { FcmService } from '../fcm.service';
import { ERPService } from '../erp.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Name:object;
  Points:Object;
  nName:Object;
  Surname:Object;
  constructor(private alertCtrl: AlertController, private navController: NavController, private router: Router, public toastController: ToastController, public fcm: FcmService,private data: ERPService) { }


  ngOnInit() {
    
    this.RangerDetails(3);
    }
    RangerDetails(ID){
     
      this.data.GetRangerID(ID).subscribe(res2 => {
        this.Name= res2['Name'];
        this.Points= res2['Points'];
        this.Surname= res2['Surname'];
        this.nName = {
          "Name": res2['Name']
        };
    })
    }


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
  const toast = await this.toastController.create({ message: "Record added successful.", duration: 3000 });
      toast.present();
  this.fcm.getNot();
  
}
}
