import { Component, OnInit } from '@angular/core';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.sass']
})
export class IncidentComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
 Toast(){
    this.toastrService.show("Incident resolved.", "Success!");
  }
}
