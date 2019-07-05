import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-passwor',
  templateUrl: './reset-passwor.component.html',
  styleUrls: ['./reset-passwor.component.sass']
})
export class ResetPassworComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
