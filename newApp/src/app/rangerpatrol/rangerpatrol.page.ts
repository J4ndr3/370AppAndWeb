import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-rangerpatrol',
    templateUrl: './rangerpatrol.page.html',
    styleUrls: ['./rangerpatrol.page.scss'],
})
export class RangerpatrolPage implements OnInit {
    RangerpatrolPage: object;
    AddForm: FormGroup;
    NewRangerpatrolPage: object;
    RangerpatrolPageSelection: number = 0;
    RangerpatrolPageOptions: Array<object>; // as jy meer as een dropdown het doen dit vir almal

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    currentMapTrack = null;
    watchID;
    isTracking = false;
    trackedRoute: Array<object>;

    myroute = [];
    positionSubscription: Subscription;
    @ViewChild('patrolform') containerEltRef: ElementRef;
    constructor(private renderer: Renderer2, public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation, private storage: Storage, private data: ERPService, private formBuilder: FormBuilder) { }
    currentTab = 0;
    previousTracks: Array<object>;
    ngOnInit() {
        this.plt.ready().then(() => {
            var self = this;
            var onSuccess = function (position) {
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                self.map.setCenter(latLng);
                self.map.setZoom(16);

            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }


            let mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            }
            self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                enableHighAccuracy: true
                , timeout: 5000
            });
            self.geolocation.getCurrentPosition().then(pos => {
                let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                self.map.setCenter(latLng);
                self.map.setZoom(16);
            }).catch((error) => {
                alert('Error getting location ' + error);
            });
        });
    }

    ngAfterViewInit() {
        // let elt = this.containerEltRef.nativeElement.querySelector('.tab');
        // this.renderer.addClass(elt, 'newClass'); //Adds new class to element
        // Current tab is set to be the first tab (0)
        this.showTab(this.currentTab); // Display the current tab


    }
    showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        console.log(x.length);
        (x[n] as HTMLElement).style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
            document.getElementById("nextBtn").innerHTML = "Check in";
            document.getElementById("Steps").style.marginTop = "85%";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }

        if (n == 3) {
            this.stopTracking();
            document.getElementById("nextBtn").innerHTML = "Done";
            document.getElementById("Steps").style.marginTop = "10%";

        }
        if (n == 1) {
            document.getElementById("nextBtn").innerHTML = "Next";
            document.getElementById("Steps").style.marginTop = "10%";
        }
        if (n == 2) {
            this.startTracking()
            document.getElementById("prevBtn").style.display = "none";
            document.getElementById("nextBtn").innerHTML = "<ion-icon name='exit' size='Medium'></ion-icon>";
            document.getElementById("nextBtn").style.width = "40%";
            //document.getElementById("Steps").style.marginTop = "10%";
            document.getElementById("Steps").style.display = "none";

        }
        //... and run a function that will display the correct step indicator:
        this.fixStepIndicator(n)
    }

    nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !this.validateForm()) return false;
        // Hide the current tab:
        (x[this.currentTab] as HTMLElement).style.display = "none";
        // Increase or decrease the current tab by 1:
        this.currentTab = this.currentTab + n;
        // if you have reached the end of the form...
        if (this.currentTab >= x.length) {
            // ... the form gets submitted:
            this.containerEltRef.nativeElement.Submit();
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab(this.currentTab);
    }

    validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[this.currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[this.currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }

    addRangerpatrolPageBtn() {
        this.AddForm = this.formBuilder.group({
            BookingReference: [""], // Names for your input
            EnterQRCode: [""], // Names for your input 
            EnterQRCode1: [""],
            Feedback: [""]

        });
        /* if there is a select/ dropdown use the following method to populate data for it */
        this.data.Getrangerpatrol().subscribe((res) => {
            this.RangerpatrolPageOptions = JSON.parse(JSON.stringify(res));
        });
    }

    addrangerpatrolpage() {
        var BookingReference = this.AddForm.get('BookingReference').value; // Names for your input
        var EnterQRCode = this.AddForm.get('EnterQRCode').value; // Names for your input
        var EnterQRCode1 = this.AddForm.get('EnterQRCode1').value;
        var Feedback = this.AddForm.get('Feedback').value;

        if ((BookingReference || EnterQRCode || EnterQRCode1 || Feedback) == "") {
            //Modal popup
        }
        else {
            this.NewRangerpatrolPage = {
                "BookingReference": BookingReference, // Names for your input
                "EnterQRCode": EnterQRCode, // Names for your input
                "EnterQRCode1": EnterQRCode1,
                "Feedback": Feedback

            };
            this.data.PostRanger(this.NewRangerpatrolPage).subscribe(res => {
                this.ngOnInit()
            });
        }
    }
    startTracking() {
        this.isTracking = true;
        this.trackedRoute = [];
        var self = this;
        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
          var locations = { lat: position.coords.latitude, lng: position.coords.longitude };
          var locationJ = JSON.parse(JSON.stringify(locations))
          self.trackedRoute.push(locationJ);
          self.redrawPath(self.trackedRoute);
        }
    
        // onError Callback receives a PositionError object
        //
        function onError(error) {
          alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        }
        // Options: throw an error if no update is received every 30 seconds.
        //
        this.watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
          enableHighAccuracy: true
          , timeout: 50000
        });
      }
      redrawPath(path) {
        console.log(path);
        var self = this;
        if (self.currentMapTrack) {
          self.currentMapTrack.setMap(null);
        }
        // map should be your map class
        if (path.length > 1) {
          self.currentMapTrack = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: 'green',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
          var bounds = new google.maps.LatLngBounds();
          for (var i in path) // your marker list here
          {
            console.log(path[i])
            bounds.extend(path[i])
          }
          self.map.fitBounds(bounds);
          self.currentMapTrack.setMap(self.map);
      }
    }
    stopTracking() {
        var self = this;
        let newRoute = { finished: new Date().getTime(), path: self.trackedRoute };
        let myroute = JSON.parse(JSON.stringify(newRoute.path));
        self.previousTracks.push(newRoute);
        self.storage.set('routes', this.previousTracks);
        self.myroute = [];
        myroute.forEach(element => {
          self.myroute.push({ Longitude: element.lng, Lattitude: element.lat, Patrol_Log_ID: 1 })
        });
        this.data.PostRoute(self.myroute).subscribe();
        self.isTracking = false;
        navigator.geolocation.clearWatch(this.watchID);
        self.currentMapTrack.setMap(null);
      }
}