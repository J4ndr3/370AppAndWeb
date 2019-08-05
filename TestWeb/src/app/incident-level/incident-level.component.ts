import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

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
  del:object;
  
  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder, private router: Router) { }

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

  EditLevel(ID){
   console.log(ID);
  //this.router.navigateByUrl("[/incident-level-modify]",ID);
  }

  DeleteLevel(ID){
    this.data.DeleteIncident_Level(ID).subscribe(res=>{
      this.del=res
      console.log(this.del)
      this.ngOnInit()
    });
  }
}
