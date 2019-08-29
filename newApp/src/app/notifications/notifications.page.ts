import { Component, OnInit } from '@angular/core';
import {ERPService} from '..//erp.service';          
          


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private data:ERPService) { }
  Notifications: object;
  Incidents: object;
  Image:object;
  Images: Array<object>;
  ImgList : Array<object>

  ngOnInit() {
    this.data.GetNotifications().subscribe(res=>{
      this.Notifications = res;
      this.data.GetIncident().subscribe(res=>{
        this.Incidents = res;
        this.data.GetIncident_Image(this.Incidents['Incident_ID']).subscribe(res=>{
          this.Images=[],
          this.ImgList = JSON.parse(JSON.stringify(res));
          this.ImgList.forEach(element => {
              this.Image = element["Image"],
              console.log(this.Image),
              this.Images.push(this.Image);
        })


        })
      })
    })

  

  }

}
