import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incident-type-modify',
  templateUrl: './incident-type-modify.component.html',
  styleUrls: ['./incident-type-modify.component.sass']
})
export class IncidentTypeModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Incident type modified.", "Success!");
  }
}
