import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { modifyVehiclePage } from '../modifyvehicle/modifyvehicle.page';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  vehicles: any;
  EditForm : FormGroup;
  VehiclesPageSelection:number =0; //if you have a select list
  VehiclesPageOptions:Array<object>; //if you have a select list
  nVehiclesPage:object;
  rcv: object;
  
  constructor(private alertCtrl: AlertController,public toastController: ToastController,
   private router:Router,private data: ERPService,private mod:modifyVehiclePage, 
    private formBuilder: FormBuilder ) { 
    }
  ngOnInit() {
    this.data.GetVehicles().subscribe(res=>
      {
        this.vehicles = res;
        if (this.vehicles[0]=="Not readable")
      {
        this.loadFail();
        //this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.vehicles = null ;
      }
      console.log(this.vehicles);
        
      })
  }
  edit(ID){
    this.mod.edit(ID);
  }

  // update(ID){
  //   var CarRegistration = this.EditForm.get('NaCarRegistrationme').value; //the name in red the same as on you html
  //   var Make = this.EditForm.get('Make').value; //the name in red the same as on you html
  //   var TypeDescription = this.EditForm.get('TypeDescription').value;
  //   var Model = this.EditForm.get('Model').value;

  //   if (CarRegistration==""||TypeDescription==""||Model==""||Make=="") {
  //     document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
  //   }
  //   else {
  //     this.nVehiclesPage = {
  //       "CarRegistration":CarRegistration, //selfde as die databasis 
  //       "Make": Make, //selfde as die databasis
  //       "Model":Model,
  //       "TypeDescription":TypeDescription
  //     };
  //     console.log(this.nVehiclesPage);
  //     this.data.PutVehicle(ID,this.nVehiclesPage).subscribe(res => {
  //       this.rcv = res
  //       console.log(this.rcv);
  //       if (this.rcv == null)
  //       {
  //         this.successToast();
  //       }
  //       else
  //       {
  //         document.getElementById("inputErr").click();
  //       }
  //     });
  //   }
  // }
  

  private async successToast() {
    const toast = await this.toastController.create({ message: "Vehicle modified successfully.", duration: 3000 });
    toast.present();
  }
  private async loadFail() {
    const toast = await this.toastController.create({ message: "Vehicle could not be loaded please try again later", duration: 3000 });
    toast.present();
  }
  private async failedToast() {
    const toast = await this.toastController.create({ message: "Vehicle could not be modified.", duration: 3000 });
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
