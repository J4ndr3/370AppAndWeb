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

  RewardAdds1: object;
  AddForm1: FormGroup;
  NewRewardAdd1:object;
  RewardAddSelection1:number =0;
  RewardAddOptions1:Array<object>; 
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.RewardAdds = res;
    });
    this.data.GetRewardAdd1().subscribe(res=>{
      this.RewardAdds1 = res;
    });
    this.AddForm = this.formBuilder.group({
      PName: [""], // Names for your input
      PQuantity: [""], // Names for your input 
      PPoints: [""],
      PDescription: [""]
    });
    this.data.GetRewardAdd().subscribe((res) => {
      this.RewardAddOptions = JSON.parse(JSON.stringify(res));
    }); 

  }
  showToast(){
    this.toastrService.show("Reward could not be modified", "Error");
  }

  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
  
    addRewardAdd() {
      var PName = this.AddForm.get('PName').value; // Names for your input
      var PQuantity = this.AddForm.get('PQuantity').value; // Names for your input
      var PPoints = this.AddForm.get('PPoints').value;
      var PDescription = this.AddForm.get('PDescription').value;
  
      if ((PName||PQuantity||PPoints||PDescription)=="") {
        //Modal popup
      }
      else {
        this.NewRewardAdd = {
          "PName": PName, // Names for your input
          "PQuantity": PQuantity, // Names for your input
          "PPoints": PPoints,
          "PDescription":PDescription,
          
        };
        this.data.PostRewardAdd(this.NewRewardAdd).subscribe(res => {
          this.ngOnInit();
          this.showToast();
        });
      }
      }
    }
  
  
