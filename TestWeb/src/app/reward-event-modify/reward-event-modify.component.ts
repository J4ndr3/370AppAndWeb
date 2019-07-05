import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-reward-event-modify',
  templateUrl: './reward-event-modify.component.html',
  styleUrls: ['./reward-event-modify.component.sass']
})
export class RewardEventModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record was not modified successfully", "Success!");
  }
  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
