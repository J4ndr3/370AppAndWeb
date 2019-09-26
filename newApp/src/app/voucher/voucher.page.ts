import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  Redeems: object;
  Events: object;
  searchText;
  searchText1;
  nReward: object;
  nRanger: object;
  nName: any;
  nEventReward: object;
  EventID: string;
  rcv: object;
  ID: number;
  confirmID: any;
  confirmID1: any;
  Ranger: string;
  Ranger1: string;
  RangerName: any;
  Surname: any;
  DateGenerated: any;
  VoucherCode: any;
  ProductID: string;
  QRname: string;
  qrv: string;
  constructor(private data: ERPService, private router: Router) { }

  ngOnInit() {
    this.confirmID = this.data.nvalidate;
    this.confirmID1 = this.data.nvalidate1;
    console.log(this.confirmID)
    console.log(this.confirmID1)
    this.data.GetRedeem_Reward().subscribe(res => {
      console.log(res);
      this.Redeems = res;
    });
    if (this.confirmID1 == null) { this.QRGenerate(this.confirmID); }
    else if (this.confirmID1 != null) { this.GetProductName(this.confirmID1); }

    if (this.Redeems != null) { this.nameA(1) }
    else if (this.Redeems == null) {
    }
  }

  QRGenerate(ID) {
    this.data.GetRedeem_RewardID(ID).subscribe(res1 => {
      this.ProductID = res1["Product_Reward_ID"]
      this.VoucherCode = res1["Voucher_code"];
      this.DateGenerated = res1["DateTime"];
      this.Ranger = res1["Ranger_ID"];
      this.nReward = {
        "Redeem_ID": this.confirmID,
        "Ranger_ID": res1["Ranger_ID"], // Names for your input
        "Voucher_code": res1["Voucher_code"],
        "DateTime": res1["DateTime"],
        "Product_Reward_ID": res1["Product_Reward_ID"],
      }
      this.data.GetRangerID(this.Ranger).subscribe(res2 => {
        this.RangerName = res2["Name"];
        this.Surname = res2["Surname"];
        this.nRanger = {
          "Name": res2["Name"],
          "Surname": res2["Surname"]
        }
        this.data.GetProduct_RewardID(this.ProductID).subscribe(res2 => {

          this.QRname = res2["Name"];
          this.nName = {
            "Product_Reward_ID": res2["Product_Reward_ID"],
            "Name": res2["Name"],
            "Quantity": res2["Quantity"],
            "Points": res2["Points"],
            "Prod_ID": res2["Prod_ID"]
          }
          this.qrv = "Date Generated: " + this.DateGenerated + "\n" + "Product Name: " + this.QRname + " " + "Ranger Name: " + this.RangerName + " " + this.Surname + "\n" + "V-code: " + "\n" + this.VoucherCode + "\n" + "Reward type ID: " + this.ProductID;
        })
        console.log(this.QRname)
      })
    })
  }
  GetProductName(ID) {
    this.data.GetRedeem_RewardID(ID).subscribe(res => {
      this.VoucherCode = res["Voucher_code"];
      this.DateGenerated = res["DateTime"];
      this.EventID = res["Event_Reward_ID"];
      this.Ranger1 = res["Ranger_ID"];
      this.nReward = {
        "Redeem_ID": this.confirmID,
        "Ranger_ID": res["Ranger_ID"], // Names for your input
        "Voucher_code": res["Voucher_code"],
        "DateTime": res["DateTime"],
        "Event_Reward_ID": res["Event_Reward_ID"],
      }

      this.data.GetRangerID(this.Ranger1).subscribe(res2 => {
        this.RangerName = res2["Name"];
        this.Surname = res2["Surname"];
        this.nRanger = {
          "Name": res2["Name"],
          "Surname": res2["Surname"]
        }

        this.data.GetEvent_RewardID(this.EventID).subscribe(res2 => {
          this.QRname = res2["Name"];
          this.nName = {
            "Event_Reward_ID": res2["Event_Reward_ID"],
            "Name": res2["Name"],
          }
          this.qrv = "Date Generated: " + this.DateGenerated + "\n" + "Event Name: " + this.QRname + " " + "Ranger Name: " + this.RangerName + " " + this.Surname + "\n" + "Reward type ID: " + this.EventID;
        })
      })
    })
  }



  nameA(ID) {


  }
  Generate() {

  }
}
