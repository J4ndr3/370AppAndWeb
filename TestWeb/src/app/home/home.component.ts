import { Component,Directive,Input, OnInit, ViewChild } from '@angular/core';
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
import {} from 'googlemaps';
import {
  EventSourceInput,
  EventInputTransformer,
  EventSourceErrorResponseHandler,
  EventSourceSuccessResponseHandler
} from '@fullcalendar/core/structs/event-source';
import {ERPService} from '..//erp.service';          



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  bookings:Array<object>;
  Eventsource:Array<object>;
  @ViewChild('map',{static: false}) mapElement: any;
map: google.maps.Map;
myMap:google.maps.event;
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

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
  constructor(private data:ERPService) { }
  

  ngOnInit() {
    var self = this;
    this.Eventsource=[];
    this.data.GetBookings().subscribe(res=>{
      this.bookings = JSON.parse(JSON.stringify(res));
      console.log(this.bookings);
      this.bookings.forEach(element => {
        let eventcopy = {
          //ID: element["Patrol_Booking_ID"],
          title: element["Name"],
          start:element["Start_Time"],
          end: element["End_Time"],
          allDay: false,
        }
        console.log(eventcopy);
        this.Eventsource.push(eventcopy);
      });
      this.calendarEvents = this.Eventsource;
    })
    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
 google.maps.event.addListener(this.map, 'click', function(event) {
  var myLatLngList = {
    myLatLng : [{ lat: event.latLng.lat() , lng: event.latLng.lng() }]    
    };
   
   
    for(const data of myLatLngList.myLatLng){
      var marker = new google.maps.Marker({
          position: data,
          map: self.map,
          title: 'Hallo This is a marker'
      });
   }
//console.log(mark)
  alert(event.latLng);  // in event.latLng  you have the coordinates of click
});
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
