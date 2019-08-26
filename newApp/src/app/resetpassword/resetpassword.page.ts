import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  AddForm: FormGroup;
  OTPForm: FormGroup;
  PasswordForm: FormGroup;
  EmailF = true;
  OTPF = false;
  PassF = false;
  OTP: any;
  constructor(private alertCtrl: AlertController, public toastController: ToastController, private formbuilder: FormBuilder, private login: LoginService, private router: Router) { }

  ngOnInit() {
    this.AddForm = this.formbuilder.group({
      Email: []
    })
    this.OTPForm = this.formbuilder.group({
      OTP: []
    })
    this.PasswordForm = this.formbuilder.group({
      Password: [],
      Confirm: []
    })
  }
  resetOTP() {
    var email = this.AddForm.get('Email').value;
    this.login.resetOTP(email).subscribe(res => {
      if (res[0]["Correct"]) {
        this.OTPF = true;
        this.EmailF = false;
        this.OTP = res[0]["OTP"]
        console.log(this.OTP)
      }
      else{
        this.err();
      }

    })

  }
  Pass() {
    var OTP = this.OTPForm.get('OTP').value;
    if (this.OTP == OTP) {
      this.OTPF = false;
      this.PassF = true;
    }
    else {
      this.err1();
    }
  }
  resetp() {
    var email = this.AddForm.get('Email').value;
    var OTP = this.OTPForm.get('OTP').value;
    var Password = this.PasswordForm.get('Password').value;
    console.log(email, OTP, Password);
    this.login.ResetPass(email, OTP, Password).subscribe(res => {
      if (res[0]["Correct"]) {
        this.showToast1();
        this.router.navigateByUrl("/login")
      }
      console.log(res)
    })
  }
  private async err() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'Email not found. Please try again.',
      buttons: [{ text: 'OK' }]
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
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  private async showToast1() {
    const toast = await this.toastController.create({ message: "Password changed successfully.", duration: 3000 });
    toast.present();
  }
}
