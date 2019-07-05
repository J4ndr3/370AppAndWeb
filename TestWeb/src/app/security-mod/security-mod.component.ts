import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security-mod',
  templateUrl: './security-mod.component.html',
  styleUrls: ['./security-mod.component.sass']
})
export class SecurityModComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
