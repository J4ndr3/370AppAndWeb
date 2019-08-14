import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.sass']
})
export class VehicleComponent implements OnInit {

  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder) { }
  Vehicle: object;
  AddForm: FormGroup;
  NewVehicle:object;
  ModelSelection:number =0;
  TypeSelection:number =0;
  ModelOptions:Array<object>;
  MakeOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
  searchText;
  
  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Make: [""], 
      Model: [""], 
      Registration: [""],
      Colour:[""],
      Type:[""],
      Status:[""]
    });

    this.data.GetMakes().subscribe((res) => {
      this.MakeOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.data.GetModels().subscribe((res) => {
      this.ModelOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.data.GetVehicle_types().subscribe((res) => {
      this.MakeOptions = JSON.parse(JSON.stringify(res));
    }); 

    this.data.GetVehicles().subscribe(res=>{
      this.Vehicle = res;
      if (this.Vehicle[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Vehicle = null ;
      }
      console.log(this.Vehicle);
    });
  }

  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
}
