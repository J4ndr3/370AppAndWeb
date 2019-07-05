import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gate-mod',
  templateUrl: './gate-mod.component.html',
  styleUrls: ['./gate-mod.component.sass']
})
export class GateModComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
