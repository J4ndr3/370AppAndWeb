import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.page.html',
  styleUrls: ['./addvehicle.page.scss'],
})
export class AddvehiclePage implements OnInit {
  AddForm: FormGroup;
  Vehicle: any;
  YourSelection: number = 0; //if you have a select list
  ModelSelection: number = 0;
  TypeSelection: number = 0;
  ModelOptions: Array<object>;
  MakeOptions: Array<object>;
  Models: Array<object>;
  TypeOptions: Array<object>; //if you have a select list
  nVehicle: object;
  rcv: object;
  @ViewChild('regform') containerEltRef: ElementRef;

  constructor(private toastcontroler:ToastController,private router:Router,private renderer: Renderer2, private data: ERPService, private formBuilder: FormBuilder) { }
  currentTab = 0;
  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      CarRegistration: [""], // Names for your input
      SelectColour: [""], // Names for your input 
      Make: [""],
      Model: [""],
      TypeDescription: [""],
      Status:[]
    });
  }
  ngAfterViewInit() {
    
    this.data.GetModels().subscribe((res) => {
      this.ModelOptions = JSON.parse(JSON.stringify(res));
    });
    this.data.GetVehicle_types().subscribe((res) => {
      this.TypeOptions = JSON.parse(JSON.stringify(res));
  });
  this.data.GetMakes().subscribe(res=>{
    this.MakeOptions = JSON.parse(JSON.stringify(res));
  })
  }
  addAddvehicleBtn() {
    /* if there is a select/ dropdown use the following method to populate data for it */
    
  }
  private async Input() {
    const toast = await this.toastcontroler.create({ message: "Input provided is incorrrect", duration: 3000 });
    toast.present();
}

  update() {
    var CarRegistration = this.AddForm.get('CarRegistration').value; // Names for your input
    var SelectColour = this.AddForm.get('SelectColour').value; // Names for your input
    var Make = this.AddForm.get('Make').value;
    var Model = this.AddForm.get('Model').value;
    var TypeDescription = this.AddForm.get('TypeDescription').value;

    if (CarRegistration ==""  ) {
     this.Input();
    }
    else {
      this.nVehicle = {
                "Model_ID": Model,
                "Registration": CarRegistration,
                "Colour": SelectColour,
                "Status": true,
                "Vehicle_Type_ID": TypeDescription
      };
      this.data.PostVehicle(this.nVehicle).subscribe(res => {
        this.router.navigateByUrl("/vehicles")
      });
    }
  }


}
