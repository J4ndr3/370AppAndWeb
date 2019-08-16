import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModifybookingPagecomponent }  from '../ModifybookingPage-modify/ModifybookingPage-mod.component';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modifybooking',
  templateUrl: './modifybooking.page.html',
  styleUrls: ['./modifybooking.page.scss'],
})
export class ModifybookingPage implements OnInit {
  ModifybookingPage: any;
  EditForm : FormGroup;
  ModifybookingPageSelection:number =0; //if you have a select list
  ModifybookingPageOptions:Array<object>; //if you have a select list
  nModifybookingPage:object;
  rcv: object;
  
  constructor(private alertCtrl: AlertController,public toastController: ToastController,private mod:ModifybookingPagecomponent,
    private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }
  edit(ID){
    this.mod.edit(ID);
  }


  ngOnInit() {
    this.data.GetModifybookingPageDropdown().subscribe(res=>{
    this.ModifybookingPageOptions = JSON.parse(JSON.stringify(res));
  })
  this.EditForm = this.formBuilder.group({
    SelectPassenger:[], // your attributes
    SelectVehicle: [], // your attributes
    Starttime: [], // your attributes
    Endtime: []
    });
    this.edt();
  }
  edt(){
    this.data.GetModifybookingPage(this.data.nID).subscribe(res=>{     
      this.ModifybookingPage = res;
      this.EditForm.setValue({ID:this.ModifybookingPage.ModifybookingPage_ID,
        SelectPassenger:this.ModifybookingPage.SelectPassenger,
        SelectVehicle :this.ModifybookingPage.SelectVehicle,
        Starttime:this.ModifybookingPage.Starttime,
        Endtime:this.ModifybookingPage.Endtime,
        })    
    })
  }
  update(){
    var SelectPassenger = this.EditForm.get('SelectPassenger').value; //the name in red the same as on you html
    var SelectVehicle = this.EditForm.get('SelectVehicle').value; //the name in red the same as on you html
    var Starttime = this.EditForm.get('Starttime').value;
    var Endtime = this.EditForm.get('Endtime').value;

    if (SelectPassenger==""||SelectVehicle==""||Starttime==""||Endtime=="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nModifybookingPage = {
        "ModifybookingPage_ID":ID, //selfde as die databasis 
        "SelectPassenger": SelectPassenger, //selfde as die databasis
        "SelectVehicle": SelectVehicle,
        "Starttime":Starttime,
        "Endtime" :Endtime
      };
      console.log(this.nModifybookingPage);
      this.data.PutGates(ID,this.nModifybookingPage).subscribe(res => {
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
  }


  edit(ID){
    this.data.GetModifybookingPage(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/ModifybookingPagePage");
      }
      else{
        this.router.navigateByUrl("/ModifybookingPageModifyPage");
        this.ngOnInit();
        this.data.nID = ID;
      }})
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/gate");
  }


  private async successToast() {
    const toast = await this.toastController.create({ message: "Booking modified successfully.", duration: 3000 });
    toast.present();
  }
  private async failedToast() {
    const toast = await this.toastController.create({ message: "Booking could not be modified.", duration: 3000 });
    toast.present();
  }
  private async modifyyesorno() {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: 'Are you sure you want to modify this record?',
      buttons: ['Cancel','OK']
    });
    alert.present();
  }
}
