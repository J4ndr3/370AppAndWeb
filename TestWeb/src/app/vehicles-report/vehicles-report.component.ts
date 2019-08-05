import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-vehicles-report',
  templateUrl: './vehicles-report.component.html',
  styleUrls: ['./vehicles-report.component.sass']
})
export class VehiclesReportComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  

  public Download() {
  
    
    
    
    document.getElementById('chrt1').innerHTML = '<br><h1 style="margin:auto">REGISTERD VEHICLE REPORT</h1><hr class="hrow" /></div>';
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
  constructor() { }

  ngOnInit() {
  }

}
