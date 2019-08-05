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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  
  @ViewChild('map',{static: false}) mapElement: any;
map: google.maps.Map;
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Now', start: new Date() },
      { title: 'event 1', start: '11:00', date: '2019-06-25', allDay:false },
    
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
  constructor() { }
  

  ngOnInit() {
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
