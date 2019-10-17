import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-modifybooking',
  templateUrl: './modifybooking.page.html',
  styleUrls: ['./modifybooking.page.scss'],
})
export class ModifybookingPage implements OnInit {
  loggedIn: any;
  Shift: any;
  EditForm: FormGroup;
  VehicleOptions: Array<object>;
  PassengerOptions: Array<object>; // as jy meer as een dropdown het doen dit vir almal
  ReserveOptions: Array<object>;
  PassengerSelection: number = 0;
  VehicleSelection: number = 0;
  ReserveSelection:number=0;
  ModifybookingPageSelection: number = 0; //if you have a select list
  ModifybookingPageOptions: Array<object>; //if you have a select list
  nModifybookingPage: object;
  rcv: object;
  event = {
    ID: '',
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
  };
  minDate = new Date().toISOString();
  constructor(private alertCtrl: AlertController, public toastController: ToastController,
    private router: Router, private data: ERPService, private formBuilder: FormBuilder, private storage: Storage) { }

  ngOnInit() {
    this.storage.get("Ranger").then(res => {
      this.loggedIn = res;
      this.data.GetRangers().subscribe(res => {
        this.PassengerOptions = JSON.parse(JSON.stringify(res));
      });
      this.data.GetReserves().subscribe(res => {
        this.ReserveOptions = JSON.parse(JSON.stringify(res));
      });
      this.data.GetVehicles().subscribe(res => {
        this.VehicleOptions = JSON.parse(JSON.stringify(res));
      });
    })

    this.EditForm = this.formBuilder.group({
      ID: [],
      Passenger: [], // your attributes
      Vehicle: [], // your attributes
      Reserve: [],
      startTime: [], // your attributes
      endTime: []
    });
    this.edt();
  }
  edt() {
    this.data.GetPatrol_Booking(this.data.nID).subscribe(res => {
      this.Shift = res;
      console.log(this.Shift.Vehicle_ID)
      this.EditForm.setValue({
        ID: this.Shift.Patrol_Booking_ID,
        Passenger: this.Shift.Passenger_ID,
        Vehicle: this.Shift.Vehicle_ID,
        Reserve: this.Shift.Reserve_ID,
        startTime: new Date(this.Shift.Start_Time).toISOString(),
        endTime: new Date(this.Shift.End_Time).toISOString()
      })
      this.event.startTime = new Date(this.Shift.Start_Time).toISOString()
      this.event.endTime = new Date(this.Shift.End_Time).toISOString()
    })
  }
  update() {
    var Passenger = this.EditForm.get('Passenger').value; //the name in red the same as on you html
    var Vehicle = this.EditForm.get('Vehicle').value; //the name in red the same as on you html
    var Reserve = this.EditForm.get('Reserve').value;
    var Starttime = new Date(this.event.startTime)
    var Endtime: Date = new Date(this.event.endTime)
    console.log(Starttime)
    if (Passenger == "" || Vehicle == "") {

    }
    else {
      this.nModifybookingPage = {
        "Patrol_Booking_ID": this.data.nID,
        "Ranger_ID": this.loggedIn,
        "Passenger_ID": Passenger,
        "Reserve_ID": Reserve,
        "Vehicle_ID": Vehicle,
        "Start_Time": Starttime,
        "End_Time": Endtime
      };
      console.log(this.nModifybookingPage);
      this.data.PutPatrol_Booking(this.data.nID, this.nModifybookingPage).subscribe(res => {
        this.rcv = res
        console.log(this.rcv);
        if (this.rcv == null) {
          this.showToast();
        }
        else {
          document.getElementById("inputErr").click();
        }
      });
    }
  }


  edit(ID) {
    this.data.GetPatrol_Booking(ID).subscribe(res => {
      if (res == 1) {
        alert("Not found");
        this.router.navigateByUrl("/shiftbookings");
      }
      else {
        this.router.navigateByUrl('/modifybooking');
        this.data.nID = ID;
      }
    })
  }
  private async showToast() {
    const toast = await this.toastController.create({ message: "Record modified successfully.", duration: 3000 });
    toast.present();
    this.router.navigateByUrl("/shiftbookings");
  }


  private async successToast() {
    const toast = await this.toastController.create({ message: "Booking modified successfully.", duration: 3000 });
    toast.present();
  }
  private async failedToast() {
    const toast = await this.toastController.create({ message: "Booking could not be modified.", duration: 3000 });
    toast.present();
  }
  public async modifyyesorno() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to modify this record?',
      buttons: ['Cancel', {
        text: 'Yes', handler: () => {
          this.update();
        }
      }]
    });
    alert.present();
  }
}
