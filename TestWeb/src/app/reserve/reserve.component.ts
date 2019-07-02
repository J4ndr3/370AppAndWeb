import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.sass']
})
export class ReserveComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
}
