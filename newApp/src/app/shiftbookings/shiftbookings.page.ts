import { Component, OnInit, ViewChild,Inject, LOCALE_ID} from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { element } from '@angular/core/src/render3';
import { range } from 'rxjs';
import { ModifybookingPage } from '../modifybooking/modifybooking.page';


@Component({
  selector: 'app-shiftbookings',
  templateUrl: './shiftbookings.page.html',
  styleUrls: ['./shiftbookings.page.scss'],
})
export class ShiftbookingsPage implements OnInit {
  events: Array<object>;
AddForm: FormGroup;
NewShiftbookingsPage:object;
ReserveSelection:number =0;
RangerSelection:number =0;
VehicleSelection:number =0;
VehicleOptions:Array<object>; 
PassengerOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
ReserveOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
  event = {
    ID :'',
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private mod:ModifybookingPage,public toastController: ToastController,private router: Router,
  private data: ERPService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.data.GetPatrol_Bookings().subscribe(res=>{
      this.events = JSON.parse(JSON.stringify(res));
      console.log(this.events)
      this.events.forEach(element => {
        if (element["Ranger_ID"]==3)
        {
          var localOffsetS = new Date(element["Start_Time"]).getTimezoneOffset() * 60000;
          var localOffsetE = new Date(element["End_Time"]).getTimezoneOffset() * 60000;
          let eventCopy = {
            ID: element["Patrol_Booking_ID"],
            title:"Patrol in "+ element["Reserve"] + " with "+element["Passenger"],
            startTime:  new Date(element["Start_Time"]),
            endTime: new Date(element["End_Time"]),
            desc: "Patrol vehicle : "+ element["Registration"] +". Together with : "+element["Passenger"]
          }
          console.log(eventCopy)
          this.eventSource.push(eventCopy);
        }
      });
      this.myCal.loadEvents();
    })
    this.data.GetRangers().subscribe(res=>{
      this.PassengerOptions = JSON.parse(JSON.stringify(res));
      console.log(this.PassengerOptions)
    });
    
    this.data.GetReserves().subscribe(res=>{
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    });
    this.data.GetVehicles().subscribe(res=>{
      this.VehicleOptions = JSON.parse(JSON.stringify(res));
    });
    this.AddForm = this.formBuilder.group({
      Passenger:[], // your attributes
      Vehicle: [], // your attributes
      Reserve: [], // your attributes
      Start:[],
      End:[],
      });
    this.resetEvent();
  }
  
  resetEvent() {
    this.event = {
      ID:'',
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
  }
 
  // Create the right event format and reload source
  addEvent(ID) {
   var passenger;
   var reserve;
   var vehicle;
   this.PassengerOptions.forEach(element=>{
     if (element["ID"]==this.AddForm.get('Passenger').value)
     {
       passenger = element["Name"]
     }
     else if (this.AddForm.get('Passenger').value == null)
     {
       passenger = "No one"
     }
   })
   this.ReserveOptions.forEach(element=>{
    if (element["ID"]==this.AddForm.get('Reserve').value)
    {
      reserve = element["Name"]
    }
  })
  this.VehicleOptions.forEach(element=>{
    if (element["ID"]==this.AddForm.get('Vehicle').value)
    {
      vehicle = element["Name"]
    }
  })
    let eventCopy = {
      ID: ID,
      title:"Patrol in "+ reserve + " with "+passenger,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: "Patrol vehicle : "+ vehicle +". Together with : "+passenger
    }
    console.log(this.event.startTime)
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let ID = event.ID;
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: "Booking Details",
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: [{text:'Modify',handler: () => {
        this.mod.edit(ID);
      }},'OK']
    });
    alert.present();
  }
   
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  private async successToast() {
    const toast = await this.toastController.create({ message: "Booking created successfully.", duration: 3000 });
    toast.present();
  }

  addShiftbookingsPage() {
    alert("hit")
   var passenger = this.AddForm.get('Passenger').value;
   var reserve = this.AddForm.get('Reserve').value;
   var vehicle = this.AddForm.get('Vehicle').value;
   if ( reserve == null || vehicle == null || vehicle == null)
   {
    this.err();
   }
    else {
      this.NewShiftbookingsPage = {
        "Ranger_ID": 3,
        "Passenger_ID": passenger,
        "Reserve_ID": reserve,
        "Vehicle_ID": vehicle,
        "Start_Time":new Date(this.event.startTime),
        "End_Time":new Date(this.event.endTime)
      };
      console.log(this.NewShiftbookingsPage)
      this.data.PostPatrol_Booking(this.NewShiftbookingsPage).subscribe(res => {
        this.successToast();
        console.log(res["Patrol_Booking_ID"])
        this.addEvent(res["Patrol_Booking_ID"]);
       // this.data.sendNotif("New Booking", res["Name"] + " " + "has booked a shift for " + res[])
      });
    }
  }
private async err() {
    const alert = await this.alertCtrl.create({
      header: "Error",
      message: 'The input provided is incorrect. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

}
