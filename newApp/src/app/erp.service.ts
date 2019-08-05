import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ERPService {

  constructor(private http: HttpClient) { }
  GetRegisterFormPage(){
    return this.http.get('http://localhost:51389/api/rangers/')
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
    return this.http.get('http://localhost:51389/api/rangers/',obj)
  }
}
