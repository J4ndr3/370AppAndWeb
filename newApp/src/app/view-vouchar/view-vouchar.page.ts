import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vouchar',
  templateUrl: './view-vouchar.page.html',
  styleUrls: ['./view-vouchar.page.scss'],
})
export class ViewVoucharPage implements OnInit {
  Redeems:object;
  Events:object;
  searchText;
  searchText1;
  nReward:object;
  nRanger:object;
  nName:any;
  nEventReward:object;
  EventID:string;
  rcv: object;
 ID: number;
 confirmID:any;
 confirmID1:any;
Ranger: string;
Ranger1: string;
RangerName:any;
Surname:any;
 DateGenerated:any;
 VoucherCode:any;
 ProductID:string;
 QRname:string;
 qrv:string;
 Claimed:string;
  constructor(private data: ERPService, private router:Router) { }

  ngOnInit() {
    this.confirmID = this.data.viewvalidate;
    this.confirmID1 = this.data.viewvalidate1;
    this.Claimed = this.data.Claimed;
    console.log(this.confirmID)
    console.log(this.confirmID1)
    this.data.GetRedeem_Reward().subscribe(res=>{
      console.log(res);
      this.Redeems = res;
    });
    if (this.Claimed != null)
    {
      this.Generate(this.Claimed);
    }else{
      if (this.confirmID!= null){this.QRGenerate(this.confirmID);}
      else if(this.confirmID1 != null){this.GetProductName(this.confirmID1);} 
    }
    
    
    //  if(this.Redeems != null){this.nameA(1)}
    //  else if (this.Redeems == null){

    //  }
    
      
    
  }
  
  QRGenerate(ID){
    this.data.GetRedeem_RewardID(ID).subscribe(res1=>{
      this.ProductID=res1["Product_Reward_ID"]
      this.VoucherCode=res1["Voucher_code" ];
      this.DateGenerated= res1["DateTime" ];
      this.Ranger=res1["Ranger_ID"];
      this.nReward = {
        "Redeem_ID" : this.confirmID,
        "Ranger_ID" : res1["Ranger_ID" ], // Names for your input
        "Voucher_code": res1["Voucher_code" ] ,
        "DateTime" : res1["DateTime" ] ,
        "Product_Reward_ID":res1["Product_Reward_ID" ] ,
        
        
      }

      
      this.data.GetRangerID(this.Ranger).subscribe(res2=>{
        this.RangerName = res2["Name"];
        this.Surname = res2["Surname"];
        this.nRanger = {
          "Name": res2["Name"],
          "Surname" :res2["Surname"]
        }
      this.data.GetProduct_RewardID(this.ProductID).subscribe(res2=>{

        this.QRname = res2["Name"];
       this.nName = {
     "Product_Reward_ID": res2["Product_Reward_ID"],
     "Name": res2["Name"],
     "Quantity": res2["Quantity"],
    "Points": res2["Points"],
     "Prod_ID": res2["Prod_ID"]
      }
      this.qrv= "Date Generated: "+this.DateGenerated+"\n"+"Product Name: "+this.QRname+"\n"+"Ranger Name: "+this.RangerName+" "+this.Surname+"\n"+ "V-code: "+"\n"+this.VoucherCode+"\n"+ "Reward type ID: "+this.ProductID;
   })
      console.log(this.QRname)
      // this.qrv="Voucher code: "+res1["Voucher_code"] +"\n"+ "Reward type ID: "+res1["Product_Reward_ID"];
     

    })
     
  })
 
//  else if (this.confirmID1 != null){
  
  
//  else if (this.confirmID1 != null){
//   this.data.GetRedeem_RewardID(ID).subscribe(res2=>{
      
//     this.VoucherCode=res2["Voucher_code" ];
//     this.DateGenerated= res2["DateTime" ];
//     this.nEventReward = {
//       "Redeem_ID" : this.confirmID1,
//       "Ranger_ID" : res2["Ranger_ID" ], // Names for your input
//       "Voucher_code": res2["Voucher_code" ] ,
//       "DateTime" : res2["DateTime" ] ,
//       "Event_Reward_ID":res2["Event_Reward_ID" ] ,
      
      
//     }
//     console.log(this.nReward)
//     // this.qrv="Voucher code: "+res1["Voucher_code"] +"\n"+ "Reward type ID: "+res1["Product_Reward_ID"];
//     this.qrv= "Date Generated: "+this.DateGenerated+"\n"+"Product Name: "+res1["Name"]+"\n"+ "Voucher code: "+"\n"+this.VoucherCode+"\n"+ "Reward type ID: "+res1["Event_Reward_ID" ];
        
//       })
//     }
  //}
}
  GetProductName(ID){

    this.data.GetRedeem_RewardID(ID).subscribe(res=>{
      this.VoucherCode=res["Voucher_code" ];
      this.DateGenerated= res["DateTime" ];
      this.EventID= res["Event_Reward_ID"];
      this.Ranger1=res["Ranger_ID"];
      this.nReward = {
        "Redeem_ID" : this.confirmID,
        "Ranger_ID" : res["Ranger_ID" ], // Names for your input
        "Voucher_code": res["Voucher_code"] ,
        "DateTime" : res["DateTime" ] ,
        "Event_Reward_ID":res["Event_Reward_ID" ] ,
        
        
      }

      this.data.GetRangerID(this.Ranger1).subscribe(res2=>{
        this.RangerName = res2["Name"];
        this.Surname = res2["Surname"];
        this.nRanger = {
          "Name": res2["Name"],
          "Surname" :res2["Surname"]
        }

      this.data.GetEvent_RewardID(this.EventID).subscribe(res2=>{
        this.QRname = res2["Name"];
       this.nName = {
     "Event_Reward_ID": res2["Event_Reward_ID"],
     "Name": res2["Name"],
      }
      this.qrv= "Date Generated: "+this.DateGenerated+"\n"+"Event Name: "+this.QRname+"\n"+"Ranger Name: "+this.RangerName+" "+this.Surname+"\n"+ "Reward type ID: "+this.EventID;
   })
      // console.log("Hallooooooooo"+this.confirmID1)
      // this.qrv= "Date Generated: "+this.DateGenerated+"\n"+"Event Name"+"\n"+ "V-code: "+"\n"+this.VoucherCode+"\n"+ "Reward type ID: "+this.EventID;
     })
    })
    }



nameA(ID){

  
}
  Generate(Redeem_ID){
    this.data.GetRedeem_RewardID(Redeem_ID).subscribe(res=>{
      if (res["Product_Reward_ID"] != null)
      {
        this.QRGenerate(Redeem_ID)
      }
      else
      {
        this.GetProductName(Redeem_ID)
      }
      this.router.navigateByUrl("/view-vouchar")
    })
  }
}