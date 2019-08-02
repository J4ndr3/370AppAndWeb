import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ERPService {

  constructor(private http: HttpClient) { }
  GetRanger() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostRanger(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteRaner(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutRanger(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }

  GetUserRole() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostUserRole(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteUserRole(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutUserRole(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }

  GetGender() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostGender(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteGender(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutGender(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }

  GetStatus() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostStatus(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteStatus(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutStatus(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }

  GetMedicalAid() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostMedicalAid(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteMedicalAid(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutMedicalAid(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }

  GetOrganisation() {
    return this.http.get('http://localhost:30264/api/Caus')
  }
  PostOrganisation(obj){
    return this.http.post('http://localhost:30264/api/Caus',obj)
  }
  DeleteOrganisation(id){
    return this.http.delete('http://localhost:30264/api/Caus/'+id)
  }
  PutOrganisation(id, obj){
    return this.http.put('http://localhost:30264/api/Caus/'+id,obj)
  }
}
