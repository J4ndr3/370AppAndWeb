import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { RangerprofilePageModifyComponent }  from '../RangerprofilePage-modify/RangerprofilePage-mod.component'

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
  edit(ID){
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
