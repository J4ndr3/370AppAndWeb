import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ERPService {
  nvalidate:any;
  nvalidate1:any;
  viewvalidate:any;
  viewvalidate1:any;
  Claimed:any;

nID:any;
  constructor(private http: HttpClient) { }
  GetRanger(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/'+ID)
  }
  GetRangers(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/')
  }
  GetGenders(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Genders/')
  }
  GetOrganisations(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Organisations/')
  }
  GetMedical(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Medical_Aid/')
  }
  GetAddvehiclePage(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/')
  }
  Getrangerpatrol(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/')
  }
  PostRanger(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Rangers/',obj)
  }
  PostRoute(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Trackings/',obj)
  }
  GetProduct_Reward(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Reward')
  }
  GetEvent_Reward(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Reward')
  }
  GetEvent_RewardID(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Event_Reward/'+ID)
  }
  GetProduct_RewardID(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Product_Reward/'+ID)
  }
  PutRewardAdd(ID,obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Product_Reward/'+ID,obj)
  }
  GetRedeem_Reward(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Redeem_Reward')
  }
  GetRedeem_RewardID(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Redeem_Reward/'+ID)
  }
  PutRedeem_Reward(ID,obj) {
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Redeem_Reward/'+ID,obj)
  }
  PostRedeem_Reward(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Redeem_Reward', obj)
  }
  GetRangerID(id){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Rangers/'+id)
  }
  GetIncident_Types() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Incident_Type')
  }
  PostIncident(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Incidents/', obj)
  }
  GetNotifications() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Notifications')
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
    });}

   
  PutRanger(ID,obj){
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/rangers/'+ID,obj)
  }
  GetReserves(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/reserves/')
  }
  GetVehicles(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Vehicles/')
  }
  PostPatrol_Booking(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking/',obj)
  }
  GetPatrol_Booking(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking/'+ID)
  }
  PutPatrol_Booking(ID,obj){
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking/'+ID,obj)
  }
  GetVehicle(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/vehicles/'+ID)
  }
  PutVehicle(ID,obj){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/vehicles/'+ID,obj)
  }
  GetPatrol_Bookings(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking/')
  }
  PostIncident_Image(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Incident_Image/',obj)
  }
  PostIncident_Patrol(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Incident_Patrol/',obj)
  }

  DeletePatrolBooking(id){
    return this.http.delete('https://2019group4inf370.azurewebsites.net/api/Patrol_Booking/' + id)
  }
  GetVehicle_types() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Vehicle_Type')
  }
  GetModels() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Models')
  }
  GetMakes() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Makes')
  }
  GetAssets(){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Assets')
  }
  GetMarkers() {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Markers')
  }
  UpdatePoints(id,points){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Rangers/UpdatePoints/?Ranger_ID='+id+'&Points='+points)
  }

  PostPatrol_Log(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Patrol_Log/',obj)
  }
  PostPatrol_Assets(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Patrol_Asset/',obj)
  }
  PostFeedback(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Feedbacks/',obj)
  }
  PutPatrol(ID,obj){
    return this.http.put('https://2019group4inf370.azurewebsites.net/api/Patrol_Log/'+ID,obj)
  }
  GetPatrol_LOg(ID){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Patrol_Log/'+ID)
  }
  PostPatrol_Markers(obj){
    return this.http.post('https://2019group4inf370.azurewebsites.net/api/Patrol_Marker/',obj)
  }
}
