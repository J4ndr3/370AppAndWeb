import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { RangerprofilePageModifyComponent }  from '../RangerprofilePage-modify/RangerprofilePage-mod.component'
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-rangerprofile',
  templateUrl: './rangerprofile.page.html',
  styleUrls: ['./rangerprofile.page.scss'],
})
export class RangerprofilePage implements OnInit {
  RangerprofilePage: any;
EditForm : FormGroup;
RangerprofilePageSelection:number =0; //if you have a select list
RangerprofilePageOptions:Array<object>; //if you have a select list
RangerprofilePageSelection1:number =0; //if you have a select list
RangerprofilePageOptions1:Array<object>; //if you have a select list
nRangerprofilePage:object;
rcv: object;

  
  constructor(private alertCtrl: AlertController,public toastController: ToastController,
    private data: ERPService,private mod:RangerprofilePageModifyComponent,
    private router:Router, private formBuilder: FormBuilder ) 
    { 
      edit(ID){
        this.mod.edit(ID);
      }    
    }

  ngOnInit() {{
    this.data.GetRangerprofilePageDropdown().subscribe(res=>{
      this.RangerprofilePageOptions = JSON.parse(JSON.stringify(res));
    })
    edt(){
      this.data.GetRangerprofilePage(this.data.nID).subscribe(res=>{     
        this.RangerprofilePage = res;
        this.EditForm.setValue({ID:this.RangerprofilePage.RangerprofilePage_ID,
          ID:this.RangerprofilePage.ID,
          fname:this.RangerprofilePage.fname,
          lname:this.RangerprofilePage.lname,
          username: this.RangerprofilePage.username,
          Password: this.RangerprofilePage.Password,
          Passwordcopy: this.RangerprofilePage.Passwordcopy,
          IDnumber: this.RangerprofilePage.IDnumber,
          Email: this.RangerprofilePage.Email,
          Phone: this.RangerprofilePage.Phone,
          Gender: this.RangerprofilePage.Gender,
          Organisation: this.RangerprofilePage.Organisation,
          EmergencycontactName: this.RangerprofilePage.EmergencycontactName,
          EmergencycontactNumber: this.RangerprofilePage.EmergencycontactNumber,
          MedicalAid: this.RangerprofilePage.MedicalAid,
          Bloodtype: this.RangerprofilePage.Bloodtype,
          })    
      })
    }
    update(){
      var fname = this.EditForm.get('fname').value; //the name in red the same as on you html
      var lname = this.EditForm.get('lname').value; //the name in red the same as on you html
      var username = this.EditForm.get('username').value;
      var Password = this.EditForm.get('Password').value;
      var Passwordcopy = this.EditForm.get('Passwordcopy').value;
      var IDnumber = this.EditForm.get('IDnumber').value;
      var Email = this.EditForm.get('Email').value;
      var Phone = this.EditForm.get('Phone').value;
      var Gender = this.EditForm.get('Gender').value;
      var Organisation = this.EditForm.get('Organisation').value;
      var EmergencycontactName = this.EditForm.get('EmergencycontactName').value;
      var EmergencycontactNumber = this.EditForm.get('EmergencycontactNumber').value;
      var MedicalAid = this.EditForm.get('MedicalAid').value;
      var Bloodtype = this.EditForm.get('Bloodtype').value;
      var ID = this.EditForm.get('ID').value;
  
      if (fname==""||lname==""||username==""||Password=="" || Passwordcopy =="" ||IDnumber==""||Email==""||
      Phone==""||Gender==""|| Organisation==""||EmergencycontactName==""||EmergencycontactNumber==""||MedicalAid==""||
      Bloodtype=="") {
        document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
      }
      else {
        this.nRangerprofilePage = {
          "RangerprofilePage_ID":ID, //selfde as die databasis 
          "fname": fname, //selfde as die databasis
          "lname": lname,
          "username": username,
          "Password": Password,
          "Passwordcopy": Password,
          "IDnumber": IDnumber,
          "Email": Email,
          "Phone": Phone,
          "Gender": Gender,
          "Organisation": Organisation,
          "EmergencycontactName": EmergencycontactName,
          "EmergencycontactNumber":EmergencycontactNumber,
          "MedicalAid":MedicalAid,
          "Bloodtype":Bloodtype,
          "ID":ID,
        };
        console.log(this.nRangerprofilePage);
        this.data.PostRanger(ID,this.nRangerprofilePage).subscribe(res => {
          this.rcv = res
          console.log(this.rcv);
          if (this.rcv == null)
          {
            this.showToast();
          }
          else
          {
            document.getElementById("inputErr").click();
          }
        });
      }
      showToast(){
        this.toastrService.show("Record modified successfully.", "Success!");
        this.router.navigateByUrl("/gate");
      }
    
    }
  
  
    this.EditForm = this.formBuilder.group({
      ID:[],
      fname:[], // your attributes
      lname: [], // your attributes
      username: [] ,// your attributes
      Password: [],
      Passwordcopy:[],
      IDnumber:[],
      Email:[],
      Phone:[],
      Gender:[],
      Organisation:[],
      EmergencycontactName:[],
      EmergencycontactNumber:[],
      MedicalAid:[],
      Bloodtype:[],
      });
      this.edt();
  }
  edit(ID)
  {
    this.data.GetRangerprofilePage(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/RangerprofilePage");
      }
      else{
        this.router.navigateByUrl("/RangerprofilePage");
        this.ngOnInit();
        this.data.nID = ID;
      }})  
  }
  }
  private async Successtoast() {
    const toast = await this.toastController.create({message:"Profile Successfully updated",duration:3000});
    toast.present();
  }
  private async failedtoast() {
    const toast = await this.toastController.create({message:"Failed to update. Retry.",duration:3000});
    toast.present();
  }

  private async containsmodifications() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to apply these changes?',
      buttons: [{text:'Cancel'},{text:'Apply'}] 
    });
    alert.present();
  }
}
