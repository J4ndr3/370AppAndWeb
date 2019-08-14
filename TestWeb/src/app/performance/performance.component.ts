import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { rgb } from '@amcharts/amcharts4/.internal/core/utils/Colors';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { ERPService } from '../erp.service';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.sass']
})
export class PerformanceComponent {
  private chart: am4charts.XYChart;
  myDate= new Date().toLocaleDateString();
  performances:object;

  
  @ViewChild('content', { static: false }) content: ElementRef;

  public Download() {
    let img;

    this.chart.exporting.getImage("png").then((data) => {
      img = data;
      
      document.getElementById('chrt').innerHTML = '<br><br><br> <p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f> <h1 style="margin:auto">RANGER PERFORMANCE REPORT</h1><br><br> <img src="' + img + '"></div><br><br> <br>';
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
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('RANGER PERFORMANCE REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });
    });



  }
  ngOnInit() {
    this.data.GetPerformance().subscribe(res=>{
      console.log(res);
      this.performances = res;


    });
  }




  constructor(private zone: NgZone, private data: ERPService) { }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      am4core.useTheme(this.am4themes_myTheme);
      chart.paddingRight = 40;


      let data = [];
      let visits = 10;
      for (let i = 1; i < 31; i++) {
        visits = Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
        data.push({ date: new Date(2019, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      valueAxis.title.text = "HOURS PATROLLED";
      valueAxis.title.text.bold;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";



      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();
      series.strokeWidth = 3;
      series.stroke = am4core.color("rgb(205, 21, 67)");
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      this.chart = chart;

    });
  }
  am4themes_myTheme(target) {
    if (target instanceof am4core.InterfaceColorSet) {
      target.setFor("secondaryButton", am4core.color("#00181a").lighten(0.5));
      target.setFor("secondaryButtonHover", am4core.color("#00181a").lighten(-0.5));
      target.setFor("secondaryButtonDown", am4core.color("#00181a").lighten(-0.5));
      target.setFor("secondaryButtonActive", am4core.color("#00181a").lighten(-0.2));
      target.setFor("secondaryButtonText", am4core.color("cd1543"));
      target.setFor("secondaryButtonStroke", am4core.color("#cd1543").lighten(3));

    }
    if (target instanceof am4core.Scrollbar) {
      target.stroke = am4core.color("#00181a");
    }
  }



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    
     
}
}
