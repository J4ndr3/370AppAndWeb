import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify-supplier',
  templateUrl: './modify-supplier.component.html',
  styleUrls: ['./modify-supplier.component.sass']
})
export class ModifySupplierComponent implements OnInit {

  
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Supplier modified.", "Success!");
  }
}
