import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-rewards-report',
  templateUrl: './rewards-report.component.html',
  styleUrls: ['./rewards-report.component.sass']
})
export class RewardsReportComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}
