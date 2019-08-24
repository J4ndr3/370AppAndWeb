import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  Orders: object;
  AddForm: FormGroup;
  NewOrder:object;
  AssetSelection:number =0;
  AssetOptions:Array<object>;
  TypeSelection:number =0;
 TypeOptions:Array<object>; 
  SupplierSelection:number =0;
  SupplierOptions:Array<object>;  
  nOrder:object;
  searchtext;

  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit(){ 
    this.AddForm = this.formBuilder.group({
      OrderID: [],
      Date: [],
      });
    this.data.GetAssets().subscribe(res=>{
      this.AssetOptions = JSON.parse(JSON.stringify(res));
    })
      this.data.GetTypes().subscribe(res=>{
        this.TypeOptions = JSON.parse(JSON.stringify(res));
      })
        this.data.GetSupplier().subscribe(res=>{
          this.SupplierOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetOrder().subscribe(res=>{
      this.Orders = res;
    });

  
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }

  addOrder(){
    var ID = this.AddForm.get('ID').value;
    var Date = this.AddForm.get('Date').value;
    var Asset = this.AddForm.get('Asset').value;
    var Type = this.AddForm.get('Type').value;
    var Supplier = this.AddForm.get('Supplier').value;
    

    if ( ID ==""||Date==""||Asset==""||Type==""||Supplier=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nOrder = {
        "ID": ID,
        "Date": Date,
        "Lattitude": Asset,
        "Longitude": Type,
        "Reserve_ID": Supplier
      };
      console.log(this.nOrder);
      this.data.PostOrder(this.nOrder).subscribe(res => {
        if (res != null)
        {
          this.ngOnInit();
          this.showToast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      });
    }
  }
  del(){
    this.data.DeleteOrder(this.data.nID).subscribe(res=>{
      if (res!=null)
      {
        this.delSuccessToast();
        this.ngOnInit();
      }
      else if (res==2)
      {
        alert("You are not allowed to delete this record");
      }
      else
      {
        this.delToast()
      }
    })
  }
  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
  }
  delSuccessToast(){
    this.toastrService.show("Record removed.", "Success!");
  }
  delete(ID){
    this.data.nID = ID;
    document.getElementById('del').click();
}
  // edit(ID){
  //   this.mod.edit(ID);
  // }
}