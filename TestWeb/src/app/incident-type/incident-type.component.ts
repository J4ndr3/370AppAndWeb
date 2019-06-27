import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-incident-type',
  templateUrl: './incident-type.component.html',
  styleUrls: ['./incident-type.component.sass']
})
export class IncidentTypeComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
