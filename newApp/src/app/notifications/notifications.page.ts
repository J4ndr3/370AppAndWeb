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
  ngOnInit() {
    this.data.GetNotifications().subscribe(res=>{
      this.Notifications = res;
      console.log(this.Notifications);
    })

  }

}
