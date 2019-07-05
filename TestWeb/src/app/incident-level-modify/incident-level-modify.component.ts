import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-incident-level-modify',
  templateUrl: './incident-level-modify.component.html',
  styleUrls: ['./incident-level-modify.component.sass']
})
export class IncidentLevelModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Incident level modified.", "Success!");
  }
}
