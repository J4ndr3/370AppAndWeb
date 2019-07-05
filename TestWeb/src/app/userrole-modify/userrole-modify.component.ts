import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userrole-modify',
  templateUrl: './userrole-modify.component.html',
  styleUrls: ['./userrole-modify.component.sass']
})
export class UserroleModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
