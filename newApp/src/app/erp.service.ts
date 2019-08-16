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
  PutRanger(ID,obj){
    return this.http.put('http://localhost:51389/api/rangers/'+ID,obj)
  }
  
}
