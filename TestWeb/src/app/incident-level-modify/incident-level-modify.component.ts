import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-incident-level-modify',
  templateUrl: './incident-level-modify.component.html',
  styleUrls: ['./incident-level-modify.component.sass']
})
export class IncidentLevelModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService,private route: ActivatedRoute, private FormBuilder:FormBuilder) { }
  IncidentLevel: object;
  AddForm: FormGroup;
  NewLevel:object;
  LevelSelection:any;
  

  ngOnInit() {
  console.log();
    this.LevelSelection = this.route.snapshot.params['ID'];

  }
  Toast(){
    this.toastrService.show("Incident level modified.", "Success!");
  }
}
