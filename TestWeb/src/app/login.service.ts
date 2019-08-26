import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
sNav=false;
  constructor(private http: HttpClient,private router:Router) { }
  LogIn(user,pass){
    return this.http.get('http://localhost:51389/api/Login/Login/?Email='+user+'&Password='+pass)
  }
  LogedIn(user,pass)
  {
    return this.http.get('http://localhost:51389/api/Login/LogedIn/?Email='+user+'&Password='+pass)
  }
  testlogin(){
    var user = sessionStorage.getItem("user");
    var pass = sessionStorage.getItem("pass");
    // console.log(user)
    var bool = false;
    if (user == null || pass == null)
    {
      this.sNav = false;
      this.router.navigateByUrl('/login');
      bool= false;
    }
    else{
      this.LogedIn(user,pass).subscribe(data => {
        if (data[0].Logedin == false || data.toString() == "Access not allowed")
        {
          this.sNav = false;
          this.router.navigateByUrl('/login');
          bool= false;
        }
      else{
        this.sNav = true;
        bool= true;
      }})
    }
    
    return bool;
  }
  resetOTP(email){
    return this.http.get('http://localhost:51389/api/Login/ResetOTP/?Email='+email)
  }
  ResetPass(email, OTP,Password){
    // alert(OTP)
    return this.http.get('http://localhost:51389/api/Login/Password/?Email='+email+'&OTP='+OTP+'&Password='+Password)
  }
}
