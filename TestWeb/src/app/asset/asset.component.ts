import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { number } from '@amcharts/amcharts4/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import htmlToImage from 'html-to-image';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.sass']
})
export class AssetComponent implements OnInit {
@ViewChild('content', {static: false}) Content: Element;
@ViewChild('screen',{static: false}) screen: ElementRef;
  @ViewChild('canvas',{static: false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static: false}) downloadLink: ElementRef;

 

qrcodename : string;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  href : string;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.qrcodename = '0123'
      this.display = false;
      this.value = this.qrcodename;
      this.display = true;
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
  generateQRCode(){
    
      
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
      //Few necessary setting options
      var imgWidth = 50;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
       
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

      
      pdf.save('QR.pdf'); // Generated PDF
      
      });

  

}
}