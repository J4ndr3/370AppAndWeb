import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ERPService {
nID:any;
  constructor(private http: HttpClient) { }
  GetRanger(ID){
    return this.http.get('http://localhost:51389/api/rangers/'+ID)
  }
  GetRangers(){
    return this.http.get('http://localhost:51389/api/rangers/')
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
  Getrangerpatrol(){
    return this.http.get('http://localhost:51389/api/rangers/')
  }
  PostRanger(obj){
    return this.http.post('http://localhost:51389/api/Rangers/',obj)
  }
  PostRoute(obj){
    return this.http.post('http://localhost:51389/api/Trackings/',obj)
  }
  PutRanger(ID,obj){
    return this.http.put('http://localhost:51389/api/rangers/'+ID,obj)
  }
  GetReserves(){
    return this.http.get('http://localhost:51389/api/reserves/')
  }
  GetVehicles(){
    return this.http.get('http://localhost:51389/api/Vehicles/')
  }
  PostPatrol_Booking(obj){
    return this.http.post('http://localhost:51389/api/Patrol_Booking/',obj)
  }
  GetPatrol_Booking(ID){
    return this.http.get('http://localhost:51389/api/Patrol_Booking/'+ID)
  }
  PutPatrol_Booking(ID,obj){
    return this.http.put('http://localhost:51389/api/Patrol_Booking/'+ID,obj)
  }
  GetVehicle(ID){
    return this.http.get('http://localhost:51389/api/vehicles/'+ID)
  }
  PutVehicle(ID,obj){
    return this.http.get('http://localhost:51389/api/vehicles/'+ID,obj)
  }
  GetPatrol_Bookings(){
    return this.http.get('http://localhost:51389/api/Patrol_Booking/')
  }
}
