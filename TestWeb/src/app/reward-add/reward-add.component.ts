import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          

@Component({
  selector: 'app-reward-add',
  templateUrl: './reward-add.component.html',
  styleUrls: ['./reward-add.component.sass']
})
export class RewardAddComponent implements OnInit {
  RewardAdds: object;
  AddForm: FormGroup;
  NewRewardAdd:object;
  RewardAddSelection:number =0;
  RewardAddOptions:Array<object>; 
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.RewardAdds = res;
    });

  }
  showToast(){
    this.toastrService.show("Reward could not be modified", "Error");
  }

  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
}
