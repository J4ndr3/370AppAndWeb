import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-rangers-report',
  templateUrl: './rangers-report.component.html',
  styleUrls: ['./rangers-report.component.sass']
})
export class RangersReportComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;

  public Download() {
  
    
    
    document.getElementById('chrt1').innerHTML = '<br><h1 style="margin:auto">RANGER REPORT</h1><hr class="hrow" /></div>';

    var data1 = document.getElementById('contentToConvert');
    var data2 = document.getElementById('contentToConvert1');
    html2canvas(data1, data2).then(canvas => {
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

      document.getElementById('chrt1').innerHTML="";
    });
  
}
  constructor() { }

  ngOnInit() {
  }

}
