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
  GenderPageOptions: Array<object>; //if you have a select list
  OrganisationSelection: number = 0; //if you have a select list
  OrganisationOptions: Array<object>; //if you have a select list
  MedicalSelection: number = 0; //if you have a select list
  MedicalOptions: Array<object>; //if you have a select list
  nRangerprofilePage: object;
  rcv: object;


  constructor(private alertCtrl: AlertController, public toastController: ToastController,
    private data: ERPService,
    private router: Router, private formBuilder: FormBuilder) {}
  ngOnInit() {
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
      Organisation: [],
      EmergencycontactName: [],
      EmergencycontactNumber: [],
      MedicalAid: [],
      Bloodtype: [],
    });
      this.data.GetRanger(3).subscribe(res => {
        console.log(res);
        this.EditForm.setValue({fname:res["Name"],lname:res["Surname"],username:res["Username"],Password:["Password"],Passwordcopy:["Password"]})
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
  update(){

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
      buttons: [{ text: 'Cancel' }, { text: 'Apply' }]
    });
    alert.present();
  }
}
