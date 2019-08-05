import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { number } from '@amcharts/amcharts4/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.sass']
})
export class AssetComponent implements OnInit {

qrcodename : string;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  href : string;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
  generateQRCode(){
    this.qrcodename = '0123'
      this.display = false;
      this.value = this.qrcodename;
      this.display = true;
      
    }
  
  downloadImage(){
    this.href = document.getElementsByTagName('img')[0].src;
  }
}

