import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';       

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.sass']
})
export class ProductTypeComponent implements OnInit {
  ProductTypes: object;
  AddForm: FormGroup;
  NewProductType:object;
  ProductTypeSelection:number =0;
  ProductTypeOptions:Array<object>; 

  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetProductType().subscribe(res=>{
      this.ProductTypes = res;
    });
    this.AddForm = this.formBuilder.group({
          Description: [""], // Names for your input
    });
  }

  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  
}




addProductType() {
  var Description = this.AddForm.get('Description').value; // Names for your input
  

  if ((Description)=="") {
    //Modal popup
  }
  else {
    this.NewProductType = {
      "Description": Description, // Names for your input
      
      
    };
    this.data.PostProductType(this.NewProductType).subscribe(res => {
      this.ngOnInit()
    });}}

}

