import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-incident-level',
  templateUrl: './incident-level.component.html',
  styleUrls: ['./incident-level.component.sass']
})
export class IncidentLevelComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record added successfully", "Success!");
  }
}
