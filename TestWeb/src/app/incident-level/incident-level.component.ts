import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-incident-level',
  templateUrl: './incident-level.component.html',
  styleUrls: ['./incident-level.component.sass']
})
export class IncidentLevelComponent implements OnInit {
  IncidentLevel: object;
  AddForm: FormGroup;
  NewLevel:object;
  LevelSelection:number =0;
 
  
  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.data.GetIncident_Level().subscribe(res=>{
        this.IncidentLevel = res;
        console.log(res)
      });
    }

  showToast(){
    this.toastrService.show("Record added successfully", "Success!");
  }
  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
