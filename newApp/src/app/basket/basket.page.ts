import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  constructor(private data: ERPService,private router:Router) { }
  items;
  ngOnInit() {
    this.items = this.data.RewardList;
    console.log(this.items)
  }
  claim(){
    var hallo = this.items.count();
    var c = 0;
    this.items.forEach(element => {
      c++;
      this.data.PostRedeem_Reward(element).subscribe(res2 => {
        console.log(res2)
        this.data.nvalidate1 = res2["Redeem_ID"];
      });
      if (c == hallo)
      {
        this.router.navigateByUrl("/generagevoucher");
      }
    });
    
  }
  shop(){
    this.router.navigateByUrl("/rewardtype");
  }
 
}
