import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';

@Component({
  selector: 'app-patrol-log',
  templateUrl: './patrol-log.component.html',
  styleUrls: ['./patrol-log.component.sass']
})
export class PatrolLogComponent implements OnInit {
  Patrol: object;
  searchText;

  constructor(private data:ERPService) {
   }


  ngOnInit() {
    this.data.getFeedbacks().subscribe(res=>{
      this.Patrol = res;
      // console.log(res);
    })
  }

}
