import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
import { HttpHeaders } from '@angular/common/http';
import { NavComponent } from '../app/nav/nav.component'
// declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class ERPService {
  nError: any;
  nMessage: any;
  nID: any;
  constructor(private http: HttpClient, private nav: NavComponent) { }
  GetRanger() {
    return this.http.get('http://localhost:51389/api/Rangers')
  }
  GetPerformance() {
    return this.http.get('http://localhost:51389/api/Patrol_Marker')
  }
  GetIncedent_Patrole() {
    return this.http.get('http://localhost:51389/api/Incident_Patrol')
  }
  GetMarker() {
    return this.http.get('http://localhost:51389/api/Markers')
  }
  GetRangerVehicle() {
    return this.http.get('http://localhost:51389/api/Ranger_Vehicle')
  }
  GetAssets() {
    return this.http.get('http://localhost:51389/api/Assets')
  }
  PostRanger(obj) {
    return this.http.post('http://localhost:51389/api/Rangers', obj)
  }
  DeleteRaner(id) {
    return this.http.delete('http://localhost:51389/api/Rangers/' + id)
  }
  PutRanger(id, obj) {
    return this.http.put('http://localhost:51389/api/Rangers/' + id, obj)
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
  GetIncident_Levels() {
    return this.http.get('http://localhost:51389/api/Incident_Level')
  }
  DeleteIncident_Level(id) {
    return this.http.delete('http://localhost:51389/api/Incident_Level/' + id)
  }
  PostIncident_Level(obj) {
    return this.http.post('http://localhost:51389/api/Incident_Level', obj)
  }
  GetIncident_Level(id) {
    return this.http.get('http://localhost:51389/api/Incident_Level/'+id)
  }
  PutIncident_Level(id, obj) {
    return this.http.put('http://localhost:51389/api/Incident_Level/' + id, obj)
  }
  GetIncident_Types() {
    return this.http.get('http://localhost:51389/api/Incident_Type')
  }
  DeleteIncident_Type(id) {
    return this.http.delete('http://localhost:51389/api/Incident_Type/' + id)
  }
  PostIncident_Type(obj){
    return this.http.post('http://localhost:51389/api/Incident_Type', obj)
  }
  GetIncident_Type(id) {
    return this.http.get('http://localhost:51389/api/Incident_Type/'+id)
  }
  PutIncident_Type(id, obj) {
    return this.http.put('http://localhost:51389/api/Incident_Type/' + id, obj)
  }
  GetIncidents(){
    return this.http.get('http://localhost:51389/api/Incident_Patrol')
  }
  GetIncident(id){
    return this.http.get('http://localhost:51389/api/Incidents/'+id)
  }
  PutIncident(id, obj) {
    return this.http.put('http://localhost:51389/api/Incidents/' + id, obj)
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
  GetRewardAdd() {
    return this.http.get('http://localhost:51389/api/Product_Reward')
  }
  PutRewardAdd(ID,obj) {
    return this.http.put('http://localhost:51389/api/Product_Reward/'+ID,obj)
  }
  PutEventRewardAdd(ID,obj) {
    return this.http.put('http://localhost:51389/api/Event_Reward/'+ID,obj)
  }
  GetRewardAdds(id) {
    return this.http.get('http://localhost:51389/api/Product_Reward/'+id)
  }
  GetEventRewardAdds(id) {
    return this.http.get('http://localhost:51389/api/Event_Reward/'+id)
  }
  DeleteRewardAdd(id) {
    return this.http.delete('http://localhost:51389/api/Product_Reward/' + id)
  }
  DeleteEventRewardAdd(id) {
    return this.http.delete('http://localhost:51389/api/Event_Reward/' + id)
  }
  GetEventRewardAdd(){
    return this.http.get('http://localhost:51389/api/Event_Reward')
  }
  PostRewardAdd(obj) {
    return this.http.post('http://localhost:51389/api/Product_Reward', obj)
  }
  PostEventRewardAdd(obj){
    return this.http.post('http://localhost:51389/api/Event_Reward', obj)
  }
  GetEventType() {
    return this.http.get('http://localhost:51389/api/Event_Type')
  }
  PostEventType(obj) {
    return this.http.post('http://localhost:51389/api/Event_Type', obj)
  }
  PutEventType(ID,obj) {
    return this.http.put('http://localhost:51389/api/Event_Type/'+ID,obj)
  }
  GetEventTypes(id) {
    return this.http.get('http://localhost:51389/api/Event_Type/'+id)
  }
  GetProductType(){
    return this.http.get('http://localhost:51389/api/Product_Type')
  }
  DeleteEventType(id) {
    return this.http.delete('http://localhost:51389/api/Event_Type/' + id)
  }
  PostProductType(obj){
    return this.http.post('http://localhost:51389/api/Product_Type', obj)
  }
  PutProductType(ID,obj) {
    return this.http.put('http://localhost:51389/api/Product_Type/'+ID,obj)
  }
  GetProductTypes(id) {
    return this.http.get('http://localhost:51389/api/Product_Type/'+id)
  }
  DeleteProductType(id) {
    return this.http.delete('http://localhost:51389/api/Product_Type/' + id)
  }
  GetAsset() {
    return this.http.get('http://localhost:51389/api/Asset')
  }
  GetSupplier() {
    return this.http.get('http://localhost:51389/api/Supplier')
  }
  PostSupplier(obj) {
    return this.http.post('http://localhost:51389/api/Supplier', obj)
  }
  
  // sendNotif(title,message) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Postman-Token': '7946b969-a677-4a17-8fc0-23e6a5f1081d',
  //       'cache-control': 'no-cache',
  //       'Content-Type': 'application/json',
  //       Authorization: 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
  //     })
  //   };
  //   var url: 'https://fcm.googleapis.com/fcm/send';
  //   var body:"{to: '/topics/ERP',notification:{body: message,  content_available: true,priority: 'high',title: title},data:{body: message,content_available: true,priority: 'high',title: title}}";
  //   console.log("1");
  //   // request(options, function (error, response, body) {
  //   //   if (error) throw new Error(error);

  //   //   console.log(body);
  //   // });
  //   return this.http.post(url,body,httpOptions)
    
  GetGates() {
    return this.http.get('http://localhost:51389/api/Gates')
  }
  PutGates(ID, obj) {
    return this.http.put('http://localhost:51389/api/Gates/' + ID, obj)
  }
  GetGate(id) {
    return this.http.get('http://localhost:51389/api/Gates/' + id)
  }
  GetReserves() {
    return this.http.get('http://localhost:51389/api/Reserves')
  }
  PostGate(obj) {
    return this.http.post('http://localhost:51389/api/Gates', obj)
  }
  DeleteGate(id) {
    return this.http.delete('http://localhost:51389/api/Gates/' + id)
  }
  showModal(err, message) {
    this.nError = err;
    this.nMessage = message;
    this.nav.err = err;
    this.nav.message = message;
    document.getElementById('generalMod').click();
  }
  PostReserve(obj) {
    return this.http.post('http://localhost:51389/api/Reserves', obj)
  }
  GetReserve(id) {
    return this.http.get('http://localhost:51389/api/Reserves/' + id)
  }
  PutReserve(ID, obj) {
    return this.http.put('http://localhost:51389/api/Reserves/' + ID, obj)
  }
  DeleteReserve(id) {
    return this.http.delete('http://localhost:51389/api/Reserves/' + id)
  }
  GetSecurities() {
    return this.http.get('http://localhost:51389/api/Security_Company')
  }
  PutSecurities(ID, obj) {
    return this.http.put('http://localhost:51389/api/Security_Company/' + ID, obj)
  }
  GetSecurity(id) {
    return this.http.get('http://localhost:51389/api/Security_Company/' + id)
  }
  PostSecurity(obj) {
    return this.http.post('http://localhost:51389/api/Security_Company', obj)
  }
  DeleteSecurity(id) {
    return this.http.delete('http://localhost:51389/api/Security_Company/' + id)
  }
 

  GetAccess_Levels() {
    return this.http.get('http://localhost:51389/api/Access_Level')
  }
  DeleteAccess_Level(id) {
    return this.http.delete('http://localhost:51389/api/Access_Level/' + id)
  }
  PostAccess_Level(obj) {
    return this.http.post('http://localhost:51389/api/Access_Level', obj)
  }
  GetAccess_Level(id) {
    return this.http.get('http://localhost:51389/api/Access_Level/'+id)
  }
  PutAccess_Level(id, obj) {
    return this.http.put('http://localhost:51389/api/Access_Level/' + id, obj)
  }
  GetMarker_Types() {
    return this.http.get('http://localhost:51389/api/Marker_Type')
  }
  PutMarker_Type(ID, obj) {
    return this.http.put('http://localhost:51389/api/Marker_Type/' + ID, obj)
  }
  GetMarker_Type(id) {
    return this.http.get('http://localhost:51389/api/Marker_Type/' + id)
  }
  PostMarker_Type(obj){
    return this.http.post('http://localhost:51389/api/Marker_Type', obj)
  }
  DeleteMarker_Type(id) {
    return this.http.delete('http://localhost:51389/api/Marker_Type/' + id)
  }
  GetVehicles() {
    return this.http.get('http://localhost:51389/api/Vehicles')
  }
  PutVehicle(ID, obj) {
    return this.http.put('http://localhost:51389/api/Vehicles/' + ID, obj)
  }
  GetVehicle(id) {
    return this.http.get('http://localhost:51389/api/Vehicles/' + id)
  }
  PostVehicle(obj){
    return this.http.post('http://localhost:51389/api/Vehicles', obj)
  }
  DeleteVehicle(id) {
    return this.http.delete('http://localhost:51389/api/Vehicles/' + id)
  }
  GetVehicle_types() {
    return this.http.get('http://localhost:51389/api/Vehicle_Types')
  }
  GetModels() {
    return this.http.get('http://localhost:51389/api/Models')
  }
  GetMakes() {
    return this.http.get('http://localhost:51389/api/Makes')
  }
}
