import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertCtrl: AlertController,private storage: Storage, private formBuilder: FormBuilder, private data: LoginService, private router: Router) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      User: ['', Validators.required],
      Pass: ['', Validators.required]
    });
    //this.storage.clear();
  }
  onSubmit() {
    var User = this.loginForm.get('User').value;
    var Pass = this.loginForm.get('Pass').value;
    if (User == '' || Pass == '') {
      alert("Pleas fill in all the values")
    }
    else {
      this.data.LogIn(User, Pass).subscribe(data => {
        this.storage.set("Ranger",data[0].Ranger);
        if (data[0].Correct == true) {
          this.storage.set('pass', Pass);
          this.storage.set('user', User);
          console.log(data[0])
          this.router.navigateByUrl('/');
        }
        else {
          sessionStorage.clear();
          this.Error();
        }
      });
    }


  }
  private async Error() {
    const alert = await this.alertCtrl.create({
      header: "Login Error",
      message: 'Username or Password incorrect. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
