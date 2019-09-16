import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Storage } from '@ionic/storage';
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
loggedIn:any;
Ranger:any;
RangerID:any;
  constructor(private data: ERPService,private storage:Storage) { }

  ngOnInit() {
    this.storage.get("Ranger").then(res=>{
        this.loggedIn = res;
        this.RangerDetails(this.loggedIn);
      });

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
