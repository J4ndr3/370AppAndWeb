import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})

export class IncidentsPage implements OnInit {
  imgDisp: Array<string>;
  images: Array<string>;
  base64Image: string;
  AddForm: FormGroup;
  NewIncident: object;
  newPatrol: object;
  imgarray = [];
  NewImg: object;
  Patrol: Array<object>;
  TypeSelection: number = 0;
  TypeOptions: Array<object>;
  latLng;
  count = 0; // as jy meer as een dropdown het doen dit vir almal
  PL:any;
  NewShiftbookingsPage:object;
  loggedIn:any;
  constructor(private storage: Storage,private base64: Base64, private navctr: NavController, public toastController: ToastController, private router: Router, private camera: Camera, private data: ERPService, private formBuilder: FormBuilder, private geolocation: Geolocation) { }


  ngOnInit() {
    try{
      this.storage.get("PL").then(res=>{
        console.log(res);
        this.PL = res;
        if (res==null)
        {
          var localOffsetS = new Date();
          localOffsetS.setHours(localOffsetS.getHours()+2);
          var localOffsetE = new Date();
          localOffsetE.setHours(localOffsetE.getHours()+4);
          this.storage.get("Ranger").then(res=>{
            this.loggedIn = res;
            this.NewShiftbookingsPage = {
              "Ranger_ID": this.loggedIn,
              "Passenger_ID": 3,
              "Reserve_ID": 2,
              "Vehicle_ID": 4,
              "Start_Time":localOffsetS,
              "End_Time":localOffsetE 
            };
            console.log(this.NewShiftbookingsPage)
            this.data.PostPatrol_Booking(this.NewShiftbookingsPage).subscribe(res => {
              console.log(res["Patrol_Booking_ID"])
              var PatrolLog = {
                "Ranger_ID": this.loggedIn,
                "Patrol_Booking_ID": res["Patrol_Booking_ID"],
                "Checkin": new Date(),
                "Checkout": new Date(),
                "Checked_in": true
            }
            this.data.PostPatrol_Log(PatrolLog).subscribe(res => {
                this.storage.set("PL", res["Patrol_Log_ID"]);
                this.PL = res["Patrol_Log_ID"];
               // this.patrolID = res["Patrol_Log_ID"];
            })
              //this.addEvent(res["Patrol_Booking_ID"]);
              this.data.sendBookingNote("New Booking","There was a new booking created from "+localOffsetS + " to "+localOffsetE);
             // this.data.sendNotif("New Booking", res["Name"] + " " + "has booked a shift for " + res[])
            });
          });
          
         
        }
      })
    }
    catch{
      this.PL = 1;
    }
    

    this.images = [];
    this.imgDisp=[];
    var self = this;
    this.AddForm = this.formBuilder.group({
      Type_ID: [""], // Names for your input
      Description: [""], // Names for your input 
      Incident_Status_ID: [""]
    });
    /* if there is a select/ dropdown use the following method to populate data for it */
    this.data.GetIncident_Types().subscribe((res) => {
      this.TypeOptions = JSON.parse(JSON.stringify(res));
    });
  }

  addIncident() {
    var Type_ID = this.AddForm.get('Type_ID').value; // Names for your input
    var Description = this.AddForm.get('Description').value; // Names for your input
    var Incident_Status_ID = this.AddForm.get('Incident_Status_ID').value; // Names for your input
    var title = "";
    let latLng;


    var onSuccess = function (position) {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    };

    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true
      , timeout: 5000
    });
    this.geolocation.getCurrentPosition().then(pos => {
      latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    }).catch((error) => {
      alert('Error getting location ' + error);
    });


    this.TypeOptions.forEach(element => {
      if (element["ID"] == Type_ID) {
        title = element["Description"];
      }
    })

    if (Type_ID == "" || Description == "") {
      this.BadToast();
    }
    else {
      this.NewIncident = {
        "Incident_Type_ID": Type_ID, // Names for your input
        "Description": Description, // Names for your input
        "Incident_Status_ID": '2',

      };
      this.data.sendNotif(title, Description);
      this.data.PostIncident(this.NewIncident).subscribe(res => {
        // console.log(latLng);
        this.newPatrol = {
          "Incident_ID": res["Incident_ID"],
          "Patrol_Log_ID": this.PL,
          "Lat": latLng.lat(),
          "Lng": latLng.lng(),
          "Time": new Date().toLocaleTimeString(),
          "Date": new Date().toDateString()
        }

        this.data.PostIncident_Patrol(this.newPatrol).subscribe(res => {
          //alert("2"+ res);
         // alert(this.images[1])
          var self = this;
          self.imgarray = [];
          if (this.images.length == null) {
            self.imgarray.push({
              "Incident_ID": res["Incident_ID"],
              "Patrol_Log_ID": this.PL,
              "Image": "NULL",
            })
          }
          else {
            this.images.forEach(img => {
             // alert(3+""+ img)
              var imga = {
                "Incident_ID": res["Incident_ID"],
                "Patrol_Log_ID": this.PL,
                "Image": img,
              }
              //alert(4+""+ imga)
              this.data.PostIncident_Image(imga).subscribe(res => {
              //  alert(5+" " +res);
              })
            })

          }
          this.navctr.pop();
          this.presentToast();
        })



        // this.navctr.pop();
        // this.presentToast();
      });

    }
  }


  private async presentToast() {
    const toast = await this.toastController.create({ message: "Incident successfully reported.", duration: 3000 });
    toast.present();
  }
  private async BadToast() {
    const toast = await this.toastController.create({ message: "Incident could not be reported.", duration: 3000 });
    toast.present();
  }

  OpenCamera() {
    var self = this;

    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      
      let filePath: string = imageData;
      this.base64.encodeFile(filePath).then((base64File: BinaryType) => {
        var base64result = base64File.split(',')[1];
        
        self.images.push(base64result)
        //alert(2+" " +base64result);
      }, (err) => {
        console.log(err);
      });
      // = new Blob([this.base64Image], { type: 'image/png' });
      var blob = (<any>window).Ionic.WebView.convertFileSrc(imageData);
        self.imgDisp.push(blob);
        
       // alert(1+" "+imageData);

    }, (err) => {
      alert(err)
      // Handle error
    });
  }

}

