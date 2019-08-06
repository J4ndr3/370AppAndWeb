import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { number } from '@amcharts/amcharts4/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import htmlToImage from 'html-to-image';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.sass']
})
export class AssetComponent implements OnInit {
@ViewChild('content', {static: false}) Content: Element;
Asset: object;
AddForm: FormGroup;
NewAsset:object;
AssetSelection:number =0;
AssetOptions:Array<object>; 


 

qrcodename : string;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.qrcodename = '0123'
      this.display = false;
      this.value = this.qrcodename;
      this.display = true;

      this.data.GetAsset().subscribe(res=>{
        this.Asset = res;

      });
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

    
  /* if there is a select/ dropdown use the following method to populate data for it */
      
    
  
}