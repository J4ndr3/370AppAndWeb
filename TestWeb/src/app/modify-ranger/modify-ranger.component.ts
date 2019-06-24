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
    this.toastrService.show("Ranger information modified.", "Success!");
  }
}
