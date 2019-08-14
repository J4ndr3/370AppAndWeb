import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.sass']
})
export class SupplierComponent implements OnInit {
  Suppliers: object;
  AddForm: FormGroup;
  NewSupplier:object;
  SupplierSelection:number =0;
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetSupplier().subscribe(res=>{
      this.Suppliers = res;
    });
  }

  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
  addYourBtn() {
    this.AddForm = this.formBuilder.group({
      Name: [""], // Names for your input
      Contact: [""], // Names for your input 
      Email: [""],
      Address: [""]
    });
  }
  addSupplier() {
    var Name = this.AddForm.get('Name').value; // Names for your input
    var Contact = this.AddForm.get('Contact').value; // Names for your input
    var Email = this.AddForm.get('Email').value;
    var Address = this.AddForm.get('Address').value;
    

    if ((Name||Contact||Email||Address)=="") {
      //Modal popup
    }
    else {
      this.NewSupplier = {
        "Name": Name, // Names for your input
        "Contact": Contact, // Names for your input
        "Email": Email,
        "Address":Address,
        
      };
      this.data.PostSupplier(this.NewSupplier).subscribe(res => {
        this.ngOnInit()
      });}}


}
