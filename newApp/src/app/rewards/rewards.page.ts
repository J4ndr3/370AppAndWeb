import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
Name:object;
Points:Object;
nName:Object;
Surname:Object;
  constructor(private data: ERPService) { }

  ngOnInit() {
    
this.RangerDetails(3);
}
RangerDetails(ID){
 
  this.data.GetRangerID(ID).subscribe(res2 => {
    this.Name= res2['Name'];
    this.Points= res2['Points'];
    this.Surname= res2['Surname'];
    this.nName = {
      "Name": res2['Name']
    };
})
}
}
