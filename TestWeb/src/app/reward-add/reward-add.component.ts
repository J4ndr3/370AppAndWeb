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
    this.toastrService.show("Record could not be added", "Error!");
  }

  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
}
