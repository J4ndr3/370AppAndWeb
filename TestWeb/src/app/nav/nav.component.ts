import { Component, OnInit, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { RouterLink, Router } from '@angular/router';
import { ERPService } from '../erp.service';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder,FormGroup } from '@angular/forms';   
import { dataLoader, List } from '@amcharts/amcharts4/core';
import { Observable } from 'rxjs';
import { timer} from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  display='none';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  err:any;
  message:any;
  addExtraClass: boolean = false;
  data: ERPService;
  incidentnumber;
  incidents;
  banner:Array<object>;
  count;
  NewNotification:object;
  timer:any;

  constructor(private http: HttpClient,public snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder ) {}
  AddForm: FormGroup;
  AddForm2: FormGroup;
  
  ngOnInit() {
    const source = timer(0,60000);
    const subscribe = source.subscribe(val=>{
      this.count =0
      this.GetIncidents().subscribe(res=>{
        this.banner=JSON.parse(JSON.stringify(res));
        this.banner.forEach(element => {
          this.count++;
          
        });
      });
      
    })

 
    this.AddForm = this.formBuilder.group({
      Title: [],
      Message: []});
      this.AddForm2 = this.formBuilder.group({
        Title: [],
        Message: []});
        this.data.GetIncidents().subscribe(res=>{
          this.incidents =res;
          console.log(this.incidents)
          this.incidentnumber = this.incidents.count();
          console.log(this.incidentnumber);
        })
  }
  
    openSnackBar() {
      var Title =  this.AddForm.get('Title').value;
        var Message =  this.AddForm.get('Message').value;
      let  close =1;
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackbarref=this.snackBar.open('Message Sent Successfully!', this.action ?  'Edit Message' : undefined, config);
    snackbarref.onAction().subscribe(()=>{
      this.AddForm2.get('Title').setValue(Title);
        this.AddForm2.get('Message').setValue(Message);
      document.getElementById("mymodClick").click();
      close=0;
  });
    
    snackbarref.afterDismissed().subscribe(()=>{
      if (close==1){
        console.log(Title);
        this.NewNotification={
          "Date": new Date(),
          "Meassage": Message,
          "Title": Title,
          "Ranger_ID": 3,
        };
        console.log(this.NewNotification);

        this.PostNotification(this.NewNotification).subscribe(res=>{
          console.log(res);
        });

        this.sendNotif(Title,Message);
        this.AddForm.get('Title').reset();
        this.AddForm.get('Message').reset();
      }
      
    })
    } 
    openSnackBar1() {
      var Title =  this.AddForm2.get('Title').value;
        var Message =  this.AddForm2.get('Message').value;
        this.NewNotification={
          "Date": new Date(),
          "Meassage": Message,
          "Title": Title,
          "Ranger_ID": 3,
        };
        console.log(this.NewNotification);

        this.PostNotification(this.NewNotification).subscribe(res=>{
          console.log(res);
        });

        this.sendNotif(Title,Message);
        this.AddForm.get('Title').reset();
        this.AddForm.get('Message').reset();
        this.AddForm2.get('Title').reset();
        this.AddForm2.get('Message').reset();
      let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackbarref=this.snackBar.open('Message Sent Successfully!', this.action ?  'View Message' : undefined, config);
    snackbarref.onAction().subscribe(()=>{this.router.navigateByUrl('/notify')});
    } 

    sendNotif(title, message) {
      var notificationData = {
        to: '/topics/ERP',
        "mutable_content":true,
        "content_available": true,
        "notification": {
          "body": message,
          "contents": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
          "mediaUrl": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
          "priority": "high",
          "title": title,
        },
        "data": {
          "body": message,
          "contents": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
          "mediaUrl": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
          "priority": "high",
          "title": title,
          "image-url": "http://www.nature-reserve.co.za/images/tswalu-kalahari-reserve-baby-rhino-590x390.jpg"
        }
      }
      console.log(notificationData)
      $.ajax({
        type: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
        },
        data: JSON.stringify(notificationData),
        success: function(response){
          console.log(response);
        },
      });
    }
    
    GetIncidents(){
      return this.http.get('http://localhost:51389/api/Incident_Patrol')
    };

    PostNotification(obj){
        return this.http.post('http://localhost:51389/api/Notifications', obj)
      }
      refresh(){
        this.count =0;
      this.GetIncidents().subscribe(res=>{
        this.banner=JSON.parse(JSON.stringify(res));
        this.banner.forEach(element => {
          this.count++;
          
        });
      });
      }
    }

