import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-reward-add',
  templateUrl: './reward-add.component.html',
  styleUrls: ['./reward-add.component.sass']
})
export class RewardAddComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Reward could not be modified", "Error");
  }

  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
}
