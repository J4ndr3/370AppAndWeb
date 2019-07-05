import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-marker-mod',
  templateUrl: './marker-mod.component.html',
  styleUrls: ['./marker-mod.component.sass']
})
export class MarkerModComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
}
