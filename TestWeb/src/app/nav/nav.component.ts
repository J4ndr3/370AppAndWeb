import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  constructor(public toastrService:ToastrService) { }

  ngOnInit() {
  }

  showToast(){
    this.toastrService.show('Message sent successfully!', 'Success');
  }
}
