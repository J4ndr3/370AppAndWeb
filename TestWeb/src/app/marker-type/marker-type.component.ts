import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-marker-type',
  templateUrl: './marker-type.component.html',
  styleUrls: ['./marker-type.component.sass']
})
export class MarkerTypeComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
}
