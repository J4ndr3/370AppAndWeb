import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {} from 'googlemaps';
import {ERPService} from '..//erp.service';  
import { object } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-markers-report',
  templateUrl: './markers-report.component.html',
  styleUrls: ['./markers-report.component.sass']
})
export class MarkersReportComponent implements OnInit {
  Markers:Array<object>;
  lat:Array<object>;
  long:Array<object>;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map',{static: false}) mapElement: any;
  markerCount = 0;
  markerActiveCount = 0;
map: google.maps.Map;
  myDate= new Date().toLocaleDateString();
  public Download() {
    
    
      document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><br><h1 style="margin:auto">MARKER REPORT</h1><br><br><h3 margin:auto>Active Markers</h3><img src="./assets/Markers for patrol.PNG" alt="Italian Trulli" style="width:90%;height:90%;" class="center"></div><br> <br><br>';
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
        pdf.save('MARKER REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });
    
  }
  constructor(private data: ERPService) { }

  ngOnInit() {

    this.data.GetMarker().subscribe(res=>{
      
      this.Markers = JSON.parse(JSON.stringify(res));;
      console.log(this.Markers);
       this.markerActiveCount = 0;
      this.Markers.forEach(marker => {
        this.markerCount++;
        if (marker['Status'] == true)
        {
          this.markerActiveCount++;
          console.log(this.markerActiveCount)
        }
      });
    });

    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
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
