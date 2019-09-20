import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import { DateInput } from '@fullcalendar/core/datelib/env';
import { DurationInput } from '@fullcalendar/core/datelib/duration';
import { FormatterInput } from '@fullcalendar/core/datelib/formatting';
import { DateRangeInput } from '@fullcalendar/core/datelib/date-range';
import { RawLocale, LocaleSingularArg } from '@fullcalendar/core/datelib/locale';
import { OverlapFunc, AllowFunc } from '@fullcalendar/core/validation';
import { } from 'googlemaps';
import {
  EventSourceInput,
  EventInputTransformer,
  EventSourceErrorResponseHandler,
  EventSourceSuccessResponseHandler
} from '@fullcalendar/core/structs/event-source';
import { ERPService } from '..//erp.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  bookings: Array<object>;
  Eventsource: Array<object>;
  Incidents: Array<object>;
  Rangers: Array<object>;
  rangermarker: Array<object>;
  myLatLngList: any;
  r: Array<object>;
  CoordList: Array<object>;
  Markers: Array<object>;
  lat: Array<number>;
  long: Array<number>;
  myLatLngList1: any;
  r1: Array<object>;
  CoordList1: Array<object>;
  Markers1: Array<object>;
  lat1: Array<number>;
  long1: Array<number>;
  newRanger: object;

  @ViewChild('map', { static: false }) mapElement: any;
  map: google.maps.Map;
  myMap: google.maps.event;
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Now', start: new Date() },
  ];

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }
  constructor(private data: ERPService) { }


  ngOnInit() {
    var self = this;
    this.Eventsource = [];
    this.Incidents = [];
    this.Rangers = [];
    this.rangermarker = [];
    this.myLatLngList = [];

    this.data.GetBookings().subscribe(res => {
      this.bookings = JSON.parse(JSON.stringify(res));
      // console.log(this.bookings);
      this.bookings.forEach(element => {
        let eventcopy = {
          //ID: element["Patrol_Booking_ID"],
          title: element["Name"],
          start: element["Start_Time"],
          end: element["End_Time"],
          allDay: false,
        }
        // console.log(eventcopy);
        this.Eventsource.push(eventcopy);
      });
      this.calendarEvents = this.Eventsource;
    })
    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.data.GetIncidents().subscribe(res => {
      this.r = [];
      this.CoordList = JSON.parse(JSON.stringify(res));
      this.CoordList.forEach(element => {
        this.r.push(element);
      });

      // console.log(this.CoordList);

      this.r.forEach(element => {

        this.myLatLngList = {

          myLatLng: [{ lat: parseFloat(element["Lat"]), lng: parseFloat(element["lng"]) }]

        }
        for (const data of this.myLatLngList.myLatLng) {
          var marker = new google.maps.Marker({
            position: data,
            map: this.map,
            title: 'Incident reported by ' + element['Name'] + ' ' + element['Surname'] + " at " + element['Time']
          });

        }
      })
    })
    // this.data.GetPatrol_log().subscribe(res => {
    //   this.r1 = [];
    //   this.CoordList1 = JSON.parse(JSON.stringify(res));
    //   this.CoordList1.forEach(element => {
    //     this.newRanger = {
    //       "lat": element["Lat"],
    //       "lng": element["lng"]
    //     }

    //     this.r1.push(element);
    //   });

    //   // console.log(this.CoordList1);

    //   this.r1.forEach(element => {
    //     this.myLatLngList1 = {
    //       myLatLng1: [{ lat: parseFloat(element["Lat"]), lng: parseFloat(element["lng"]) }]
    //     }
    //     if (element["CheckedIn"] == true) {
    //       console.log(element)
    //       for (const data of this.myLatLngList1.myLatLng1) {
    //         var marker = new google.maps.Marker({
    //           position: data,
    //           map: this.map,
    //           title: element['Name'] + ' ' + element['Surname'] + " on patrol"
    //         });
    //       }
    //     }
    //   })
    // })




    this.data.GetPatrol_log().subscribe(res => {
      this.r = [];
      this.CoordList1 = JSON.parse(JSON.stringify(res));
      this.CoordList1.forEach(element =>{
         this.r.push(element);
       });
    
       console.log(this.r);
    
      this.r.forEach(element =>{
       if (element["CheckedIn"] == true){
        this.myLatLngList = {
         
          myLatLng : [{ lat: parseFloat(element["Lattitude"]), lng: parseFloat(element["Longitude"])}] 
          };
     
       for(const data of this.myLatLngList.myLatLng){
         var marker = new google.maps.Marker({
             position: data,
             map: this.map,
             title: 'Active patrole'
         });
         
      }
       }
         
      })
    
    })




  }
}


