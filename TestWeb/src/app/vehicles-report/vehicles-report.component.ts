import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {ERPService} from '..//erp.service';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles-report',
  templateUrl: './vehicles-report.component.html',
  styleUrls: ['./vehicles-report.component.sass']
})
export class VehiclesReportComponent implements OnInit {
  myDate= new Date().toLocaleDateString();
  @ViewChild('content', { static: false }) content: ElementRef;
  Vehicles:Object;

  constructor(private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.data.GetRangerVehicle().subscribe(res=>{
      console.log(res);
      this.Vehicles = res;
    });
    this.ReportAccess(10);
  }

  public Download() {
  
    
    
    
    document.getElementById('chrt1').innerHTML = '<br><br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">REGISTERD VEHICLE REPORT</h1><br><br></div>';
    document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
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
      pdf.save('REGISTERD VEHICLE REPORT.pdf'); // Generated PDF  
      document.getElementById('chrt1').innerHTML="";
      document.getElementById('chrt2').innerHTML="";
    });

  }
  ReportAccess(ID){
    this.data.GetRangers(ID).subscribe(res=>{
      console.log(res);
    if (res['Access_ID'] == 1 ||res['Access_ID'] == 2 ||res['Access_ID'] == 3 ||res['Access_ID'] == 7){
      
      
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
