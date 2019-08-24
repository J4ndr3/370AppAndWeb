import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { } from 'googlemaps';
import { ERPService } from '..//erp.service';
import { object } from '@amcharts/amcharts4/core';
import htmlToImage from 'html-to-image';
import { JsonPipe } from '@angular/common';
import { element } from 'protractor';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-markers-report',
  templateUrl: './markers-report.component.html',
  styleUrls: ['./markers-report.component.sass']
})
export class MarkersReportComponent implements OnInit {
  r: Array<object>;
  CoordList: Array<object>;
  Markers: Array<object>;
  lat: Array<number>;
  long: Array<number>;
  myLatLngList: any;
  Latitude: Array<number>;
  Longitude: Array<number>;
  timeLeft1: number = 6;
  interval1;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map', { static: false }) mapElement: any;
  markerCount = 0;
  markerActiveCount = 0;
  map: google.maps.Map;
  myDate = new Date().toLocaleDateString();
  public Download() {
    this.timeLeft1 = 2;
    let img;



    let img1;

    var htmlToImage = require('html-to-image');
    var node = document.getElementById('my-node');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {

        var img = new Image();
        img.src = dataUrl;
        // img.style.width = "800px";
        img1 = img;
        document.getElementById('image123').appendChild(img);

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });


    this.interval1 = setInterval(() => {
      if (this.timeLeft1 > 0) {
        this.timeLeft1--;
      } else if (this.timeLeft1 == 0) {

        document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">' + this.myDate + '</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><br><h1 style="padding-left:10%">MARKER REPORT</h1><br><br><h3 margin:auto>Active Markers</h3></div><br> <br><br>';
        document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
        document.getElementById('chrt3').innerHTML = '<br><br>';

        var data1 = document.getElementById('contentToConvert');
        var data2 = document.getElementById('contentToConvert1');
        html2canvas(data1).then(canvas => {
          // Few necessary setting options  
         
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
          
          pdf.setDrawColor(205, 21, 67);
          pdf.rect(60, 20, 10, 10);
          var position = 5;
          
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
         
          pdf.save('MARKER REPORT.pdf'); // Generated PDF  
          
          
          document.getElementById('chrt1').innerHTML = "";
          document.getElementById('chrt2').innerHTML = "";
          document.getElementById('image123').innerHTML = "";

          // var doc = new jsPDF();
          // var totalPagesExp = "{total_pages_count_string}";
          // var footer = function (data) {
          //     var str = "Page " + data.pageCount;
          //     // Total page number plugin only available in jspdf v1.0+
          //     if (typeof doc.putTotalPages === 'function') {
          //         str = str + " of " + totalPagesExp;
          //     }
          //     doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
          // };
        });
        clearInterval(this.interval1);

      }

      else {
        this.timeLeft1 = 2;
        this.router.navigateByUrl("/markers-report");
      }
    }, 1000)
  }
  constructor(private data: ERPService, private router: Router) { }

  ngOnInit() {


    this.data.GetMarker().subscribe(res => {

      this.Markers = JSON.parse(JSON.stringify(res));
      console.log(this.Markers);
      this.markerActiveCount = 0;
      this.Markers.forEach(marker => {
        this.markerCount++;
        if (marker['Status'] == true) {
          this.markerActiveCount++;
          const mapProperties = {
            center: new google.maps.LatLng(-25.8825, 28.2639),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      
          this.data.GetMarker().subscribe(res => {
            this.r = [];
            this.CoordList = JSON.parse(JSON.stringify(res));
            this.CoordList.forEach(element => {
              this.r.push(element);
            });
      
            console.log(this.CoordList);
      
            this.r.forEach(element => {
              if (element['Status'] == true) {
                this.myLatLngList = {
      
                  myLatLng: [{ lat: parseFloat(element["Lat"]), lng: parseFloat(element["Long"]) }]
                };
              }
              else if (element["Lat"] == null && element["Long"] == null) {
                alert('No Markers is available');
              }
              for (const data of this.myLatLngList.myLatLng) {
                var marker = new google.maps.Marker({
                  position: data,
                  map: this.map,
                  title: 'Hallo This is a marker'
                });
      
              }
            })
      
          })

          console.log(this.markerActiveCount)
        }
      });
    });

   
  }

  createMarker() {

    // list of hardcoded positions markers 
    //  this.data.GetMarker().subscribe(res => {
    //    this.CoordList = JSON.parse(JSON.stringify(res));
    //    console.log("aaaaaaaaaaaaaaaaaaa"+this.CoordList);
    //    this.CoordList.forEach(coordinates =>{

    //     this.myLatLngList = {
    //       myLatLng : [{ lat: coordinates["Lattitude"] , lng: coordinates["Longitude"] }] 
    //       };
    //       for(const data of this.myLatLngList.myLatLng){
    //         var marker = new google.maps.Marker({
    //             position: data,
    //             map: this.map,
    //             title: 'Hallo This is a marker'
    //         });
    //      }
    //    })

    //  })


    //iterate latLng and add markers 

  };

}
