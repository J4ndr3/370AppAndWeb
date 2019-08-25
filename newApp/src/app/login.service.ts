import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
user; 
pass; 
ranger;
  constructor(private http: HttpClient,private router:Router,private storage: Storage) { }
  LogIn(user,pass){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/Login/?Email='+user+'&Password='+pass)
  }
  LogedIn(user,pass)
  {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/LogedIn/?Email='+user+'&Password='+pass)
  }
  testlogin(){
    this.storage.get('user').then(res=>{
      this.user = res;
      this.storage.get('pass').then(res=>{
        this.pass = res
        var bool = false;
      this.LogedIn(this.user,this.pass).subscribe(data => {
        if (data[0].Logedin == false || data.toString() == "Access not allowed")
        {
          this.router.navigateByUrl('/login');
          bool= false;
        }
      else{
        bool= true;
      }})
      return bool;
      })
    })
  }
  resetOTP(email){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/ResetOTP/?Email='+email)
  }
  ResetPass(email, OTP,Password){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/Password/?Email='+email+'&Password='+Password+'&OTP='+OTP)
  }
}
