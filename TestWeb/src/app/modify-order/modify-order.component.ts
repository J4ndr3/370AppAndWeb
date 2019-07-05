import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.sass']
})
export class ModifyOrderComponent implements OnInit {

 
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Order modified.", "Success!");
  }
}
