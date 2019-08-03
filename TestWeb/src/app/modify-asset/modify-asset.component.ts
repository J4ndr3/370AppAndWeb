import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify-asset',
  templateUrl: './modify-asset.component.html',
  styleUrls: ['./modify-asset.component.sass']
})
export class ModifyAssetComponent implements OnInit {

  
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Asset modified.", "Success!");
  }
}
