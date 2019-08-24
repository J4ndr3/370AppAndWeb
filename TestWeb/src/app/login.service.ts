import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
    var bool = false;
    this.LogedIn(user,pass).subscribe(data => {
      if (data[0].Logedin == false || data.toString() == "Access not allowed")
      {
        this.router.navigateByUrl('/');
        bool= false;
      }
    else{
      bool= true;
    }})
    return bool;
  }
}
