import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-reward-modify',
  templateUrl: './reward-modify.component.html',
  styleUrls: ['./reward-modify.component.sass']
})
export class RewardModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
 
  showToast(){
    this.toastrService.show("Record modified successfully", "Success!");
  }
  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
