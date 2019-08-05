import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
import { HttpHeaders } from '@angular/common/http';
// declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class ERPService {
nID:any;
  constructor(private http: HttpClient) { }
  GetRanger() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostRanger(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteRaner(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutRanger(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }

  GetUserRole() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostUserRole(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteUserRole(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutUserRole(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }

  GetGender() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostGender(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteGender(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutGender(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }

  GetStatus() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostStatus(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteStatus(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutStatus(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }

  GetMedicalAid() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostMedicalAid(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteMedicalAid(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutMedicalAid(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }

  GetOrganisation() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostOrganisation(obj) {
    return this.http.post('http://localhost:30264/api/Caus', obj)
  }
  DeleteOrganisation(id) {
    return this.http.delete('http://localhost:30264/api/Caus/' + id)
  }
  PutOrganisation(id, obj) {
    return this.http.put('http://localhost:30264/api/Caus/' + id, obj)
  }
  GetIncident_Level() {
    return this.http.get('http://localhost:51389/api/Incident_Level')
  }
  DeleteIncident_Level(id) {
    return this.http.delete('http://localhost:51389/api/Incident_Level/' + id)
  }
  sendNotif(title, message) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Postman-Token': '7946b969-a677-4a17-8fc0-23e6a5f1081d',
    //     'cache-control': 'no-cache',
    //     'Content-Type': 'application/json',
    //     Authorization: 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
    //   })
    // };
    // var url= 'https://fcm.googleapis.com/fcm/send';
    // var body={to: '/topics/ERP',notification:{body: message,  content_available: true,priority: 'high',title: title},data:{body: message,content_available: true,priority: 'high',title: title}};
    // console.log("1");
    // // request(options, function (error, response, body) {
    // //   if (error) throw new Error(error);

    // //   console.log(body);
    // // });
    // return this.http.post(url,body,httpOptions)
    var unirest = require("unirest");

    var req = unirest("POST", "https://fcm.googleapis.com/fcm/send");

    req.headers({
      "Postman-Token": "a4b8bcf8-46f2-4b0c-a946-cf28ed1aa253",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Authorization": "key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT"
    });

    req.type("json");
    req.send({
      "to": "/topics/ERP",
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
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });


  }
  GetGates() {
    return this.http.get('http://localhost:51389/api/Gates')
  }
  PutGates(ID,obj) {
    return this.http.put('http://localhost:51389/api/Gates/'+ID,obj)
  }
  GetGate(id) {
    return this.http.get('http://localhost:51389/api/Gates/'+id)
  }
  GetReserves() {
    return this.http.get('http://localhost:51389/api/Reserves')
  }
  PostGate(obj){
    return this.http.post('http://localhost:51389/api/Gates',obj)
  }
  DeleteGate(id) {
    return this.http.delete('http://localhost:51389/api/Gates/' + id)
  }
}
