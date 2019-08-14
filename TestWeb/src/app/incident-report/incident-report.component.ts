import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {} from 'googlemaps';
import {ERPService} from '..//erp.service';  

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.sass'],
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
    
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(205, 21, 67);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(205, 21, 67, 0.5);
  }
  
`]
})
export class IncidentReportComponent {
  hoveredDate: NgbDate;
  Markers:object;
  Incedents:Array<object>;
  fromDate: NgbDate;
  toDate: NgbDate;
  myDate= new Date().toLocaleDateString();
  IncedentCount = 0;

  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;
  public Download() {
    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">INCIDENT REPORT</h1><br><br><div id="mapDiv"><div #map style="width:90%;height:100%; margin: auto;"></div><br></div><br> <br><br>';
      
      
    

      
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
        pdf.save('INCIDENT REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });

}

  constructor(calendar: NgbCalendar, private data: ERPService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    
  }
  
  ngOnInit() {

    this.data.GetIncedent_Patrole().subscribe(res=>{
      this.Incedents = JSON.parse(JSON.stringify(res));
      console.log(res);
      this.Incedents.forEach(marker => {
        this.IncedentCount++;
      this.Markers = res;
      
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}

  
    



