import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, LOCALE_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { formatDate } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Geofence } from '@ionic-native/geofence/ngx';
import { timer } from 'rxjs';

@Component({
    selector: 'app-rangerpatrol',
    templateUrl: './rangerpatrol.page.html',
    styleUrls: ['./rangerpatrol.page.scss'],
})
export class RangerpatrolPage implements OnInit {
    assets: Array<object>;
    items;
    RangerpatrolPage: Array<object>;
    hideEverything = false;
    keepgoing = false;
    AddForm: FormGroup;
    NewRangerpatrolPage: object;
    newFeedback:object;
    RangerpatrolPageSelection: number = 0;
    RangerpatrolPageOptions: Array<object>; // as jy meer as een dropdown het doen dit vir almal
    Markers: Array<object>;
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild("qr_scanner") qrElement: ElementRef;
    map: any;
    currentMapTrack = null;
    watchID;
    isTracking = false;
    trackedRoute: Array<object>;
    patrolID;
    loggedIn: any;
    myroute = [];
    positionSubscription: Subscription;
    starttime: any;
    @ViewChild('patrolform') containerEltRef: ElementRef;
    constructor(private geofence: Geofence, private navcnt: NavController, private renderer: Renderer2, private qrScanner: QRScanner, @Inject(LOCALE_ID) private locale: string, public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation, private storage: Storage, private data: ERPService, private formBuilder: FormBuilder) {
        geofence.initialize().then(
            // resolved promise does not return a value
            () => console.log('Geofence Plugin Ready'),
            (err) => console.log(err)
        )
    }
    currentTab = 0;
    previousTracks: Array<object>;
    ngOnInit() {
    
        this.items = [];
        this.AddForm = this.formBuilder.group({
            BookingReference: [], // your attributes
            EnterQRCode: [], // your attributes
            EnterQRCodeO: [], // your attributes
            Feedback: [],
        });
        this.data.GetAssets().subscribe(res => {
            this.assets = JSON.parse(JSON.stringify(res));
            //this.items = this.assets;
        });
        this.storage.get("Ranger").then(res => {
            this.loggedIn = res;
            this.RangerpatrolPageOptions = [];
            this.data.GetPatrol_Bookings().subscribe(res => {
                this.RangerpatrolPage = JSON.parse(JSON.stringify(res));
                this.RangerpatrolPage.forEach(element => {
                    if (element["Ranger_ID"] == this.loggedIn) {
                        var list = { Patrol: element["Patrol_Booking_ID"], Event: formatDate(new Date(element["Start_Time"]), 'short', this.locale) }
                        this.RangerpatrolPageOptions.push(list);
                    }
                });

            })
            this.plt.ready().then(() => {
                var self = this;

                this.data.GetMarkers().subscribe(res => {
                    this.Markers = JSON.parse(JSON.stringify(res));
                    this.Markers.forEach(element => {
                        let fence = {
                            id: element["Num"], //any unique ID
                            latitude: element["Lat"], //center of geofence radius
                            longitude: element["Long"],
                            radius: 20, //radius to edge of geofence in meters
                            transitionType: 3 //see 'Transition Types' below
                        }
                        
                        this.geofence.addOrUpdate(fence).then(
                            () => console.log('Geofence added'),
                            (err) => alert('Geofence failed to add')
                        );

                    });
                   
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
            });
        });

       

    }

    ngAfterViewInit() {
        this.showTab(this.currentTab); // Display the current tab
    }
    showTab(n) {
        var self = this;
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
            this.keepgoing = false;
            document.getElementById("nextBtn").style.display = "None";
            document.getElementById("prevBtn").style.display = "None";
            // var MarkPass ={
            //     "Patrol_Log_ID":self.patrolID,
            //     "Marker_ID":17,
            //     "Date_Time_Passed":new Date()
            // }
            // console.log("hit")
            // self.data.PostPatrol_Markers(MarkPass).subscribe(res=>{
            //     console.log(res)
            //     alert("Marker was added to patroll log")
                
            //     self.Markers.forEach(element=>{
            //         console.log(element["Num"],MarkPass["Marker_ID"] )
            //         if (element["Num"] == MarkPass["Marker_ID"] )
            //         {
            //             var points =  "-"+element["Points"];
            //             this.data.UpdatePoints(self.loggedIn,points).subscribe(res=>{
            //                 console.log(res)
            //             })
            //         }
            //     })
               
            // })
            document.getElementById("nextBtn1").innerHTML = "Done";
            document.getElementById("Steps").style.marginTop = "10%";

        }
        if (n == 1) {
            document.getElementById("nextBtn").innerHTML = "Next";
            document.getElementById("Steps").style.marginTop = "10%";
            var booking = this.AddForm.get("BookingReference").value;
            console.log(booking);
            var PatrolLog = {
                "Ranger_ID": this.loggedIn,
                "Patrol_Booking_ID": booking,
                "Checkin": new Date(),
                "Checkout": new Date(),
                "Checked_in": true
            }
            this.data.PostPatrol_Log(PatrolLog).subscribe(res => {
                this.storage.set("PL",res["Patrol_Log_ID"]);
                this.patrolID = res["Patrol_Log_ID"];
            })

            this.scanMore();
        }
        if (n == 2) {
            this.keepgoing =true;
            
            this.hideEverything = false;
            this.startTracking()
            document.getElementById("prevBtn").style.display = "none";
            document.getElementById("nextBtn").innerHTML = "<ion-icon name='exit' size='Medium'></ion-icon>";
            document.getElementById("nextBtn").style.width = "40%";
            //document.getElementById("Steps").style.marginTop = "10%";
            document.getElementById("Steps").style.display = "none";
            var Patrol_assets = []
            this.items.forEach(element => {
                Patrol_assets.push({ "Patrol_Log_ID": this.patrolID, "Asset_ID": element["ID"] })
            });
            if (Patrol_assets != []) {
                this.data.PostPatrol_Assets(Patrol_assets).subscribe(res => {
                    console.log(res)
                })
            }
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
        // x = document.getElementsByClassName("tab");
        // y = x[this.currentTab].getElementsByTagName("input");
        // // A loop that checks every input field in the current tab:
        // for (i = 0; i < y.length; i++) {
        //     // If a field is empty...
        //     if (y[i].value == "") {
        //         // add an "invalid" class to the field:
        //         y[i].className += " invalid";
        //         // and set the current valid status to false
        //         valid = false;
        //     }
        // }

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
        if(this.keepgoing == true)
        {
            this.starttime = 30000;
        }
        else 
        {
             this.starttime = 1000000000000000000000000000000;
        }
        const source = timer(0, this.starttime);
       
        this.isTracking = true;
        this.trackedRoute = [];
        var self = this;
        self.Markers.forEach(element => {
            var circle = new google.maps.Circle({
                 map: this.map,
                 center: new google.maps.LatLng(element["Lat"], element["Long"]),
                 radius: 10,
                 strokeColor: "green",
                 fillColor: "green"
             });
         });
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
        const subscribe = source.subscribe(val => {
            alert("Hallo");
            self.geolocation.getCurrentPosition().then(pos => {
                var m = { Longitude: pos.coords.latitude, Lattitude: pos.coords.longitude, Patrol_Log_ID: this.patrolID }
                //let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                this.data.PostRoute(m).subscribe();
            }).catch((error) => {
                alert('Error getting location ' + error);
            });
            
        })
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

        // this.geofence.getWatched().then(function (geofencesJson) {
        //     var geofences = JSON.parse(geofencesJson);
        // });
        this.geofence.onTransitionReceived().subscribe(res => {

            res.forEach(function (geo) {
                console.log(geo["id"]);
                var count = -1;
                this.Markers.forEach(element => {
                    count++;
                    if (element["Num"] == geo["id"]) {
                       //self.geofence.remove(geo["id"])
                       // alert("HIT")
                        var MarkPass ={
                            "Patrol_Log_ID":self.patrolID,
                            "Marker_ID":element["Num"],
                            "Date_Time_Passed":new Date()
                        }
                        var points = "-"+element["Points"];
                        self.data.PostPatrol_Markers(MarkPass).subscribe(res=>{
                            console.log(res)
                            alert("Marker was added to patroll log")
                            self.data.UpdatePoints(self.loggedIn,points).subscribe(res=>{
                                console.log(res)
                            })
                        })
                        //alert("Marker was added to patroll log")
                        this.Markers.splice(count, 1)
                    }
                });


            });

        },
            (err) => console.log(err),
            () => console.log("done !")
        );

    }
    redrawPath(path) {
        // var circle
        console.log(path);
        var self = this;
        if (self.currentMapTrack) {
            self.currentMapTrack.setMap(null);
        }
        // map should be your map class
        if (path.length > 1) {
            // circle.setMap(null)
           
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
        // self.previousTracks.push(newRoute);
        // self.storage.set('routes', this.previousTracks);
        self.myroute = [];
        myroute.forEach(element => {
            self.myroute.push({ Longitude: element.lng, Lattitude: element.lat, Patrol_Log_ID: this.patrolID })
        });
        this.data.PostRoute(self.myroute).subscribe();
        self.isTracking = false;
        navigator.geolocation.clearWatch(this.watchID);
        //self.currentMapTrack.setMap(null);
        this.geofence.removeAll()
        .then(function () {
            console.log('All geofences successfully removed.');
         
        }
            , function (error) {
                console.log('Removing geofences failed', error);
            });
    }
    remove(ID) {
        var count = -1;
        this.items.forEach(element => {
            count++;
            if (element["ID"] == ID) {
                this.items.splice(count, 1)
            }
        });
    }
    scanMore() {
        // alert("Scan")
        let scanSub
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // (window.document.querySelector('')as HTMLElement).classList.add('cameraView');
                    // window.document.body.style.backgroundColor= 'transparent';

                    // camera permission was granted
                    this.hideEverything = true;
                    this.qrScanner.show();

                    // start scanning
                    scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.assets.forEach(element => {
                            if (element["ID"] == text) {
                                this.items.push(element);
                            }
                        });
                        //this.hideEverything = false;
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        scanSub.destroy();
                    });

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
    scanout() {
        // alert("Scan")
        let scanSub
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // (window.document.querySelector('')as HTMLElement).classList.add('cameraView');
                    // window.document.body.style.backgroundColor= 'transparent';

                    // camera permission was granted
                    this.hideEverything = true;
                    this.qrScanner.show();

                    // start scanning
                    scanSub = this.qrScanner.scan().subscribe((text: string) => {
                       // alert('Scanned something' + text);
                        var count = -1;
                        this.items.forEach(element => {
                            count++;
                            if (element["ID"] == text) {
                                this.items.splice(count, 1)
                            }
                        });
                        //this.hideEverything = false;
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        scanSub.destroy();
                    });

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
    report() {
        this.navcnt.navigateForward("/incidents")
    }
    exit() {
        this.data.GetPatrol_LOg(this.patrolID).subscribe(res => {
            var patrol = {
                "Patrol_Log_ID": this.patrolID,
                "Ranger_ID": res["Ranger_ID"],
                "Patrol_Booking_ID": res["Patrol_Booking_ID"],
                "Checkin": res["Checkin"],
                "Checkout": new Date(),
                "Checked_in": false
            }
            console.log(res["Checkin"], new Date())
            this.data.PutPatrol(this.patrolID, patrol).subscribe(res1 => {
                console.log(res1)
                var Feedback = this.AddForm.get('Feedback').value;
                    this.newFeedback = {
                        "Patrol_Log_ID": this.patrolID, // Names for your input
                        "Description": Feedback, // Names for your input
                        "EnterQRCode1": new Date(),
                    }
                    this.data.PostFeedback(this.newFeedback).subscribe(res=>{
                        this.navcnt.navigateForward("/home");
                    })
        
                
            })
        })

    }
}