import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.sass']
})
export class EventTypeComponent implements OnInit {
  EventTypes: object;
  AddForm: FormGroup;
  NewEventType:object;
  EventTypeSelection:number =0;
  EventTypeOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal

  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetEventType().subscribe(res=>{
      this.EventTypes = res;


    });
this.AddForm = this.formBuilder.group({
      Description: [""], // Names for your input
});
  }
    showToast(){
      this.toastrService.show("Record could not be added", "Error!");
    }
  
    Delete(){
      this.toastrService.show("Record Removed", "Success!");
    
  }
  


  
  addEventType() {
    var Description = this.AddForm.get('Description').value; // Names for your input
    

    if ((Description)=="") {
      //Modal popup
    }
    else {
      this.NewEventType = {
        "Description": Description, // Names for your input
        
        
      };
      this.data.PostEventType(this.NewEventType).subscribe(res => {
        this.ngOnInit()
      });}}

}


