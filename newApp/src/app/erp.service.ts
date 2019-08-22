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
  GetProduct_Reward(){
    return this.http.get('http://localhost:51389/api/Product_Reward')
  }
  GetEvent_Reward(){
    return this.http.get('http://localhost:51389/api/Event_Reward')
  }
  GetEvent_RewardID(ID){
    return this.http.get('http://localhost:51389/api/Event_Reward/'+ID)
  }
  GetProduct_RewardID(ID){
    return this.http.get('http://localhost:51389/api/Product_Reward/'+ID)
  }
  PutRewardAdd(ID,obj) {
    return this.http.put('http://localhost:51389/api/Product_Reward/'+ID,obj)
  }
  GetRedeem_Reward(){
    return this.http.get('http://localhost:51389/api/Redeem_Reward')
  }
  GetRedeem_RewardID(ID){
    return this.http.get('http://localhost:51389/api/Redeem_Reward/'+ID)
  }
  PutRedeem_Reward(ID,obj) {
    return this.http.put('http://localhost:51389/api/Redeem_Reward/'+ID,obj)
  }
  PostRedeem_Reward(obj){
    return this.http.post('http://localhost:51389/api/Redeem_Reward', obj)
  }
  GetRangerID(id){
    return this.http.get('http://localhost:51389/api/Rangers/'+id)
  }
}
