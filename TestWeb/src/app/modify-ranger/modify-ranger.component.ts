import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-ranger',
  templateUrl: './modify-ranger.component.html',
  styleUrls: ['./modify-ranger.component.sass']
})
export class ModifyRangerComponent implements OnInit {
EditForm:FormGroup;
Ranger:Array<object>;;
GenderSelection: number = 0; //if you have a select list
  UserRoleOptions: Array<object>; //if you have a select list
  UserRoleSelection: number = 0; //if you have a select list
  GenderOptions: Array<object>; //if you have a select list
  OrganisationSelection: number = 0; //if you have a select list
  OrganisationOptions: Array<object>; //if you have a select list
  MedicalSelection: number = 0; //if you have a select list
  MedicalOptions: Array<object>; //if you have a select list
  constructor(private toastrService: ToastrService,private formbuilder:FormBuilder, private router:Router,private data:ERPService) { }

  ngOnInit() {
    this.data.GetRangers(this.data.nID).subscribe(res=>{
      this.data.GetGender().subscribe(res=>{
        this.GenderOptions = JSON.parse(JSON.stringify(res));
        this.data.GetMedicalAid().subscribe(res=>{
          this.MedicalOptions = JSON.parse(JSON.stringify(res));
          console.log(this.MedicalOptions);
      })
      this.data.GetOrganisation().subscribe(res=>{
        this.OrganisationOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetUserRole().subscribe(res=>{
      this.UserRoleOptions = JSON.parse(JSON.stringify(res));
      console.log(this.UserRoleOptions);
  })
    })
      this.Ranger = JSON.parse(JSON.stringify(res));
      if (res["Status"] == true){
        var Status = "Active";
    }
    else if (res["Status"] == false)
    {
        var Status = "Inactive";
    }
      this.EditForm = this.formbuilder.group({
        fname: [res["Name"]], // Names for your input
          lname: [res["Surname"]], // Names for your input 
          rangerId: [res["ID_Number"]],
          email: [res["Email"]],
          phone:[res["Cell"]],
          emergencycontactName:[res["Emerg_Name"]],
          EmergencycontactNumber:[res["Emerg_Contact"]],
          MedicalAid:[res["Medical_Aid_ID"]],
          Organizationtitle:[res["Organisation_ID"]],
          username:[res["Username"]],
          selectgender:[res["genderID"]],
          selectbloodtype:[res["Blood_Type"]],
          UserRole:[res["User_Role_ID"]],
          Status:[Status]})
    })
  }
  Toast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
  edit(ID){
    this.data.nID = ID;
    this.router.navigateByUrl("/modify-ranger");
    window.alert(ID);
  }
}
