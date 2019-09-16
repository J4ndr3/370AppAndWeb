import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {ERPService} from '..//erp.service';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  loggedIn:any;

  constructor( private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.loggedIn = sessionStorage.getItem("Ranger");
    this.NotificationTimer(this.loggedIn);
  }
  NotificationTimer(ID){

  }

}
