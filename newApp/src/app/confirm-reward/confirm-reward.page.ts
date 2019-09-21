import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// @IonicPage()
@Component({
  selector: 'app-confirm-reward',
  templateUrl: './confirm-reward.page.html',
  styleUrls: ['./confirm-reward.page.scss'],
})
export class ConfirmRewardPage implements OnInit {
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
 redeemID:any;
 ProductPoints: object;
 RangerPoints:object;
 loggedIn:any;
Ranger:any;

 myDate= new Date().toLocaleDateString();
 Time= new Date().toTimeString();
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
  update(ID){
    
    console.log(this.confirmID)
    this.data.GetProduct_RewardID(ID).subscribe(res=>{
      this.ProductPoints = res['Points']
      this.updateRanger(this.loggedIn,this.ProductPoints);
      console.log(res);
      if (res["Quantity"] == 0 )
      {
         alert('Sorry this item is out of stock for now!'+'\n'+'Please select another reward.');
         this.router.navigateByUrl("/rewardtype");
      }

        else{
          
      var PoductID = res["Product_Reward_ID"];
    var PQuantity = res["Quantity"] - 1;
    this.nReward = {
      "Product_Reward_ID":res["Product_Reward_ID"],
      "Name": res["Name"],
      "Quantity": PQuantity,
      "Points": res["Points"],
      "Prod_ID": res["Prod_ID"]
    }
    console.log(this.nReward);
      this.data.PutRewardAdd(ID,this.nReward).subscribe(res1 => {
 

        
        
          this.RandomNumber = Math.floor(Math.random() * 99999999999999999999);
          console.log(this.RandomNumber);
          
          this.RedeemVoucher = {
            
            "Ranger_ID" : this.loggedIn, // Names for your input
            "Voucher_code": this.RandomNumber,
            "DateTime" : this.myDate,
            "Product_Reward_ID":PoductID,
          };
          this.data.PostRedeem_Reward(this.RedeemVoucher).subscribe(res2 => {
            this.data.nvalidate = res2["Redeem_ID"];
            this.router.navigateByUrl("/voucher");
          });
      });
    }
  }) 
  

  
    }
    updateRanger(ID,points){
      this.data.UpdatePoints(ID,points).subscribe(res=>{
       console.log(res)
      });
    }
    
}
