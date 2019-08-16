import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { VehiclesPageComponent }  from '../VehiclesPage-modify/VehiclesPage-mod.component'
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  VehiclesPage: any;
  EditForm : FormGroup;
  VehiclesPageSelection:number =0; //if you have a select list
  VehiclesPageOptions:Array<object>; //if you have a select list
  nVehiclesPage:object;
  rcv: object;
  
  constructor(private alertCtrl: AlertController,public toastController: ToastController,
    private mod:VehiclesPageComponent,private router:Router,private data: ERPService, 
    private formBuilder: FormBuilder ) { 
      
    }
    edit(ID){
      this.mod.edit(ID);
    }
  

  ngOnInit() {
    this.data.GetVehiclesPageDropdown().subscribe(res=>{
      this.VehiclesPageOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      CarRegistration:[], // your attributes
      Make: [], // your attributes
      Model: [] ,// your attributes
      TypeDescription: []
      });
      this.edt();

  }
  edit(ID){
    this.data.GetVehiclesPage(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/Vehicles");
      }
      else{
        this.router.navigateByUrl("/Vehicles");
        this.ngOnInit();
        this.data.nID = ID;
      }})   
  }
  edt(){
    this.data.GetVehiclesPage(this.data.nID).subscribe(res=>{     
      this.VehiclesPage = res;
      this.EditForm.setValue({ID:this.VehiclesPage.VehiclesPage_ID,
        CarRegistration:this.VehiclesPage.CarRegistration,
        Make:this.VehiclesPage.Make,
        Model: this.VehiclesPage.Model,
        TypeDescription: this.VehiclesPage.TypeDescription
        })    
    })
  }
  update(){
    var CarRegistration = this.EditForm.get('NaCarRegistrationme').value; //the name in red the same as on you html
    var Make = this.EditForm.get('Make').value; //the name in red the same as on you html
    var TypeDescription = this.EditForm.get('TypeDescription').value;
    var Model = this.EditForm.get('Model').value;

    if (CarRegistration==""||TypeDescription==""||Model==""||Make=="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nVehiclesPage = {
        "CarRegistration":CarRegistration, //selfde as die databasis 
        "Make": Make, //selfde as die databasis
        "Model":Model,
        "TypeDescription":TypeDescription
      };
      console.log(this.nVehiclesPage);
      this.data.PutVehiclesPage(ID,this.nVehiclesPage).subscribe(res => {
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
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/vehicles");
  }

  private async successToast() {
    const toast = await this.toastController.create({ message: "Vehicle modified successfully.", duration: 3000 });
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
