import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reserve-mod',
  templateUrl: './reserve-mod.component.html',
  styleUrls: ['./reserve-mod.component.sass']
})
export class ReserveModComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
