import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
//import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
declare var jsPDF: any
@Component({
  selector: 'app-rewards-report',
  templateUrl: './rewards-report.component.html',
  styleUrls: ['./rewards-report.component.sass']
})
export class RewardsReportComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  Products:object;
  Count=0;
  ProductCount:Array<object>;

  Events:object;
  EventCount=0;
  EventsCount:Array<object>;
  loggedIn:any;
  TotalCount=0;
  myDate= new Date().toLocaleDateString();
  public Download() {
  
    
    
    
    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">REWARDS REPORT</h1></div><br><br>';
    const data1 = document.getElementById('chrt1');
    
    html2canvas(data1).then(canvas => {
      
      
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
     
      let doc = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
        const header = function(data) {
          doc.setFontSize(7);
          doc.setTextColor(200, 0, 255);
          doc.setFontStyle('normal');
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          //doc.text('Report', data.settings.margin.left + 35, 60);
        };
      
        const totalPagesExp = '{total_pages_count_string}';
        const footer = function(data) {
          let str = 'Page ' + data.pageCount;
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp;
            console.log('test');
          }
          doc.setFontSize(7);
          doc.text(str, 98, doc.internal.pageSize.height - 8);
        };
      
        const options = {
          beforePageContent: header,
          afterPageContent: footer,
          margin: {
            top: 35
          },styles: {fillColor: [62, 105, 112],    textColor:[255, 255, 255],},alternateRowStyles: {
            fillColor: [173,184,187]
        },drawCell: function (cell, data) {
          if (data.row.index === data.table.rows.length - 1) {
            doc.setFillColor = [239, 154, 154];
          }
      }
        };
        doc.setFontSize(18);
        doc.text("Product Reward",doc.internal.pageSize.width/2,30,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab1"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(18);
        let finalY = doc.lastAutoTable.finalY; 
        doc.text("Event Reward",doc.internal.pageSize.width/2,finalY+6,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab2"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(18);
        finalY = doc.lastAutoTable.finalY; 
        doc.text("Totals",doc.internal.pageSize.width/2,finalY+6,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab3"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(7);
         finalY = doc.lastAutoTable.finalY; 
        doc.text("**END OF REPORT**",98,finalY+10);
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        doc.save('ASSET REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
       // document.getElementById('chrt2').innerHTML="";
      });
    

  }



    
  constructor(private toastrService: ToastrService, private data: ERPService, private router: Router) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.ProductCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.ProductCount.forEach(marker => {
          this.Count++;
          // console.log(this.ProductCount)
          this.Products = res;
      
    });
    this.data.GetEventRewardAdd().subscribe(res=>{
      this.EventsCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.EventsCount.forEach(marker => {
          this.EventCount++;
          // console.log(this.EventCount)
          this.Events = res;
          this.TotalCount = this.EventCount + this.Count;
    });
  });
  });
  
this.loggedIn = sessionStorage.getItem("Ranger");
     this.ReportAccess(this.loggedIn);
     
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
  ReportAccess(ID){
    this.data.GetRangers(ID).subscribe(res=>{
      // console.log(res);
      if (res['User_Role_ID'] == 1 ||res['User_Role_ID'] == 2 ||res['User_Role_ID'] == 4){
      
      
  }
    
    else {
      
      this.showToast1();
      
    }
    
  })
  }
  showToast1() {
    this.toastrService.show("Sorry you do not have access to reports");
    this.router.navigateByUrl("/home");
  }

}
