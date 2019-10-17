import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var jsPDF: any;
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.sass']
})
export class StatusReportComponent implements OnInit {
  Assets:object;
  Count=0;
  AssetCount:Array<object>;

  Rangers:object;
  Count1=0;
  RangerCount:Array<object>;

  Vehicles:object;
  Count2=0;
  VehicleCount:Array<object>;
  loggedIn:any;
  Num:number;
  Num1:number;
  Num2:any;
  TotalStatus=0;
  constructor(private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.AssetCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.AssetCount.forEach(marker => {
          this.Count++;
          // console.log(this.AssetCount)
          this.Assets = res;
      
    });
    this.data.GetRanger().subscribe(res=>{
      this.RangerCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.RangerCount.forEach(marker => {
          this.Count1++;
          // console.log(this.RangerCount)
          this.Rangers = res;
      
    });
    this.data.GetRangerVehicle().subscribe(res=>{
      this.VehicleCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.VehicleCount.forEach(marker => {
        this.Count2++;
          // console.log(this.VehicleCount)
          this.Vehicles = res;
      
    });
    this.TotalStatus = this.Count + this.Count1+ this.Count2; 
    });
  });
  });
  

this.loggedIn = sessionStorage.getItem("Ranger");
     this.ReportAccess(this.loggedIn);
    
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

  myDate= new Date().toLocaleDateString();
  public Download() {
  
    
    
    
    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">STATUS REPORT</h1></div><br><br>';
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
        doc.text("Ranger Status",doc.internal.pageSize.width/2,30,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab1"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(18);
        let finalY = doc.lastAutoTable.finalY; 
        doc.text("Asset Status",doc.internal.pageSize.width/2,finalY+6,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab2"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(18);
        finalY = doc.lastAutoTable.finalY; 
        doc.text("Vehicle Status",doc.internal.pageSize.width/2,finalY+6,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab3"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(18);
        finalY = doc.lastAutoTable.finalY; 
        doc.text("Total",doc.internal.pageSize.width/2,finalY+6,null, null, 'center');
        var res = doc.autoTableHtmlToJson(document.getElementById("tab4"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(7);
         finalY = doc.lastAutoTable.finalY; 
        doc.text("**END OF REPORT**",98,finalY+10);
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        doc.save('Status REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
       // document.getElementById('chrt2').innerHTML="";
      });
    

  }
}
