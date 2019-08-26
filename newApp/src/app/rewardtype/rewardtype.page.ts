import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
// import { NavController } from 'ionic-angular';
import {ConfirmRewardPage} from './../confirm-reward/confirm-reward.page'
import { element } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-rewardtype',
  templateUrl: './rewardtype.page.html',
  styleUrls: ['./rewardtype.page.scss'],
})
export class RewardtypePage implements OnInit {
Products:object;
Events1:Array<object>;
Events:Array<object>;
searchText;
searchText1;
nReward:object;
redeemed:Array<object>;
rcv: object;
RangerPoints:object;
loggedIn:any;
Ranger:any;
RangerID:any;
  constructor(private data: ERPService, private router:Router,private storage:Storage) { }
  // ,public navCtrl: NavController
  ngOnInit() {
    this.storage.get("Ranger").then(res=>{

      this.loggedIn = res;
      this.ValidateRanger(this.loggedIn);
    });
    this.data.GetProduct_Reward().subscribe(res=>{
      console.log(res);
      this.Products = res;
    });
   
    
    

    this.data.GetEvent_Reward().subscribe(res=>{
      this.redeemed = [];
      this.data.GetRedeem_Reward().subscribe(res1=>{
        this.redeemed = JSON.parse(JSON.stringify(res1));
        this.Events = [];
        this.Events1 = [];
        console.log(res);
        this.Events1 = JSON.parse(JSON.stringify(res));
        this.Events1.forEach(element=> {
          if (this.redeemed["Event_Reward_ID"] == element["Event_Reward_ID"])
          {
            console.log(element);
            this.Events.push(element);
          }     
        })
      })
     
    });
    
     
    
}
ValidateRanger(ID){
  this.data.GetRanger(ID).subscribe(res=>{
    this.RangerPoints= res["Points"]
    console.log(this.RangerPoints);
    //this.Products = res;

  });
}

Validate(ID){
  this.data.GetProduct_RewardID(ID).subscribe(res=>{
  if(res["Points"] > this.RangerPoints)
  {
    this.router.navigateByUrl("/error-not-enough-points");
  }
  else{
    this.data.nvalidate = ID;
    this.router.navigateByUrl("/confirm-reward");
  }
  // this.navCtrl.push(ConfirmRewardPage, { 
  //   data: this.nReward = {"Product_Reward_ID":res["Product_Reward_ID"]}
  //   });
})

}
Validate1(ID){
  this.data.GetEvent_RewardID(ID).subscribe(res=>{
    if(res["Points"] > this.RangerPoints)
    {
      this.router.navigateByUrl("/error-not-enough-points");
    }
    else{
      this.data.nvalidate = ID;
      this.router.navigateByUrl( "/event-confirm");
    }
  })
  
}



}

