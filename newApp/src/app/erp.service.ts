import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ERPService {
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
}
