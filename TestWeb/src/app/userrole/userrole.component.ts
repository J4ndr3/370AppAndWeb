import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          


@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.sass']
})
export class UserroleComponent implements OnInit {
Level: object;
AddForm: FormGroup;
NewLevel:object;
LevelSelection:number =0;


  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetAccess_Levels().subscribe(res=>{
      this.Level = res;
      if (this.Level[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Level = null ;
      }
      console.log(this.Level);
    });
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
}
