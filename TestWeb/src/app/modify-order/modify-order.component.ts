import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { type } from 'os';



@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.sass']
})
export class ModifyOrderComponent implements OnInit {
  Order :any;
  EditForm : FormGroup;
  AssetSelection:number =0;
  AssetOptions:Array<object>;
  TypeSelection:number =0;
 TypeOptions:Array<object>; 
  SupplierSelection:number =0;
  SupplierOptions:Array<object>;  
  nOrder:object;
  rcv: object;
 
  constructor(private router:Router,private data: ERPService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      Date:[], // your attributes
      ID:[]
      }); this.edt();

    this.data.GetAssetDropdown().subscribe(res=>{
      this.AssetOptions = JSON.parse(JSON.stringify(res));
    })
      this.data.GetTypeDropdown().subscribe(res=>{
        this.TypeOptions = JSON.parse(JSON.stringify(res));
      })
        this.data.GetSupplierDropdown().subscribe(res=>{
          this.SupplierOptions = JSON.parse(JSON.stringify(res));
    })
    
     
  }
  edit(ID){
    this.data.GetOrder(ID).subscribe(res=>{ //iets fout met ID
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/order");
      }
      else{
        this.router.navigateByUrl("/modify-order");
        this.ngOnInit();
       this.data.nID = ID;
      }})
    
  }
  edt(){
     this.data.GetOrder(this.data.nID).subscribe(res=>{     
      this.Order= res;
      this.EditForm.setValue({ID:this.Order.Order_ID,
        Date:this.Order.Date,
        Asset:this.Order.Asset,
        Type:this.Order.Type,
        Supplier:this.Order.Supplier})    
    })
  }
  update(){
    var Date = this.EditForm.get('Date').value; //the name in red the same as on you html
    var Asset = this.EditForm.get('Asset').value; //the name in red the same as on you html
    var Type = this.EditForm.get('Type').value;
    var Supplier = this.EditForm.get('Supplier').value;
    var ID = this.EditForm.get('ID').value;

    if (Date==""||Asset==""||Type==""||Supplier==""||ID =="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nOrder = {

        "Order_ID":ID, //selfde as die databasis 
        "Date": Date, //selfde as die databasis
        "Asset": Asset,
        "Type": type,
        "Status" : status,
        "Supplier" : Supplier
      };
      console.log(this.nOrder);
      this.data.PutOrder(ID,this.nOrder).subscribe(res => {
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
    this.router.navigateByUrl("/order");
  }



  // Toast(){
  //   this.toastrService.show("Order modified.", "Success!");
  // }
}

