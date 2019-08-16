import { Component, OnInit, ViewChild,Inject, LOCALE_ID} from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          


@Component({
  selector: 'app-shiftbookings',
  templateUrl: './shiftbookings.page.html',
  styleUrls: ['./shiftbookings.page.scss'],
})
export class ShiftbookingsPage implements OnInit {
  ShiftbookingsPages: object;
AddForm: FormGroup;
NewShiftbookingsPage:object;
YourShiftbookingsPage:number =0;
ShiftbookingsPageOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
ShiftbookingsPageOption1s:Array<object>; // as jy meer as een dropdown het doen dit vir almal
ShiftbookingsPageOptionstartdates:Array<object>; // as jy meer as een dropdown het doen dit vir almal
ShiftbookingsPageOptionenddates:Array<object>; // as jy meer as een dropdown het doen dit vir almal

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public toastController: ToastController,private router: Router,
  private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetEvent();
    
  }
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
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
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: "Booking Details",
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: [{text:'Modify',handler: () => {
        this.router.navigateByUrl('/modifybooking');
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

  addShiftbookingsPageBtn() {
// /* if there is a select/ dropdown use the following method to populate data for it */
//     this.data.GetUserRole().subscribe((res) => {
//       this.UserRoleOptions = JSON.parse(JSON.stringify(res));
//     }); 
//     /* if there is a select/ dropdown use the following method to populate data for it */
//     this.data.GetUserRole().subscribe((res) => {
//       this.UserRoleOptions = JSON.parse(JSON.stringify(res));
//     }); 
//     /* if there is a select/ dropdown use the following method to populate data for it */
//     this.data.GetUserRole().subscribe((res) => {
//       this.UserRoleOptions = JSON.parse(JSON.stringify(res));
//     }); 
//     /* if there is a select/ dropdown use the following method to populate data for it */
//     this.data.GetUserRole().subscribe((res) => {
//       this.UserRoleOptions = JSON.parse(JSON.stringify(res));
//     }); 
  }

  addShiftbookingsPage() {
    // var UserRole = this.AddForm.get('UserRole').value;
    // var UserRole = this.AddForm.get('UserRole').value;
    // var UserRole = this.AddForm.get('UserRole').value;
    // var UserRole = this.AddForm.get('UserRole').value;

    // if ((UserRole||UserRole||UserRole||UserRole)=="") {
    //   //Modal popup
    // }
    // else {
    //   this.NewShiftbookingsPage = {
    //     "UserRole": UserRole,
    //     "UserRole": UserRole,
    //     "UserRole": UserRole,
    //     "UserRole": UserRole,
        
    //   };
    //   this.data.PostRanger(this.NewShiftbookingsPage).subscribe(res => {
    //     this.ngOnInit()
    //   });}
  }


}
