import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-marker-type-mod',
  templateUrl: './marker-type-mod.component.html',
  styleUrls: ['./marker-type-mod.component.sass']
})
export class MarkerTypeModComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
