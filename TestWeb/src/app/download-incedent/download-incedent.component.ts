import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {} from 'googlemaps';


@Component({
  selector: 'app-download-incedent',
  templateUrl: './download-incedent.component.html',
  styleUrls: ['./download-incedent.component.sass']
})
export class DownloadIncedentComponent implements OnInit {
  myDate= new Date().toLocaleDateString();
  Markers:object;
  Incedents:Array<object>;
  timeLeft: number = 5;
  interval;
  IncedentCount = 0;
MAP1:any;

  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;

  constructor(private data: ERPService, private router:Router) { }

  ngOnInit() {
    this.data.GetIncedent_Patrole().subscribe(res=>{
      this.Incedents = JSON.parse(JSON.stringify(res));
      console.log(res);
      this.Incedents.forEach(marker => {
        this.IncedentCount++;
      this.Markers = res;
      
    });
    });
    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">INCEDENT REPORT</h1></div><br><br>';
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft == 0) {
        
        
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
          pdf.save('INCEDENT REPORT.pdf'); // Generated PDF  
          //this.router.navigateByUrl("/incident-report");
        });
    clearInterval(this.interval);
      }
      else{
        this.timeLeft = 5;
      }
    },1000)

    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
      disableDefaultUI: true,
      useCORS: true,
      image: true,
      download: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
 this.createMarker();
  }

  createMarker() {

    // list of hardcoded positions markers 
     var myLatLngList = {
         myLatLng : [{ lat: -25.8825 , lng: 28.2639 }, { lat: -25.8830, lng: 28.2640 }, { lat: -25.8850, lng: 28.2670 }]    
         };

        //iterate latLng and add markers 
       for(const data of myLatLngList.myLatLng){
         var marker = new google.maps.Marker({
             position: data,
             map: this.map,
             title: 'Hallo This is a marker'
         });
      }
 };
      }
    
    
    
    
    
  

