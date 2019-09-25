import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  constructor(private data: ERPService, private router: Router, private storage: Storage) { }
  items;
  loggedIn: any;
  Name: object;
  Points: Object;
  nName: Object;
  Surname: Object;

  ngOnInit() {
    this.items = this.data.RewardList;
    console.log(this.items)
    this.storage.get("Ranger").then(res => {
      this.loggedIn = res;
      this.RangerDetails(this.loggedIn);
    });
  }
  claim() {
    var hallo = this.items.count();
    var c = 0;
    this.items.forEach(element => {
      c++;
      this.data.PostRedeem_Reward(element).subscribe(res2 => {
        console.log(res2)
        this.data.nvalidate1 = res2["Redeem_ID"];
      });
      if (c == hallo) {
        this.router.navigateByUrl("/generagevoucher");
      }
    });

  }
  shop() {
    this.router.navigateByUrl("/rewardtype");
  }
  remove(ID) {
    var count = -1;
    this.items.forEach(element => {
      count++;
      if (element["ID"] == ID) {
        this.updateRanger(this.loggedIn,-element["Points"]);
        this.items.splice(count, 1)
        
      }
    });
  }
  RangerDetails(ID) {

    this.data.GetRangerID(ID).subscribe(res2 => {
      this.Name = res2['Name'];
      this.Points = res2['Points'];
      this.Surname = res2['Surname'];
      this.nName = {
        "Name": res2['Name']
      };
    })
  }
  updateRanger(ID,points){
    this.data.UpdatePoints(ID,points).subscribe(res=>{
     console.log(res)
    });
  }
}
