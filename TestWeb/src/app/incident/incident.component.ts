import { Component, OnInit } from '@angular/core';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.sass']
})
export class IncidentComponent implements OnInit {
  Incident: object;
  
  constructor(private toastrService: ToastrService, private data:ERPService) { }

  ngOnInit() {
    this.data.GetIncidents().subscribe(res=>{
      this.Incident = res;
      if (this.Incident[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Incident = null ;
      }
      console.log(this.Incident);
    });
  }
 Toast(){
    this.toastrService.show("Incident resolved.", "Success!");
  }
}
