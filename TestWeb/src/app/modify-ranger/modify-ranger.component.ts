import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify-ranger',
  templateUrl: './modify-ranger.component.html',
  styleUrls: ['./modify-ranger.component.sass']
})
export class ModifyRangerComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
