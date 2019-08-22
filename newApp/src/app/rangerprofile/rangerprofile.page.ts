import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rangerprofile',
  templateUrl: './rangerprofile.page.html',
  styleUrls: ['./rangerprofile.page.scss'],
})
export class RangerprofilePage implements OnInit {
  RangerprofilePage: any;
  EditForm: FormGroup;
  GenderSelection: number = 0; //if you have a select list
  GenderOptions: Array<object>; //if you have a select list
  OrganisationSelection: number = 0; //if you have a select list
  OrganisationOptions: Array<object>; //if you have a select list
  MedicalSelection: number = 0; //if you have a select list
  MedicalOptions: Array<object>; //if you have a select list
  nRangerprofilePage: object;
  rcv: object;


  constructor(private alertCtrl: AlertController, public toastController: ToastController,
    private data: ERPService,
    private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.data.GetGenders().subscribe(res => {
      this.GenderOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetMedical().subscribe(res => {
      this.MedicalOptions = JSON.parse(JSON.stringify(res));
      console.log(this.MedicalOptions);
    })
    this.data.GetOrganisations().subscribe(res => {
      this.OrganisationOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      //ID: [],
      fname: [], // your attributes
      lname: [], // your attributes
      username: [],// your attributes
      Password: [],
      Passwordcopy: [],
      IDnumber: [],
      Email: [],
      Phone: [],
      Gender: [],
      Organizationtitle: [],
      EmergencycontactName: [],
      EmergencycontactNumber: [],
      MedicalAid: [],
      selectbloodtype: [],
    });
    this.data.GetRanger(3).subscribe(res => {
      console.log(res);
      this.EditForm.setValue({
        fname: res["Name"],
        lname: res["Surname"],
        username: res["Username"],
        Password: res["Password"],
        Passwordcopy: res["Password"],
        IDnumber: res["ID_Number"],
        Email: res["Email"],
        Phone: res["Cell"],
        Gender: res["genderID"],
        Organizationtitle: res["Organisation_ID"],
        EmergencycontactName: res["Emerg_Name"],
        EmergencycontactNumber: res["Emerg_Contact"],
        MedicalAid: res["Medical_Aid_ID"],
        selectbloodtype: res["Blood_Type"]
      })
      // this.RangerprofilePageOptions = JSON.parse(JSON.stringify(res));

    })

    //this.edt();
  }
  // edt(){
  //   this.data.GetRangerprofilePage(ID).subscribe(res => {
  //     if (res == 1) {
  //       alert("Not found");
  //       this.router.navigateByUrl("/RangerprofilePage");
  //     }
  //     else {
  //       this.router.navigateByUrl("/RangerprofilePage");
  //       this.ngOnInit();
  //       this.data.nID = ID;
  //     }
  //   })
  // }
  update() {
    var fname = this.EditForm.get('fname').value; // Names for your input
    var lname = this.EditForm.get('lname').value; // Names for your input
    var rangerId = this.EditForm.get('IDnumber').value;
    var email = this.EditForm.get('Email').value; // Names for your input
    var phone = this.EditForm.get('Phone').value;
    var emergencycontactName = this.EditForm.get('EmergencycontactName').value; // Names for your input
    var EmergencycontactNumber = this.EditForm.get('EmergencycontactNumber').value;
    var MedicalAid = this.EditForm.get('MedicalAid').value;
    var username = this.EditForm.get('username').value;
    var password = this.EditForm.get('Password').value;
    var confirmpassword = this.EditForm.get('Passwordcopy').value;
    var selectgender = this.EditForm.get('Gender').value;
    var selectbloodtype = this.EditForm.get('selectbloodtype').value;
    var Organizationtitle = this.EditForm.get('Organizationtitle').value;
    this.nRangerprofilePage = {
      "Ranger_ID":3,
      "ID_Number": rangerId,
      "Name": fname, // Names for your input
      "Surname": lname, // Names for your input
      "Email": email,
      "Cell":phone,
      "genderID": selectgender,
      "Emerg_Name": emergencycontactName,
      "Emerg_Contact": EmergencycontactNumber,
      "Status":1,
      "User_Role_ID":5,
      "Medical_Aid_ID": MedicalAid,
      "Points":0,
      "Blood_Type": selectbloodtype, 
      "Username": username,
      "Password": password,
      "Organisation_ID":Organizationtitle,
      "Smartphone":1,
      "Access_ID":6
    };
    console.log(this.nRangerprofilePage)
    this.data.PutRanger(3, this.nRangerprofilePage).subscribe(res => {
        console.log(res)
      this.ngOnInit()
    });
  }
  private async Successtoast() {
    const toast = await this.toastController.create({ message: "Profile Successfully updated", duration: 3000 });
    toast.present();
  }
  private async failedtoast() {
    const toast = await this.toastController.create({ message: "Failed to update. Retry.", duration: 3000 });
    toast.present();
  }

  private async containsmodifications() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to apply these changes?',
      buttons: [{ text: 'Cancel',handler: () => {
        this.ngOnInit();
      } }, {
        text: 'Apply', handler: () => {
          this.update();
        }
      }]
    });
    alert.present();
  }
}
