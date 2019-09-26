import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-event-confirm',
  templateUrl: './event-confirm.page.html',
  styleUrls: ['./event-confirm.page.scss'],
})
export class EventConfirmPage implements OnInit {
  Products:object;
  Events:object;
  searchText;
  searchText1;
  nReward:object;
  rcv: object;
  ID: number;
  confirmID:any;
  RandomNumber;
  RedeemVoucher: object;
  myDate= new Date().toISOString();
  EventPoints:object;
  loggedIn:any;
  Ranger:any;
  count:number;
  constructor(private data: ERPService, private router:Router,private storage:Storage) { 
    // this.ID = navParams.get('data');
  }
  // , public navCtrl: NavController, public navParams: NavParams
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmRewardPage');
  }
  ngOnInit() {
    this.storage.get("Ranger").then(res=>{
      this.loggedIn = res;
      
    });
    this.confirmID = this.data.nvalidate;
    this.data.GetProduct_Reward().subscribe(res=>{
      console.log(res);
      this.Products = res;
    });
    this.data.GetEvent_Reward().subscribe(res=>{
      console.log(res);
      this.Events = res;
    });
  }
  // update(ID){
  //   this.data.GetProduct_RewardID(ID).subscribe(res=>{
  //     console.log(res);
     
  //   var PQuantity = res["Quantity"] - 1;
  //   this.nReward = {
  //     "Product_Reward_ID":res["Product_Reward_ID"],
  //     "Name": res["Name"],
  //     "Quantity": PQuantity,
  //     "Points": res["Points"],
  //     "Prod_ID": res["Prod_ID"]
  //   }
  //   console.log(this.nReward);
  //     this.data.PutRewardAdd(ID,this.nReward).subscribe(res => {
  //       this.rcv = res
  //       console.log(this.rcv);
  //     });
  // }) 
      
  //   }
    Validate1(ID){
      this.data.GetEvent_RewardID(ID).subscribe(res=>{
        var eventName;
        this.EventPoints = res['Points'];
        this.updateRanger(this.loggedIn,this.EventPoints);
        if( res["Event_Reward_ID"] == ID )
        {
          this.data.GetEvent_RewardID(ID).subscribe(res=>{
            console.log(res);
            var EventID = res["Event_Reward_ID"];
          var PQuantity = res["Quantity"] - 1;
          eventName= res["Name"]
          this.nReward = {
            "Event_Reward_ID":res["Event_Reward_ID"],      
          }
          this.RandomNumber = Math.floor(Math.random() * 99999999999999999999);
          console.log(this.RandomNumber);
          this.count = this.data.RewardList.length +1;
          this.RedeemVoucher = {
            "ID":this.count,
            "Ranger_ID" : this.loggedIn, // Names for your input
            "Voucher_code": this.RandomNumber,
            "DateTime" : this.myDate,
            "Event_Reward_ID":EventID,
            "Name":eventName,
            "Points":this.EventPoints
          };
          this.data.RewardList.push(this.RedeemVoucher);
          console.log(this.data.RewardList)
          this.router.navigateByUrl("/basket");
          // this.data.PostRedeem_Reward(this.RedeemVoucher).subscribe(res2 => {
          //   console.log(res2)
          //   this.data.nvalidate1 = res2["Redeem_ID"];
          //   this.router.navigateByUrl("/voucher");
          // });
        })
          
        }
        else{
          
          this.router.navigateByUrl( "/error-not-enough-points");
        }
      })
     
    
}
updateRanger(ID,points){
  this.data.UpdatePoints(ID,points).subscribe(res=>{
   console.log(res)
  });
}
}
