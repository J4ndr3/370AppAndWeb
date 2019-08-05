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

  addLevelBtn() {
    this.AddForm = this.formBuilder.group({
      Description: [""], // Names for your input
     
    });
  }

  addLevel() {
    var Description = this.AddForm.get('Description').value; // Names for your input
    
    if (Description=="") {
      //Modal popup
    }
    else {
      this.NewLevel = {
        "Description": Description, // Names for your input
      };
      this.data.PostIncident_Level(this.NewLevel).subscribe(res => {
        this.ngOnInit()
      });
    }}


  EditLevel(ID){
   console.log(ID);
  this.router.navigateByUrl("/incident-level-modify",ID);
  }

  DeleteLevel(ID){
    this.data.DeleteIncident_Level(ID).subscribe(res=>{
      this.del=res
      console.log(this.del)
      this.ngOnInit()
    });
  }
}
