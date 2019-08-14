import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ERPService} from '..//erp.service';  

@Component({
  selector: 'app-assets-report',
  templateUrl: './assets-report.component.html',
  styleUrls: ['./assets-report.component.sass']
})
export class AssetsReportComponent implements OnInit {
  private table;
  myDate= new Date().toLocaleDateString();
  Assets:object;
  Ass:object;
  Active:Array<object>;
  count= 0;
  @ViewChild('content', { static: false }) content: ElementRef;

  public Download() {
    
      document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">ASSET REPORT</h1></div><br><br>';
      document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
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
        pdf.save('ASSET REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });
    
  }
  constructor(private data: ERPService) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.Active = JSON.parse(JSON.stringify(res));
      console.log(res);
      this.Active.forEach(marker => {
        
        if (marker['Status'] == "Active")
        {
          this.count++;
          console.log(this.Active)
        }
      this.Assets = res;
      
    });
  });

  
}

}
