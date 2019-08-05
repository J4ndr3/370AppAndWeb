import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-rewards-report',
  templateUrl: './rewards-report.component.html',
  styleUrls: ['./rewards-report.component.sass']
})
export class RewardsReportComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  

  public Download() {
  
    
    
    
    document.getElementById('chrt1').innerHTML = '<br><h1 style="margin:auto">REWARDS REPORT</h1><hr class="hrow" /></div>';
    const data1 = document.getElementById('contentToConvert');
    
    html2canvas(data1).then(canvas => {
      
      document.getElementById('chrt1').innerHTML="";
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
     
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF  
      
    });

  }



    
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
