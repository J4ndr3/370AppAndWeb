import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModifyRangerComponent } from 'src/app/modify-ranger/modify-ranger.component'
import { ViewRangerComponent } from '../view-ranger/view-ranger.component';


@Component({
  selector: 'app-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.sass']
})
export class RangerComponent implements OnInit {
  Rangers: object;
  searchtext;
  // AddForm: FormGroup;
  // NewRanger: object;
  // UserRoleSelection: number = 0;
  // UserRoleOptions: Array<object>;
  // GenderSelection: number = 0;
  // GenderOptions: Array<object>;
  // OrganistaionSelection: number = 0;
  // OrganistaionOptions: Array<object>;
  // StatusSelection: number = 0;
  // StatusOptions: Array<object>;
  // MedicalAidSelection: number = 0;
  // MedicalAidOptions: Array<object>;
  // BloodSelection: number = 0;
  // BloodOptions: Array<object>;
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: ModifyRangerComponent, private view1: ViewRangerComponent) { }

  ngOnInit() {
    this.data.GetRanger().subscribe(res => {
      console.log(res);
      this.Rangers = res;
    });
  }
  // addRangerBtn() {
    // this.AddForm = this.formBuilder.group({
    //   FName: [""],
    //   LName: [""],
    //   UserRole: [""],
    //   IDNum: [""],
    //   Email: [""],
    //   Cell: [""],
    //   Gender: [""],
    //   Organisation: [""],
    //   Status: [""],
    //   EmergName: [""],
    //   EmergCell: [""],
    //   MedicalAid: [""],
    //   Blood: [""],
    //   UserName: [""],
    //   Password: [""],
    //   ConfirmPassword: [""]
    // });
    // this.data.GetUserRole().subscribe((res) => {
    //   this.UserRoleOptions = JSON.parse(JSON.stringify(res));
    // });
    // this.data.GetGender().subscribe((res) => {
    //   this.GenderOptions = JSON.parse(JSON.stringify(res));
    // });
    // this.data.GetOrganisation().subscribe((res) => {
    //   this.OrganistaionOptions = JSON.parse(JSON.stringify(res));
    // });
    // this.data.GetStatus().subscribe((res) => {
    //   this.StatusOptions = JSON.parse(JSON.stringify(res));
    // });
    // this.data.GetMedicalAid().subscribe((res) => {
    //   this.MedicalAidOptions = JSON.parse(JSON.stringify(res));
    // });
  // }
  // addRanger() {
  //   var FName = this.AddForm.get('FName').value;
  //   var LName = this.AddForm.get('LName').value;
  //   var UserRole = this.AddForm.get('UserRole').value;
  //   var IDNum = this.AddForm.get('IDNum').value;
  //   var Email = this.AddForm.get('Email').value;
  //   var Cell = this.AddForm.get('Cell').value;
  //   var Gender = this.AddForm.get('Gender').value;
  //   var Organisation = this.AddForm.get('Organisation').value;
  //   var Status = this.AddForm.get('Status').value;
  //   var EmergName = this.AddForm.get('EmergName').value;
  //   var EmergCell = this.AddForm.get('EmergCell').value;
  //   var MedicalAid = this.AddForm.get('MedicalAid').value;
  //   var Blood = this.AddForm.get('Blood').value;
  //   var UserName = this.AddForm.get('UserName').value;
  //   var Password = this.AddForm.get('Password').value;
  //   var ConfirmPassword = this.AddForm.get('ConfirmPassword').value;

  //   if ((FName||LName||UserRole||IDNum||Email||Cell||Gender||Organisation||Status||EmergName||EmergCell||MedicalAid||Blood||UserName||Password||ConfirmPassword)=="") {
  //     //Modal popup
  //   }
  //   else {
  //     this.NewRanger = {
  //       "Name": FName,
  //       "Surname": LName,
  //       "UserRole": UserRole,
  //       "IDNum": IDNum,
  //       "Email": Email,
  //       "Cell": Cell,
  //       "Gender": Gender,
  //       "Organisation": Organisation,
  //       "Status": Status,
  //       "EmergName": EmergName,
  //       "MedicalAid": MedicalAid,
  //       "Blood": Blood,
  //       "UserName": UserName,
  //       "Password": Password
  //     };
  //     this.data.PostRanger(this.NewRanger).subscribe(res => {
  //       this.ngOnInit()
  //     });
  //   }
  // }
  
  showToast() {
    this.toastrService.show("Record added successfully", "Success!");
  }
  edit(ID){
    this.mod.edit(ID);
  }
  view(ID){
    console.log("Hallo",ID)
    this.view1.open(ID);
  }
  sendNote(){
    console.log("hit");
    this.data.sendNotif("Full moon","Tonight is a full moon be on the lookout.");
    
  }
}
