import { Component, OnInit, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BlockScrollStrategy } from '@angular/cdk/overlay';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  display='none';
  message: string = 'Message Sent Successfully!';
  actionButtonLabel: string = 'Edit Message';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  modal:HTMLElement= document.getElementById('messagepopup');


  addExtraClass: boolean = false;
  constructor(public snackBar: MatSnackBar ) {}

  ngOnInit() {
  }
  
    openSnackBar(message: string, action: string) {
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackbarref=this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    snackbarref.onAction().subscribe(()=>this.modal.toggleAttribute);
    } 
  
}

