import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ERPService {

  constructor(private http: HttpClient) { }
  GetRanger(ID){
    return this.http.get('http://localhost:51389/api/rangers/'+ID)
  }

  GetGenders(){
    return this.http.get('http://localhost:51389/api/Genders/')
  }
  GetOrganisations(){
    return this.http.get('http://localhost:51389/api/Organisations/')
  }
  GetMedical(){
    return this.http.get('http://localhost:51389/api/Medical_Aid/')
  }
  GetAddvehiclePage(){
    return this.http.get('http://localhost:51389/api/rangers/')
  }

  Getshiftbookings(){
    return this.http.get('http://localhost:51389/api/rangers/')
  }

  Getrangerpatrol(){
    return this.http.get('http://localhost:51389/api/rangers/')
  }
  PostRanger(obj){
    return this.http.post('http://localhost:51389/api/Rangers/',obj)
  }
  PostRoute(obj){
    return this.http.post('http://localhost:51389/api/Trackings/',obj)
  }
  GetIncident_Types() {
    return this.http.get('http://localhost:51389/api/Incident_Type')
  }
  PostIncident(obj){
    return this.http.post('http://localhost:51389/api/Incidents/', obj)
  }
  GetNotifications() {
    return this.http.get('http://localhost:51389/api/Notifications')
  }
  sendNotif(title, message) {
    var notificationData = {
      to: '/topics/ERP',
      "notification": {
        "body": message,
        "content_available": true,
        "priority": "high",
        "title": title
      },
      "data": {
        "body": message,
        "content_available": true,
        "priority": "high",
        "title": title
      }
    }
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
}
