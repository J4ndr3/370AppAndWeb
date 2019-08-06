import { Component, OnInit, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { RouterLink, Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  display='none';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  err:any;
  message:any;

  addExtraClass: boolean = false;
  constructor(public snackBar: MatSnackBar, private router: Router ) {}

  ngOnInit() {
  }
  
    openSnackBar() {
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackbarref=this.snackBar.open('Message Sent Successfully!', this.action ?  'Edit Message' : undefined, config);
    snackbarref.onAction().subscribe(()=>{document.getElementById("mymodClick").click()});
    } 
    openSnackBar1() {
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackbarref=this.snackBar.open('Message Sent Successfully!', this.action ?  'View Message' : undefined, config);
    snackbarref.onAction().subscribe(()=>{this.router.navigateByUrl('/notify')});
    } 
}

