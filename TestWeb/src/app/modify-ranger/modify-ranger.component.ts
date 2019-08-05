import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-ranger',
  templateUrl: './modify-ranger.component.html',
  styleUrls: ['./modify-ranger.component.sass']
})
export class ModifyRangerComponent implements OnInit {

  constructor(private toastrService: ToastrService, private router:Router) { }

  ngOnInit() {
  }
  Toast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
  edit(ID){
    this.router.navigateByUrl("/modify-ranger");
    window.alert(ID);
  }
}
