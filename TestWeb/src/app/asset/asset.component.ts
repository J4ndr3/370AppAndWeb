import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { number, getElement } from '@amcharts/amcharts4/core';
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
Assets: object;
AddForm: FormGroup;
NewAsset:object;
StatusSelection:number =0;
StatusOptions:Array<object>; 
TypeSelection:number =0;
TypeOptions:Array<object>; 
 SupplierSelection:number =0;
 SupplierOptions:Array<object>;
nAsset: object;

 

qrcodename : string;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.qrcodename = '0123'
      this.display = false;
      this.value = this.qrcodename;
      this.display = true;

      this.data.GetAssets().subscribe(res=>{
        this.Assets = res;

      });

      this.AddForm = this.formBuilder.group({
        AssetDescription: [],
        });
      this.data.GetTypes().subscribe(res=>{
        this.TypeOptions = JSON.parse(JSON.stringify(res));
      })
        this.data.GetStatus().subscribe(res=>{
          this.StatusOptions = JSON.parse(JSON.stringify(res));
        })
          this.data.GetSupplier().subscribe(res=>{
            this.SupplierOptions = JSON.parse(JSON.stringify(res));
      })
      
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
      pdf.addPage("width, height");
      pdf.setPage(1);
      
      pdf.save('QR.pdf'); // Generated PDF
      
      });
    }
    addAsset(){
      var AssetDescription = this.AddForm.get('AssetDescription').value;
      var Supplier = this.AddForm.get('Supplier').value;
      var Type = this.AddForm.get('Type').value;
      var Status = this.AddForm.get('Status').value;
      
      
  
      var Supplier = this.AddForm.get('Supplier').value;
      if ( AssetDescription ==""||Supplier==""||Type==""||Status=="") {
        document.getElementById("inputErr").click();
      }
      else {
        this.nAsset = {
          "AssetDescription": AssetDescription,
          "Supplier": Supplier,
          "Type": Type,
          "Status": Status,
          
        };
        console.log(this.nAsset);
        this.data.PostGate(this.nAsset).subscribe(res => {
          if (res != null)
          {
            this.ngOnInit();
            this.showToast();
          }
          else
          {
            document.getElementById("inputErr").click();
          }
          
        });
      }}

      del(){
        this.data.DeleteAsset(this.data.nID).subscribe(res=>{
          if (res!=null)
          {
            this.delSuccessToast();
            this.ngOnInit();
          }
          else if (res==2)
          {
            alert("You are not allowed to delete this record");
          }
          else
          {
            this.delToast()
          }
        })
      }
      delToast(){
        this.toastrService.show("Record could not be removed.", "Error!");
      }
      delSuccessToast(){
        this.toastrService.show("Record removed.", "Success!");
      }
      delete(ID){
        this.data.nID = ID;
        document.getElementById('del').click();
    }
  
  // edit(ID){
  //   this.mod.edit(ID);
  // }
    
  /* if there is a select/ dropdown use the following method to populate data for it */
   
  }
  
