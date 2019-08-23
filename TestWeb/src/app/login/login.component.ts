import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  constructor(private toastrService: ToastrService, private ac: AppComponent) { }
  
  ngOnInit() {
    alert(this.ac.showNav)
    this.ac.showNav = true;
    alert(this.ac.showNav)
  }
  
  showToast(){
    alert(this.ac.showNav)
    this.ac.showNav = false;
    alert(this.ac.showNav)
    this.toastrService.show("Logged in.", "Success!");
  }
  showToastF(){
    this.toastrService.show("Failed to Login, check your Username and Password.", "Error!");
  }
}
